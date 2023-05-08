export interface addedTask {
    task: string
    date: Date | null
    remember: boolean
}

export interface Task extends addedTask {
    id: string;
    createdAt: Date;
}