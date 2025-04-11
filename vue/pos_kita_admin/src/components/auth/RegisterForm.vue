<template>

    <v-row class="d-flex  mb-3">

        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Name</v-label>
            <v-text-field v-model="name" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Email Address</v-label>
            <v-text-field v-model="email" variant="outlined" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Password</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" hide-details
                color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Phone Number</v-label>
            <v-text-field v-model="phone_number" variant="outlined" type="number" single-line hide-details color="primary"
                hide-spin-buttons></v-text-field>
        </v-col>
        <v-col>
            <v-label class="font-weight-medium mb-1">Gender</v-label>
            <v-select v-model="select" :hint="`${select.name}, ${select.value}`" :items="genders" item-title="name"
                item-value="value" label="Select" persistent-hint return-object single-line />
        </v-col>
        <v-col cols="12">
            <v-btn color="primary" rounded="pill" size="large" @click="getRegister" block flat>Sign up</v-btn>
        </v-col>
    </v-row>
</template>

<!-- <script setup lang="ts">
import { computed, ref } from 'vue';
const checkbox = ref(false);

const genders = ref([{
    name: "Male",
    value: "male"
}, {
    name: "Female",
    value: "female"
    }])
let selected = ref(genders.value[0])

let select = computed({
    get() {
        return selected.value
    }, 
    set(newValue) {
        selected.value = newValue;
    } 
})
</script> -->

<script lang="ts">
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            phone_number: "",
            select: {
                name: "Male",
                value: "male"
            },
            genders: [{
                name: "Male",
                value: "male"
            }, {
                name: "Female",
                value: "female"
            }]
        }
    },
    emits: ['register'],
    methods: {
        getRegister() {
            var register = {
                name: this.name,
                email: this.email,
                password: this.password,
                phoneNumber: this.phone_number,
                gender: this.select.value
            };
            this.$emit('register', register)
        }
    }

}
</script>