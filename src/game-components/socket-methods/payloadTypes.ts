export interface InitialDataPayload {
    mobHP: number,
    mobMaxHP: number,
    coins: number,
    xp: number,
    xpNeeded: number,
    level: number,
}

export interface ClickReceivedPayload {
    mobHP: number
}

export interface LevelUpeventPayload {
    xp: number,
    level: number,
    xpNeeded: number,
    mobMaxHP: number,
}

export interface MobDeathEventPayload {
    xp: number,
    coins: number,
}