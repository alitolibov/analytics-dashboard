<script setup lang="ts">
import Dialog from 'primevue/dialog';
import DatePicker from 'primevue/datepicker';
import {useTailwindBreakpoints} from "~/components/composables/breakpoints";
import {useTransactions} from "~/stores/transactions";

const visible = defineModel<boolean>()
const breakpoints = useTailwindBreakpoints()
const transactionStore = useTransactions()

const date = ref<[Date, Date] | []>([]);

const isDisabled = computed(() => date.value?.length === 2 && date.value.every(Boolean))

function close() {
  if (!transactionStore.customRange?.from || !transactionStore.customRange?.to) {
    transactionStore.selectedFilter = 'all'
  }

  date.value = []
  visible.value = false
}

function save() {
  if (!date.value?.length) return

  const [from, to] = date.value;

  transactionStore.customRange = {
    from,
    to,
  }

  visible.value = false;
}

watch(
    () => transactionStore.customRange,
    (range) => {
      date.value = range?.from && range?.to
          ? [new Date(range.from), new Date(range.to)]
          : []
    })
</script>

<template>
  <Dialog v-model:visible="visible" header="Выберите диапазон" :style="{ width: '500px' }"
          :position="!breakpoints.md.value ? 'bottom' : 'center'"
          :breakpoints="{ '500px': '100%'}"
          @hide="close"
  >
    <template #closeicon>
      <i class="pi pi-times"/>
    </template>
    <DatePicker
        v-model="date"
        selectionMode="range"
        inline
        :max-date="new Date()"
        class="w-full"
        prevIcon="pi pi-angle-left"
        nextIcon="pi pi-angle-right"
        updateModelType="date"
    />
    <div class="flex items-center justify-end gap-4 mt-4">
      <Button label="Отменить" severity="secondary" @click="close"/>
      <Button label="Применить" @click="save" :disabled="!isDisabled"/>
    </div>
  </Dialog>
</template>

<style scoped>

</style>