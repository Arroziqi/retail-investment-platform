import { calculateRiskProfile } from './scoring'

describe('calculateRiskProfile', () => {
  it('should return Conservative for low scores', () => {
    const profile = calculateRiskProfile(30)
    expect(profile.category).toBe('Conservative')
    expect(profile.allocation.find(a => a.category === 'Money Market')?.percentage).toBe(60)
  })

  it('should return Moderate for medium scores', () => {
    const profile = calculateRiskProfile(55)
    expect(profile.category).toBe('Moderate')
    expect(profile.allocation.find(a => a.category === 'Fixed Income')?.percentage).toBe(40)
  })

  it('should return Aggressive for high scores', () => {
    const profile = calculateRiskProfile(85)
    expect(profile.category).toBe('Aggressive')
    expect(profile.allocation.find(a => a.category === 'Equity')?.percentage).toBe(80)
  })
})
