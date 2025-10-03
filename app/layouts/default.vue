<script setup lang="ts">

import ThemeToggle from "~/components/header/ThemeToggle.vue";
</script>

<template>
  <header class="bg-primary-300 dark:bg-primary-500">
    <div class="container flex items-center justify-between px-4 h-20">
      <h3 class="text-lg md:text-xl text-white font-semibold">Дашборд продаж</h3>
      <ThemeToggle/>
    </div>
  </header>
  <main class="container my-6 md:my-8">
    <slot/>
  </main>
</template>

<style scoped>

</style>