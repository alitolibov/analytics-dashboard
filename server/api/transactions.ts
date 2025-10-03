export default defineEventHandler(async () => {

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
        { "date": "2024-06-01", "amount": 1200, "category": "Электроника" },
        { "date": "2024-06-01", "amount": 800, "category": "Одежда" },
        { "date": "2024-06-02", "amount": 1500, "category": "Электроника" },
        { "date": "2024-06-02", "amount": 600, "category": "Книги" },
        { "date": "2024-06-03", "amount": 900, "category": "Одежда" },
        { "date": "2024-06-03", "amount": 2000, "category": "Электроника" },
        { "date": "2024-06-04", "amount": 700, "category": "Книги" }
    ];
});