<script setup lang="ts">
import MetricsCard from "~/components/common/MetricsCard.vue";
import { useTransactions } from "~/stores/transactions";

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
          amount > max.amount ? { category, amount } : max,
      { category: "", amount: 0 }
  ).category;
});

onMounted(async () => {
  await transactionStore.fetchTransactions()
});
</script>

<template>
  <div>
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
      <template v-else-if="transactionStore.filteredTransactions.length">
        <MetricsCard label="Всего дохода" :value="totalIncome" currency />
        <MetricsCard label="Количество заказов" :value="transactionStore.filteredTransactions.length" />
        <MetricsCard label="Средний чек" :value="averageBill" currency />
        <MetricsCard label="Наибольший доход" :value="highestIncome"/>
      </template>
    </div>
  </div>
</template>


<style scoped>

</style>