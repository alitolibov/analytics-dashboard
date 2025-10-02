<script setup lang="ts">

import ThemeToggle from "~/components/header/ThemeToggle.vue";
</script>

<template>
<header class="bg-primary-300 dark:bg-primary-500">
  <div class="container flex items-center justify-between p-4 mx-auto">
    <h3 class="text-lg md:text-xl text-white font-semibold">Дашборд продаж</h3>
    <ThemeToggle/>
  </div>
</header>
</template>

<style scoped>

</style>