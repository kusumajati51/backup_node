<template>
    <div class="drop-area" :class="{ 'is-dragging': isDragging }" @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave" @dragover.prevent @drop.prevent="handleDrop" @click="handleClick" role="button"
        :aria-label="ariaLabel">
        <input type="file" ref="fileInput" :accept="acceptedFormats" @change="handleFileSelect" hidden />

        <div v-if="!preview">
            <slot name="icon">
                <v-icon size="48">{{ defaultIcon }}</v-icon>
            </slot>
            <p>{{ isDragging ? dropText : promptText }}</p>
        </div>

        <div v-else>
            <slot name="preview" :src="preview">
                <img :src="preview" alt="Preview" class="preview-image" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{
    acceptedFormats?: string;
    promptText?: string;
    dropText?: string;
    defaultIcon?: string;
    ariaLabel?: string;
    showPreview?: boolean;
}>(), {
    acceptedFormats: 'image/*',
    promptText: 'Drag & Drop or Click to Select',
    dropText: 'Release to Drop',
    defaultIcon: 'mdi-cloud-upload',
    ariaLabel: 'File upload area',
    showPreview: true,
});

const emit = defineEmits<{
    (e: 'file-selected', file: File): void;
    (e: 'drag-enter'): void;
    (e: 'drag-leave'): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const preview = ref<string | null>(null);
const isDragging = ref(false);

// Drag-and-drop handlers
const onDragEnter = () => {
    isDragging.value = true;
    emit('drag-enter');
};

const onDragLeave = (e: DragEvent) => {
    const dropArea = e.currentTarget as HTMLElement;
    if (!dropArea.contains(e.relatedTarget as Node)) {
        isDragging.value = false;
        emit('drag-leave');
    }
};

const handleDrop = (e: DragEvent) => {
    isDragging.value = false;
    const files = e.dataTransfer?.files;
    if (files?.[0]) handleFile(files[0]);
};

// File input handlers
const handleClick = () => fileInput.value?.click();

const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) handleFile(target.files[0]);
};

const handleFile = (file: File) => {
    if (!file.type.match(props.acceptedFormats.replace('*', '.*'))) {
        alert(`Invalid file type. Accepts: ${props.acceptedFormats}`);
        return;
    }

    if (props.showPreview) {
        preview.value = URL.createObjectURL(file);
    }

    emit('file-selected', file);
};
</script>

<style scoped>
.drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.drop-area.is-dragging {
    border-color: #2196f3;
    background-color: #e3f2fd;
}

.preview-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
}
</style>