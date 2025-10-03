import {defineStore} from "pinia";
import type {ITransaction, TransactionFilter} from "~/types/transactions";
import moment from "moment";

export interface DateRange {
    from: Date;
    to: Date;
}

export const useTransactions = defineStore("transactions", () => {
    const transactions = ref<ITransaction[]>([])
    const isLoading = ref(false);

    const selectedFilter = ref<TransactionFilter>("all");
    const customRange = ref<DateRange | null>(null);


    async function fetchTransactions() {
        isLoading.value = true;
        try {
            transactions.value = await $fetch<ITransaction[]>("/api/transactions");
        } catch (err) {
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    }

    const filteredTransactions = computed(() => {
        if (selectedFilter.value === "all") return transactions.value;

        let start, end;

        if (selectedFilter.value === "custom" && customRange.value) {
            start = moment(customRange.value.from).startOf("day");
            end = moment(customRange.value.to).endOf("day");
        } else if (isFilterKey(selectedFilter.value)) {
            ({ start, end } = filterMap[selectedFilter.value]());
        }

        if (!start || !end) return transactions.value;

        return transactions.value.filter((t) =>
            moment(t.date).isBetween(start, end, null, "[]")
        );
    });

    return {
        isLoading,
        selectedFilter,
        customRange,
        filteredTransactions,
        fetchTransactions
    }
})