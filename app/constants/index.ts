interface Option {
    label: string;
    value: string;
}

export const filterOptions:Option[] = [
    {
        label: 'За всё время',
        value: 'all'
    },
    {
        label: 'Сегодня',
        value: 'today'
    },
    {
        label: 'За неделю',
        value: 'week'
    },
    {
        label: 'За месяц',
        value: 'month'
    },
    {
        label: 'Указать диапазон',
        value: 'custom'
    }
];