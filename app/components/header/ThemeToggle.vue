<script setup lang="ts">
import IconSun from "~/components/icons/IconSun.vue";
import IconMoon from "~/components/icons/IconMoon.vue";

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <client-only>
    <button class="theme-btn" @click="toggleTheme">
      <transition name="fade" mode="out-in">
        <IconSun v-if="isDark" key="sun" class="icon" />
        <IconMoon v-else key="moon" class="icon" />
      </transition>
    </button>
  </client-only>
</template>

<style scoped>
.theme-btn {
  @apply bg-primary-400 dark:bg-primary-400 p-2 rounded-full outline-none focus:outline-dashed focus:outline-2 focus:outline-primary-400;
}

.icon {
  width: 24px;
  height: 24px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.7) rotate(-45deg);
}
</style>
