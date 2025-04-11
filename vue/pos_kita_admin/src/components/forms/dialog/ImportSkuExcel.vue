<template>
    <div>
        <v-tooltip text="Import Sku" bottom>
            <template v-slot:activator="{ props }">
                <div v-bind="props">
                    <v-btn @click="openDialog" class="mr-2 bg-primary " text="Import  Excel" variant="flat"></v-btn>

                </div>
            </template>
        </v-tooltip>
        <v-dialog v-model="showDialog" max-width="500px">

            <v-card>
                <v-card-title>
                    <span class="headline">Import Product Excel</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-file-input v-model="file" @change="onFileChange" label="Product import"
                            required></v-file-input>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="uploadPhoto">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import httpUpload from '@/axios/axiosUpload';

export default {
    props: {
        productId: {
            type: Number,
            required: true,
        },
        showDialog: {
            type: Boolean,
            default: false,
        }
    },
    components: {

    },
    emits: ['close', 'open', 'import-succesfull'],
    data() {
        return {
            valid: false,
            selectedFile: null as File | null,
            file: null
        };
    },
    methods: {
        closeDialog() {
            this.$emit('close');
        },
        openDialog() {
            console.log('open dialog');
            this.$emit('open');
        },
        onFileChange(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                this.selectedFile = target.files[0];
            }
        },
        async uploadPhoto() {
            if ((this.$refs.form as { validate: () => boolean }).validate() && this.selectedFile) {
                const formData = new FormData();
                formData.append('file', this.selectedFile as File);

                // console.log('FormData:', formData.get('file'));

                try {
                    const response = await httpUpload.post(`product/sku/import/${this.productId}`,
                        formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    await this.$emit('import-succesfull', response);
                    await this.$emit('close');
                    this.closeDialog();
                } catch (error) {
                    console.error('Error uploading photo:', error);
                    this.closeDialog();
                }
            } else {
                console.error('No file selected or form validation failed');
            }
        },
    },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>