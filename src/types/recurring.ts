export type RecurringFrequency = 'weekly' | 'monthly';

export interface RecurringPlan {
  id: string;
  userId: string;
  fundId: string;
  amount: number;
  frequency: RecurringFrequency;
  startDate: string;
  nextExecutionDate: string;
  status: 'active' | 'cancelled';
  createdAt: string;
}

export interface CreateRecurringPlanRequest {
  fundId: string;
  amount: number;
  frequency: RecurringFrequency;
  startDate: string;
}
