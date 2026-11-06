/**
 * In-memory store shared by the gym routes (no database for the lab).
 * Data is lost when the server restarts.
 */
export const SEED_USERS = ['moi', 'karim', 'sara', 'ines']

export const store = {}

export function resetStore () {
  store.users = new Set(SEED_USERS)
  store.workouts = []
  store.friends = new Map()
  store.planning = new Map()
  store.nextId = 1
}

resetStore()

/** Send a consistent JSON error: { error: true, message } */
export function sendError (res, status, message) {
  return res.status(status).json({ error: true, message })
}

/** Middleware: current user from the "x-user" header (default "moi"). */
export function requireUser (req, res, next) {
  const user = String(req.get('x-user') || 'moi').toLowerCase()
  if (!store.users.has(user)) return sendError(res, 401, `Unknown user: ${user}`)
  req.user = user
  next()
}
