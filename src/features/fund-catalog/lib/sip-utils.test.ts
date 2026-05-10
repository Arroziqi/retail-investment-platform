import { calculateNextExecutionDate } from './sip-utils';
import { addDays, addMonths, startOfDay } from 'date-fns';

describe('calculateNextExecutionDate', () => {
  const today = startOfDay(new Date());

  it('calculates the next weekly date correctly when start date is today', () => {
    const nextDate = calculateNextExecutionDate(today, 'weekly');
    const expected = addDays(today, 7);
    expect(nextDate).toEqual(expected);
  });

  it('calculates the next monthly date correctly when start date is today', () => {
    const nextDate = calculateNextExecutionDate(today, 'monthly');
    const expected = addMonths(today, 1);
    expect(nextDate).toEqual(expected);
  });

  it('calculates the next occurrence if start date was in the past', () => {
    const pastDate = addDays(today, -10);
    // For weekly, if it was 10 days ago, next occurrence is 4 days from now (14 days from pastDate)
    const nextDate = calculateNextExecutionDate(pastDate, 'weekly');
    const expected = addDays(pastDate, 14);
    expect(nextDate).toEqual(expected);
  });

  it('calculates the next occurrence for monthly if start date was in the past', () => {
    const pastDate = addMonths(today, -2);
    // For monthly, next occurrence is in 1 month from pastDate? 
    // No, while nextDate <= now, add month.
    // If it was 2 months ago, nextDate = pastDate + 1 month (still <= now), nextDate = pastDate + 2 months (still <= now), nextDate = pastDate + 3 months.
    const nextDate = calculateNextExecutionDate(pastDate, 'monthly');
    const expected = addMonths(pastDate, 3);
    expect(nextDate).toEqual(expected);
  });
});
