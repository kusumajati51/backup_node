<template>
  <component :is="$route.meta.layout || 'div'" >
    <router-view />
  </component>
</template>

<script lang="ts" setup>
//
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
  }
</style>