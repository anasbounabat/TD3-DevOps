/**
 * DEVOPS-1
 * POST /workouts → save a gym session { exercise, weight, sets, reps, date? }
 * GET  /workouts → list my sessions
 */
import { Router } from 'express'
import { store, sendError, requireUser } from '../../utils/store.js'
import { validateWorkout } from '../../utils/validation.js'

const router = Router()

router.post('/workouts', requireUser, (req, res) => {
  const errors = validateWorkout(req.body)
  if (errors.length > 0) return sendError(res, 400, errors.join(', '))

  const { exercise, weight, sets, reps, date } = req.body
  const workout = {
    id: store.nextId++,
    user: req.user,
    exercise: exercise.trim().toLowerCase(),
    weight,
    sets,
    reps,
    date: date || new Date().toISOString().slice(0, 10)
  }
  store.workouts.push(workout)
  res.status(201).json(workout)
})

router.get('/workouts', requireUser, (req, res) => {
  res.status(200).json(store.workouts.filter(w => w.user === req.user))
})

export default router
