import { mockSubscriptions, type Subscription } from '../api/mock-data'


export async function fetchSubscriptions(): Promise<Subscription[]> {
// simulate network delay
await new Promise((res) => setTimeout(res, 1000))
// for error simulation 
return mockSubscriptions
}