<script setup lang="ts">
import {formatCurrency} from "~/utils/formatter";

const props = defineProps<{
  label: string
  value: number | string
  currency?: boolean
}>()
</script>

<template>
  <article
      class="p-4 md:p-5 lg:p-6 bg-primary-300 dark:bg-primary-200 rounded-xl space-y-2 xl:space-y-3 flex flex-col justify-between min-h-36"
  >
    <p class="text-slate-300 dark:text-gray-400 font-semibold text-base xl:text-lg">
      {{ props.label }}
    </p>

    <p
        class="text-white font-semibold text-xl lg:text-2xl xl:text-3xl"
    >
      <span v-if="currency">
        {{ formatCurrency(Number(props.value)) }}
      </span>
      <span v-else>
        {{ props.value }}
      </span>
    </p>
  </article>
</template>
