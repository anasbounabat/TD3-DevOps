/**
 * DEVOPS-1 — Integration tests for /workouts.
 */
import request from 'supertest'
import app from '../src/app.js'
import { resetStore } from '../src/utils/store.js'
import { describe, it, expect, beforeEach } from 'vitest'

const addWorkout = (user, body) => request(app).post('/workouts').set('x-user', user).send(body)

describe('POST /workouts', () => {
  beforeEach(() => resetStore())

  it('saves a workout and returns 201', async () => {
    const res = await addWorkout('moi', { exercise: 'Bench', weight: 80, sets: 4, reps: 8, date: '2026-11-02' })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ id: 1, user: 'moi', exercise: 'bench', weight: 80 })
  })

  it('uses today as default date', async () => {
    const res = await addWorkout('moi', { exercise: 'squat', weight: 100, sets: 5, reps: 5 })
    expect(res.status).toBe(201)
    expect(res.body.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('rejects an incomplete workout with 400', async () => {
    const res = await addWorkout('moi', { exercise: 'bench' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe(true)
  })

  it('rejects an unknown user with 401', async () => {
    const res = await addWorkout('ghost', { exercise: 'bench', weight: 80, sets: 4, reps: 8 })
    expect(res.status).toBe(401)
  })
})

describe('GET /workouts', () => {
  beforeEach(() => resetStore())

  it('returns only my workouts', async () => {
    await addWorkout('moi', { exercise: 'bench', weight: 80, sets: 4, reps: 8 })
    await addWorkout('karim', { exercise: 'bench', weight: 90, sets: 4, reps: 8 })
    const res = await request(app).get('/workouts')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
  })
})
