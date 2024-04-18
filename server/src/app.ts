import express, { Request, Response, NextFunction } from 'express'
import mongoose, { Mongoose, mongo } from 'mongoose'
import cookieParser from 'cookie-parser'
import { setLocalDataMiddleware } from './middlewares/setLocalDataMiddleware'
import { authRouter } from './routes/Auth'
import { postRouter } from './routes/Post'
import { homeRouter } from './routes/Home'

const app = express()

app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Vary', 'Origin')
  next()
})

app.use(express.json())
app.use(cookieParser())

app.use(setLocalDataMiddleware)

app.use(authRouter)
app.use(postRouter)
app.use(homeRouter)

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/socialNetwork')
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('SIGINT', async () => {
  await mongoose.disconnect()
  console.log('Server closed')
  process.exit()
})
