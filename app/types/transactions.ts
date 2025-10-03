export interface ITransaction {
    date: string;
    amount: number;
    category: string
}

export type TransactionFilter =
    | "all"
    | "today"
    | "week"
    | "month"
    | "custom";