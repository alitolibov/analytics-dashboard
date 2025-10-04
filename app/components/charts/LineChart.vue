<template>
  <div class="overflow-x-auto">
    <template v-if="filtered.length">
      <Chart
          :type="chartType"
          :data="chartData"
          :options="chartOptions"
          class="h-[30rem] min-w-[600px] w-full"
      />
    </template>
    <p v-else class="text-lg text-center font-semibold text-gray-500 py-10">
      Нету данных 😔
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from "moment"
import { computed } from "vue"
import { useTransactions } from "~/stores/transactions"

const transactionStore = useTransactions()

const filtered = computed(() => transactionStore.filteredTransactions)
const chartType = computed(() =>
    transactionStore.selectedFilter === "today" ? "bar" : "line"
)

const chartData = computed(() => {
  if (!filtered.value.length) return { labels: [], datasets: [] }

  const style = getComputedStyle(document.documentElement)

  const labels = [...new Set(filtered.value.map(t => t.date))].sort(
      (a, b) => moment(a).unix() - moment(b).unix()
  )

  const categories = [...new Set(filtered.value.map(t => t.category))]

  const datasets = categories.map((category, index) => {
    const color = getColorByIndex(index, style)

    const data = labels.map(date =>
        filtered.value
            .filter(t => t.category === category && t.date === date)
            .reduce((acc, t) => acc + t.amount, 0)
    )

    return {
      label: category,
      data,
      fill: chartType.value === "line",
      borderColor: color,
      backgroundColor: color + "50",
      tension: 0.4,
    }
  })

  return { labels, datasets }
})

const chartOptions = computed(() => {
  const style = getComputedStyle(document.documentElement)

  const textColor = style.getPropertyValue("--p-text-color").trim()
  const textMuted = style.getPropertyValue("--p-text-muted-color").trim()
  const borderColor = style.getPropertyValue("--p-content-border-color").trim()

  return {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: { color: textColor },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: textMuted },
        grid: { color: borderColor },
      },
      y: {
        beginAtZero: true,
        ticks: { color: textMuted },
        grid: { color: borderColor },
      },
    },
  }
})

function getColorByIndex(index: number, style: CSSStyleDeclaration): string {
  const colors = [
    "--p-cyan-500",
    "--p-gray-500",
    "--p-green-500",
    "--p-orange-500",
    "--p-purple-500",
    "--p-pink-500",
  ] as const

  const colorVar = colors[index % colors.length] || colors[0]
  const value = style.getPropertyValue(colorVar).trim()

  return value || "#999"
}
</script>

