export default interface Activity {
    id: string
    eventType: string
}

export type EventType = 'completed' | 'live' | 'upcoming'
