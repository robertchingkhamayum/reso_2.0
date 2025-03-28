import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  userSignupMiddleware,
  userSigninMiddleware,
} from "../middleware/usersMiddleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;
const router = Router();

interface CostomRequestSignup extends Request {
  email?: string;
  name?: string;
  password?: string;
}

//user sign up route
router.post(
  "/signup",
  userSignupMiddleware,
  async (req: CostomRequestSignup, res: Response) => {
    const name = req.name;
    const email = req.email;
    const password = req.password;

    try {
      const user = await prisma.user.create({
        data: {
          email: email!,
          name: name!,
          password: password!,
        },
      });
      const details = {
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({
        message: "User registered successfully",
        authorization: "Bearer " + token,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
);

interface CostomRequestSignin extends Request {
  email?: string;
  role?: "USER";
}


//user sign in route
router.post(
  "/signin",
  userSigninMiddleware,
  (req: CostomRequestSignin, res: Response) => {
    const email = req.email;
    const role = req.role;

    try {
      const details = {
        email: email!,
        role: role,
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({
        message: "User signin successfully",
        authorization: "Bearer " + token,
        role: role,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
);

export default router;
