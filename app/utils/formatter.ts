export function formatNumber(num: number) {
    return new Intl.NumberFormat('en-US').format(num)
}

export function formatCurrency(num: number, currency: string = '₽') {
    const formattedNumber = new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(num)

    return `${formattedNumber} ${currency}`
}
