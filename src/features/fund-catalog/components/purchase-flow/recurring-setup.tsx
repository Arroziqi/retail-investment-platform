'use client'

import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { RecurringFrequency } from '@/types/recurring'
import { calculateNextExecutionDate, formatDisplayDate } from '../../lib/sip-utils'

interface RecurringSetupProps {
  amount: string;
  setAmount: (val: string) => void;
  frequency: RecurringFrequency;
  setFrequency: (val: RecurringFrequency) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  minInvestment: number;
}

export function RecurringSetup({
  amount,
  setAmount,
  frequency,
  setFrequency,
  startDate,
  setStartDate,
  minInvestment
}: RecurringSetupProps) {
  const isValidAmount = Number(amount) >= minInvestment
  const nextDate = startDate ? calculateNextExecutionDate(startDate, frequency) : null

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Investment Amount (Rp)</Label>
        <Input
          id="amount"
          type="number"
          placeholder={`Min. Rp ${minInvestment.toLocaleString()}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {amount && !isValidAmount && (
          <p className="text-xs text-destructive">
            Amount must be at least Rp {minInvestment.toLocaleString()}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Frequency</Label>
        <RadioGroup 
          defaultValue={frequency} 
          onValueChange={(val) => setFrequency(val as RecurringFrequency)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly" className="cursor-pointer">Weekly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger render={
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          } />
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </PopoverContent>
        </Popover>
      </div>

      {startDate && (
        <div className="rounded-lg bg-muted p-3 text-sm">
          <p className="text-muted-foreground">Next execution date:</p>
          <p className="font-semibold text-primary">{formatDisplayDate(nextDate!)}</p>
        </div>
      )}
    </div>
  )
}
