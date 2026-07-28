interface Secret {
    name: string,
    value: string
}

interface ObjectMap {
    key: number,
    value: any
}

type ChestItem = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12 | 13 | 14;

interface ChestRewards {
    orbs: number,
    diamonds: number,
    item1: ChestItem,
    item2: ChestItem
}