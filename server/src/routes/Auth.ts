import express, { Request, Response } from "express"
import { createUser } from "../controllers/createUser"
import { validFormSignUp } from "../middlewares/validFormSignUp"

const authRouter = express.Router()

authRouter.post("/authorization/SignUp", validFormSignUp, createUser)

export { authRouter }

