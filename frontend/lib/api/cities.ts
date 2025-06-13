import axios from 'axios'

const url = axios.create({
    baseURL:'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
})

export interface City {
    id: number
    name: string
    country: string
    latitude: number
    longitude: number
    population?: number
    timezone?: string
    tags: string[]
    flag?: string
    description?: string
}

export const cityApi = {
    getAll: async (): Promise<City[]> => {
        const reponse = await url.get<City[]>('/city');
        return reponse.data;
    },
}