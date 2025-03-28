import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  adminSignupMiddleware,
  adminSigninMiddleware,
  adminEventMiddleware,
} from "../middleware/adminMiddleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validate } from "../middleware/validation";
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;
const router = Router();

interface CostomRequestSignup extends Request {
  email?: string;
  name?: string;
  password?: string;
}



//admin sign up route
router.post(
  "/signup",
  adminSignupMiddleware,
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
          role: "ADMIN",
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
  role?: "ADMIN";
}

//admin sign in route
router.post(
  "/signin",
  adminSigninMiddleware,
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

interface CostomRequestEvent extends Request {
  email?: string;
  role?: "ADMIN";
  event?: string;
  date?: string;
  description?: string;
}

//admin event create route
router.post(
  "/event",
  validate,
  adminEventMiddleware,
  async (req: CostomRequestEvent, res: Response) => {
    const { event, date, description } = req;
    try {
      const eventDetails = await prisma.event.create({
        data: {
          event: event!,
          date: date!,
          description: description!,
        },
      });

      res
        .status(201)
        .json({ message: "Event created successfully", eventDetails });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      return;
    }
  }
);

export default router;
