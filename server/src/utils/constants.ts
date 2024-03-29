import crypto from 'crypto'

export const EXP_IN_ACCESS_TOKEN = '1m'
export const EXP_IN_REFRESH_TOKEN = '7d'
export const SECRET_KEY = crypto.randomBytes(32).toString('hex')
