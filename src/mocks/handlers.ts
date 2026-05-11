import { http, HttpResponse, delay } from 'msw'
import { mockUsers } from './data/users'
import { mockFunds } from './data/funds'
import { mockPortfolio, mockOrders } from './data/portfolio'
import { mockRecurringPlans } from './data/recurring'
import { RecurringPlan, CreateRecurringPlanRequest } from '../types/recurring'
import { mockWatchlist } from './data/watchlist'
import { WatchlistItem } from '@/types/watchlist'
import { User } from '@/types/user'

export const handlers = [
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok' })
  }),

  http.post('/api/auth/register', async ({ request }) => {
    await delay(1000)
    const body = await request.json() as { email: string }
    const newUser = {
      id: `u${mockUsers.length + 1}`,
      email: body.email,
      kycStatus: body.email.includes('verified') ? 'Verified' : 'Unverified',
      balance: 0,
      currency: 'IDR',
    }
    return HttpResponse.json({ user: newUser, token: 'mock-token' }, { status: 201 })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    await delay(800)
    const body = await request.json() as { email: string }
    const user = mockUsers.find(u => u.email === body.email)
    if (user) {
      return HttpResponse.json({ user, token: 'mock-token' })
    }
    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }),

  http.post('/api/kyc/submit', async () => {
    await delay(1500)
    // For development convenience, we return 'Verified' immediately.
    // Change this back to 'Pending' to test the waiting room UI.
    return HttpResponse.json({ message: 'KYC Submitted successfully', status: 'Verified' })
  }),

  http.get('/api/funds', async ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')?.toLowerCase()

    let filtered = [...mockFunds]
    if (category && category !== 'All') {
      filtered = filtered.filter(f => f.category === category)
    }
    if (search) {
      filtered = filtered.filter(f => f.name.toLowerCase().includes(search))
    }

    return HttpResponse.json(filtered)
  }),

  http.get('/api/portfolio', async () => {
    await delay(500)
    return HttpResponse.json(mockPortfolio)
  }),

  http.get('/api/orders', async () => {
    await delay(500)
    return HttpResponse.json(mockOrders)
  }),

  http.get('/api/recurring-plans', async () => {
    await delay(500)
    return HttpResponse.json(mockRecurringPlans)
  }),

  http.post('/api/recurring-plans', async ({ request }) => {
    await delay(1000)
    const body = await request.json() as CreateRecurringPlanRequest
    
    // Calculate next execution date (simple simulation)
    const startDate = new Date(body.startDate)
    const nextDate = new Date(startDate)
    if (body.frequency === 'weekly') {
      nextDate.setDate(startDate.getDate() + 7)
    } else {
      nextDate.setMonth(startDate.getMonth() + 1)
    }

    const newPlan: RecurringPlan = {
      id: `rp${mockRecurringPlans.length + 1}`,
      userId: 'u1', // Default mock user
      fundId: body.fundId,
      amount: body.amount,
      frequency: body.frequency,
      startDate: body.startDate,
      nextExecutionDate: nextDate.toISOString().split('T')[0],
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    
    mockRecurringPlans.push(newPlan)
    return HttpResponse.json(newPlan, { status: 201 })
  }),

  http.delete('/api/recurring-plans/:id', async ({ params }) => {
    await delay(800)
    const { id } = params
    const index = mockRecurringPlans.findIndex(p => p.id === id)
    if (index !== -1) {
      mockRecurringPlans[index].status = 'cancelled'
      return HttpResponse.json(mockRecurringPlans[index])
    }
    return HttpResponse.json({ message: 'Plan not found' }, { status: 404 })
  }),

  http.get('/api/watchlist', async () => {
    await delay(500)
    return HttpResponse.json(mockWatchlist)
  }),

  http.post('/api/watchlist', async ({ request }) => {
    await delay(800)
    const body = await request.json() as Omit<WatchlistItem, 'id' | 'addedAt'>
    
    if (mockWatchlist.length >= 20) {
      return HttpResponse.json({ message: 'Watchlist limit reached' }, { status: 400 })
    }

    const newItem: WatchlistItem = {
      ...body,
      id: `w${mockWatchlist.length + 1}`,
      addedAt: new Date().toISOString(),
    }
    mockWatchlist.push(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  http.delete('/api/watchlist/:id', async ({ params }) => {
    await delay(500)
    const { id } = params
    const index = mockWatchlist.findIndex(item => item.id === id || item.assetId === id)
    if (index !== -1) {
      const deleted = mockWatchlist.splice(index, 1)[0]
      return HttpResponse.json(deleted)
    }
    return HttpResponse.json({ message: 'Item not found' }, { status: 404 })
  }),

  http.patch('/api/user/profile', async ({ request }) => {
    await delay(1000)
    const body = await request.json() as Partial<User>
    const user = mockUsers[0] // Default mock user
    Object.assign(user, body)
    return HttpResponse.json(user)
  }),

  http.post('/api/analytics/track', async ({ request }) => {
    const event = await request.json()
    console.log('[MSW] Track Event:', event)
    return HttpResponse.json({ success: true }, { status: 201 })
  }),
]
