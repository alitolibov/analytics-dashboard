<script setup lang="ts">
import MetricsCard from "~/components/common/MetricsCard.vue";
import {useTransactions} from "~/stores/transactions";
import {filterOptions} from "~/constants";
import SelectRangeModal from "~/components/modals/SelectRangeModal.vue";
import {formatRange} from "~/utils/formatter";
import LineChart from "~/components/charts/LineChart.vue";

const showSelectModal = ref(false)
const transactionStore = useTransactions()

const totalIncome = computed(() =>
    transactionStore.filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
);

const averageBill = computed(() =>
    transactionStore.filteredTransactions.length
        ? totalIncome.value / transactionStore.filteredTransactions.length
        : 0
);

const highestIncome = computed(() => {
  const categoryMap = transactionStore.filteredTransactions.reduce<Record<string, number>>(
      (acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + t.amount;
        return acc;
      },
      {}
  );

  return Object.entries(categoryMap).reduce(
      (max, [category, amount]) =>
          amount > max.amount ? {category, amount} : max,
      {category: "", amount: 0}
  ).category;
});
</script>

<template>
  <div class="space-y-5">
    <Select :options="filterOptions"
            v-model="transactionStore.selectedFilter"
            @update:model-value="(val) => showSelectModal = val === 'custom'"
            option-label="label"
            option-value="value"
    >
      <template #value="{ value }">
        <span v-if="value === 'custom' && transactionStore.customRange">
          {{
            transactionStore.customRange.from && transactionStore.customRange.to ? formatRange(transactionStore.customRange) : value
          }}
      </span>
        <span v-else>
      {{ filterOptions.find(opt => opt.value === value)?.label }}
    </span>
      </template>
    </Select>
    <div class="grid items-stretch grid-cols-2 gap-3 xl:grid-cols-4">
      <template v-if="transactionStore.isLoading">
        <Skeleton
            v-for="i in 4"
            :key="i"
            border-radius="16px"
            width="100%"
            height="144px"
        />
      </template>
      <template v-else>
        <MetricsCard label="Всего дохода" :value="totalIncome" currency/>
        <MetricsCard label="Количество заказов" :value="transactionStore.filteredTransactions.length"/>
        <MetricsCard label="Средний чек" :value="averageBill" currency/>
        <MetricsCard label="Наибольший доход" :value="highestIncome || '-'"/>
      </template>
    </div>
      <client-only>
        <LineChart/>
        <template #placeholder>
          <p class="text-center mt-10 text-lg">Загрузка графика...</p>
        </template>
      </client-only>
    <SelectRangeModal v-model="showSelectModal"/>
  </div>
</template>


<style scoped>

</style>