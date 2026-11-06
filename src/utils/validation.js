/**
 * DEVOPS-1 — Validate a workout payload.
 * Returns an array of error messages (empty array = valid).
 */
export function validateWorkout (body = {}) {
  const errors = []
  const { exercise, weight, sets, reps } = body
  if (typeof exercise !== 'string' || exercise.trim() === '') errors.push('exercise is required')
  if (typeof weight !== 'number' || weight < 0) errors.push('weight must be a positive number')
  if (!Number.isInteger(sets) || sets <= 0) errors.push('sets must be an integer > 0')
  if (!Number.isInteger(reps) || reps <= 0) errors.push('reps must be an integer > 0')
  return errors
}
