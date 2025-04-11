<template>
    <div>
        <!-- Dialog Trigger Button -->

        <v-btn v-if="showButton" color="primary" @click="openDialog" :loading="loading">
            {{ selectedImage ? 'Image Selected' : 'Select Image' }}
        </v-btn>

        <!-- Image Selection Dialog -->
        <v-dialog v-model="showDialog" max-width="800" @click:outside="closeDialog">
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>Select One Image</span>
                    <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search images" single-line
                        hide-details class="ml-4" density="compact" @update:model-value="fetchImages"></v-text-field>
                </v-card-title>

                <v-divider></v-divider>

                <!-- Loading State -->
                <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

                <!-- Error State -->
                <v-alert v-if="error" type="error" variant="tonal" class="ma-4">
                    {{ error }}
                </v-alert>

                <!-- Image Grid -->
                <v-container fluid v-if="!loading && !error">
                    <v-row>
                        <v-col v-for="image in images" :key="image.id" cols="6" sm="4" md="3">
                            <v-hover v-slot="{ props }">
                                <v-card v-bind="props"
                                    :class="['image-card', { 'selected-card': isSelected(image.id) }]"
                                    @click="selectImage(image.id)">
                                    <v-img :src="image.url" aspect-ratio="1" cover class="rounded-lg">
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate
                                                    color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>

                                        <!-- Selection Overlay -->
                                        <div v-if="isSelected(image.id)" class="selection-overlay">
                                            <v-icon color="lightinfo" size="40">
                                                mdi-check-circle
                                            </v-icon>
                                        </div>
                                    </v-img>

                                    <v-card-subtitle class="text-truncate">
                                        {{ image.title }}
                                    </v-card-subtitle>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>

                <v-divider></v-divider>

                <!-- Dialog Actions -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
                    <v-btn color="primary" variant="text" @click="confirmSelection" :disabled="loading">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineComponent, defineEmits, onMounted } from 'vue';
import api from '@/axios';
import { watch } from 'vue';
import type { SelectPhotoRequest } from '@/models/request/SelectPhoto.model';

interface ImageItem {
    id: number;
    title: string;
    url: string;
}

const search = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const images = ref<ImageItem[]>([]);
const tempSelected = ref<number | null>(null);
const selectedImage = ref<number | null>(null);

const emit = defineEmits(['close', 'photo-saved', 'open']);


// Fetch images from API
const props = withDefaults(defineProps<{
    productId: number;
    showDialog?: boolean;
    showButton?: boolean;
}>(), {
    showButton: true,
});


watch(() => props.showDialog, async (newValue, oldValue) => {
    if (newValue === true) {
        if (images.value.length === 0) {
            await fetchImages();
        }
    }
});

const fetchImages = async () => {
    try {
        loading.value = true;
        error.value = null;

        // const response = await axios.get('https://picsum.photos/v2/list', {
        //     params: {
        //         query: search.value,
        //         limit: 12 // Adjust based on your API
        //     }
        // });
        const url = import.meta.env.VITE_API_URL + "product/photo/picture/"
        const response = await api.get(`product/photo/index/${props.productId}`, {})

        // console.log('res', res.data)
        images.value = response.data.map((item: any) => ({
            id: item.id,
            // url: item.download_url // Use appropriate URL from your API response
            url: url + item.id,
        }));
    } catch (err) {
        error.value = 'Failed to load images. Please try again later.';
        console.error('API Error:', err);
    } finally {
        loading.value = false;
    }
};

// Open dialog handler


const openDialog = async () => {
    emit('open');
    tempSelected.value = selectedImage.value;
    // if (images.value.length === 0) {
    //     await fetchImages();
    // }
};


// Close dialog handler
const closeDialog = () => {
    emit('close');
    error.value = null;
};

// Confirm selection
const confirmSelection = async () => {
    selectedImage.value = tempSelected.value;
    var selectPhotoRequest: SelectPhotoRequest = {
        id: Number(selectedImage.value),
        product_id: props.productId
    }
    await api.patch('product/photo/select', selectPhotoRequest).then((res) => {
        emit('photo-saved', res.data);
    }).catch((error) => {
        console.error(error);
        emit('close');
    });
};

// Selection check
const isSelected = (id: number): boolean => {
    return tempSelected.value === id;
};

// Image selection handler
const selectImage = (id: number) => {
    tempSelected.value = tempSelected.value === id ? null : id;
};
</script>

<script lang="ts">

export default defineComponent({
    name: 'SelectPicture',
});
</script>


<style scoped>
.image-card {
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.image-card:hover {
    transform: translateY(-5px);
}

.selected-card {
    border: 2px solid #1976d2;
    border-radius: 8px;
}

.selection-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>