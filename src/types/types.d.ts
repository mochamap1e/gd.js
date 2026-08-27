interface Secret {
    name: string,
    value: string
}

interface ObjectMap {
    key: number,
    value: any
}

interface ChestValues {
    minOrbs: number,
    maxOrbs: number,
    minDiamonds: number,
    maxDiamonds: number,
    minShards: number,
    maxShards: number,
    minKeys: number,
    maxKeys: number
    delay: number
}

interface ChestRewards {
    orbs: number,
    diamonds: number,
    item1: ChestItem,
    item2: ChestItem
}

interface QuestAttributes {
    questsCompleted: number,
    itemNeeded: 1 | 2 | 3,
    itemNeededAmount: number,
    diamonds: number,
    name: string
}

interface WraithReward {
    key: string,
    reward: string,
    rewardId: number,
    chestType: 1 | 2
}