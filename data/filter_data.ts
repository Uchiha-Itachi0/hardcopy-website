import {Filters} from "@/utils/types";

export const filterData: Filters = {
    applied: [
        {
            id: 1,
            text: 'All',
            isActive: true,
            order: 0,
        },
    ],
    apply: [
        {
            id: 2,
            text: 'Pending',
            isActive: false,
            order: 0,
        },
        {
            id: 3,
            text: 'Completed',
            isActive: false,
            order: 1,
        },
        {
            id: 4,
            text: 'Urgent',
            isActive: false,
            order: 2,
        },
        {
            id: 5,
            text: 'Cancelled',
            isActive: false,
            order: 3,
        },
    ]
}