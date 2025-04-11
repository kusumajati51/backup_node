<template>
    <div>
        <v-tooltip text="Update Picture" bottom>
            <template v-slot:activator="{ props }">
                <div v-bind="props">
                    <v-btn @click="dialog = true" icon variant="text">
                        <IconLibraryPhoto stroke-width="1.5" />
                    </v-btn>
                </div>
            </template>
        </v-tooltip>

        <v-dialog v-model="dialog" max-width="600" aria-labelledby="dialog-title">
            <v-card>
                <v-card-title id="dialog-title">Update Product Image</v-card-title>

                <v-card-text>
                    Choose how you want to update the product image:
                    <!-- <ul class="mt-3">
                        <li>Select existing image from your gallery</li>
                        <li>Upload a new image from your computer</li>
                    </ul> -->
                </v-card-text>

                <v-card-actions class="d-flex flex-column align-stretch">
                    <v-btn @click="handleSelectPicture" block class="mb-3" color="secondary"
                        aria-label="Select existing image">
                        <IconLibraryPhoto stroke-width="1.5" />
                        Select Existing Image
                    </v-btn>

                    <v-btn @click="handleUploadComputer" block color="accent" aria-label="Upload new image">
                        <IconUpload stroke="1.5" /> 
                        Upload New Image
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { IconLibraryPhoto, IconUpload } from '@tabler/icons-vue';
const props = defineProps({
    productId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits<{
    (e: 'select-picture', productId: number): void;
    (e: 'upload-computer', productId: number): void;
}>();

const dialog = ref(false);

const handleSelectPicture = () => {
    dialog.value = false;
    emit('select-picture', props.productId);
};

const handleUploadComputer = () => {
    dialog.value = false;
    emit('upload-computer', props.productId);
};
</script>

<script lang="ts">
export default defineComponent({
    name: 'ImageActionDialog',
});
</script>