import type { IPrice2Value, IPrice2ValuePrices } from "."

export const DEF_VALUE_PRICES: IPrice2ValuePrices[] = [
    {
        id: 1,
        price: 5000,
        title: "Simple plan",
        is_active: false,
        list: [
            {
                id: 1,
                title: "Lorem ipsum dolor",
            },
            {
                id: 2,
                title: "Sit amet consectetur adipiscing",
            },
            {
                id: 3,
                title: "Elit sed do eiusmod tempor",
            },
            {
                id: 4,
                title: "Incididunt ut labore",
            },
            {
                id: 5,
                title: "Et dolore magna aliqua incididunt",
            },
            {
                id: 6,
                title: "Elit sed do eiusmod tempor",
            },
        ],
    },
    {
        id: 2,
        price: 7000,
        title: "Professional plan",
        is_active: true,
        list: [
            {
                id: 1,
                title: "Lorem ipsum dolor 2",
            },
            {
                id: 2,
                title: "Sit amet consectetur adipiscing 2",
            },
            {
                id: 3,
                title: "Elit sed do eiusmod tempor 2",
            },
            {
                id: 4,
                title: "Incididunt ut labore 2",
            },
            {
                id: 5,
                title: "Et dolore magna aliqua incididunt 2",
            },
            {
                id: 6,
                title: "Elit sed do eiusmod tempor 2",
            },
        ],
    },
    {
        id: 3,
        price: 12000,
        title: "Enterprise plan",
        is_active: false,
        list: [
            {
                id: 1,
                title: "Lorem ipsum dolor 3",
            },
            {
                id: 2,
                title: "Sit amet consectetur adipiscing 3",
            },
            {
                id: 3,
                title: "Elit sed do eiusmod tempor 3",
            },
            {
                id: 4,
                title: "Incididunt ut labore 3",
            },
            {
                id: 5,
                title: "Et dolore magna aliqua incididunt 3",
            },
            {
                id: 6,
                title: "Elit sed do eiusmod tempor 3",
            },
        ],
    },
]

export const DEF_VALUE: IPrice2Value = {
    title: "We are the best company 🚀",
    subtitle: "Buy now and get 50% off",
    button_text: "Order now",
    prices: DEF_VALUE_PRICES,
}

export default DEF_VALUE
