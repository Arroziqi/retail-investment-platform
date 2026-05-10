import { RecurringPlan } from '../../types/recurring';

export const mockRecurringPlans: RecurringPlan[] = [
  {
    id: 'rp1',
    userId: 'u1',
    fundId: 'f1',
    amount: 100000,
    frequency: 'monthly',
    startDate: '2026-05-01',
    nextExecutionDate: '2026-06-01',
    status: 'active',
    createdAt: '2026-05-01T10:00:00Z',
  },
];
