import type {Moment} from "moment/moment";
import moment from "moment";

export type FilterKey = "today" | "week" | "month";
export type FilterType = FilterKey | "custom" | "all";

export interface DateRange {
    start: Moment;
    end: Moment;
}

export const filterMap: Record<FilterKey, () => DateRange> = {
    today: () => ({
        start: moment().startOf("day"),
        end: moment().endOf("day"),
    }),
    week: () => ({
        start: moment().subtract(1, "week").startOf("week"),
        end: moment().subtract(1, "week").endOf("week"),
    }),
    month: () => ({
        start: moment().subtract(1, "month").startOf("month"),
        end: moment().subtract(1, "month").endOf("month"),
    }),
};

export function isFilterKey(value: FilterType): value is FilterKey {
    return value in filterMap;
}