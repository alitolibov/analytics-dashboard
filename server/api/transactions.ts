import { defineEventHandler } from "h3";
import moment from "moment";

export default defineEventHandler(async () => {
    const startDate = moment("2025-09-01");
    const endDate = moment();
    const categories = ["Электроника", "Одежда", "Книги", "Продукты", "Транспорт", "Развлечения"];

    const transactions: { date: string; amount: number; category: string }[] = [];

    for (let d = moment(startDate); d.isSameOrBefore(endDate); d.add(1, "day")) {
        const count = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < count; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const amount = Math.floor(Math.random() * 2500) + 300;

            transactions.push({
                date: d.format("YYYY-MM-DD"),
                amount,
                category,
            });
        }
    }

    return transactions;
});
