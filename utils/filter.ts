import {Filter, Filters} from "@/utils/types";

export const handleUnapplyFilter = (prevFilters: Filters, filter: Filter) => {
    const updatedApplied = prevFilters.applied.filter((f) => f.id !== filter.id);
    const updatedApply = [...prevFilters.apply];
    const numActiveFilters = prevFilters.applied.filter((f) => {
        return f.isActive;
    }).length;
    if (numActiveFilters > 1) {
        updatedApply.push({ ...filter, isActive: false });
    } else {
        updatedApplied.push(filter);
    }

    return { applied: updatedApplied, apply: updatedApply };
}

export const handleApplyFilter = (prevFilters: Filters, filter: Filter) => {
    const updatedApply = prevFilters.apply.filter((f) => f.id !== filter.id);
    prevFilters.applied.forEach((f) => {
        if (f.id !== filter.id) {
            f.isActive = false;
            updatedApply.splice(f.order, 0, f);
        }
    });
    const updatedApplied = [{ ...filter, isActive: true }];
    return { applied: updatedApplied, apply: updatedApply };
}