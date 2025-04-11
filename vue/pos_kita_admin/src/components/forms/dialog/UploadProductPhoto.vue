<template>
    <div>
        <v-btn v-if="showButton" color="primary" :loading="loading" @click="open">
            Upload
        </v-btn>

        <v-dialog v-model="showDialog" max-width="600">
            <v-card>
                <v-card-title>Upload From Computer</v-card-title>
                <v-card-text>
                    <div class="drop-area" :class="{ 'is-dragging': isDragging }" @dragenter.prevent="onDragEnter"
                        @dragleave.prevent="onDragLeave" @dragover.prevent="onDragOver" @drop.prevent="handleDrop"
                        @click="handleClick">
                        <input type="file" ref="fileInput" accept="image/*" @change="handleFileSelect" hidden />
                        <div v-if="!previewImage">
                            <v-icon size="48">mdi-cloud-upload</v-icon>
                        </div>
                        <img v-else :src="previewImage" alt="Preview" class="preview-image" />
                        <p>{{ isDragging ? 'Release to Drop' : 'Drag & Drop or Click to Select' }}</p>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="cancel">Cancel</v-btn>
                    <v-btn @click="upload" :loading="loading">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, withDefaults } from 'vue';
import api from '@/axios';

const props = withDefaults(defineProps<{
    productId: number;
    showDialog?: boolean;
    showButton?: boolean;
}>(), {
    showDialog: false,
    showButton: false,
});

const emit = defineEmits(['close', 'photo-saved', 'open']);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const loading = ref(false);
const isDragging = ref(false);
const previewImage = ref<string | null>(null);

// Drag-and-drop handlers
const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
};

const onDragLeave = (e: DragEvent) => {
    // Check if the cursor is leaving the drop area entirely
    const dropArea = e.currentTarget as HTMLElement;
    if (!dropArea.contains(e.relatedTarget as Node)) {
        isDragging.value = false;
    }
};

const onDragOver = (e: DragEvent) => {
    e.preventDefault();
};

const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            selectedFile.value = file;
            previewImage.value = URL.createObjectURL(file); // Generate preview
        } else {
            alert('Please upload a valid image file.');
        }
    }
};

// File input handlers
const handleClick = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file.type.startsWith('image/')) {
            selectedFile.value = file;
            previewImage.value = URL.createObjectURL(file); // Generate preview
        } else {
            alert('Please upload a valid image file.');
        }
    }
};

// Close dialog
const cancel = () => {
    resetState();
    emit('close');
};

// Open dialog
const open = () => {
    resetState();
    emit('open');
};

// Upload file
const upload = async () => {
    if (!selectedFile.value) return;

    try {
        loading.value = true;
        const formData = new FormData();
        formData.append('file', selectedFile.value);
        await api.post(`product/photo/${props.productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        emit('photo-saved');
    } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
    } finally {
        loading.value = false;
    }
};

// Reset state
const resetState = () => {
    selectedFile.value = null;
    previewImage.value = null;
    isDragging.value = false;
};
</script>

<script lang="ts">
export default defineComponent({
    name: 'UploadProductPhoto',
});
</script>

<style scoped>
.drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    min-height: 150px;
    /* Ensure consistent height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.drop-area.is-dragging {
    border-color: #2196f3;
    background-color: #e3f2fd;
    /* Light blue background */
}

.drop-area p {
    margin: 0;
}

.preview-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}
</style>