/**
 * DEVOPS-1 — Unit tests for validateWorkout().
 */
import { describe, it, expect } from 'vitest'
import { validateWorkout } from '../../src/utils/validation.js'

describe('validateWorkout', () => {
  it('accepts a valid workout', () => {
    expect(validateWorkout({ exercise: 'bench', weight: 80, sets: 4, reps: 8 })).toEqual([])
  })

  it('reports every missing field', () => {
    expect(validateWorkout()).toHaveLength(4)
  })

  it('rejects negative weight and zero sets', () => {
    expect(validateWorkout({ exercise: 'bench', weight: -5, sets: 0, reps: 8 })).toHaveLength(2)
  })

  it('rejects an empty exercise name', () => {
    expect(validateWorkout({ exercise: '  ', weight: 10, sets: 1, reps: 1 })).toEqual(['exercise is required'])
  })
})
