import { addDays, addMonths, format, startOfDay } from 'date-fns';
import { RecurringFrequency } from '../../types/recurring';

export function calculateNextExecutionDate(startDate: Date, frequency: RecurringFrequency): Date {
  const start = startOfDay(startDate);
  const now = startOfDay(new Date());
  
  let nextDate = start;
  
  // If the start date is in the past, calculate the next occurrence
  while (nextDate <= now) {
    if (frequency === 'weekly') {
      nextDate = addDays(nextDate, 7);
    } else {
      nextDate = addMonths(nextDate, 1);
    }
  }
  
  return nextDate;
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayDate(date: Date): string {
  return format(date, 'PPP');
}
