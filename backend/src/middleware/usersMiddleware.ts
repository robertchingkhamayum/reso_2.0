import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { emailSchema, stringSchema, passwordSchema } from "./validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface CostomRequestSignup extends Request {
  email?: string;
  name?: string;
  password?: string;
}

//user signup Middleware
export const userSignupMiddleware = async (
  req: CostomRequestSignup,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Validate input using Zod
    const nameParsed = stringSchema.safeParse(name);
    const emailParsed = emailSchema.safeParse(email);
    const passwordParsed = passwordSchema.safeParse(password);

    if (
      !nameParsed.success ||
      !emailParsed.success ||
      !passwordParsed.success
    ) {
      res.status(400).json({ message: "Please enter correct input" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: emailParsed.data! },
    });

    if (user) {
      res.status(409).json({ message: "Email already registered" });
      return;
    }

    req.name = nameParsed.data;
    req.email = emailParsed.data;
    req.password = passwordParsed.data;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

interface CostomRequestSignin extends Request {
  email?: string;
  password?: string;
  role?: "USER";
}


//user signin Middleware
export const userSigninMiddleware = async (
  req: CostomRequestSignin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate input using Zod
    const emailParsed = emailSchema.safeParse(email);
    const passwordParsed = passwordSchema.safeParse(password);

    if (!emailParsed.success || !passwordParsed.success) {
      res.status(400).json({ message: "Please enter correct input" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: emailParsed.data! },
    });
    if (!user) {
      res.status(409).json({ message: "User doesn't exist" });
      return;
    }
    if (
      !(
        user.password === passwordParsed.data && user.email === emailParsed.data
      )
    ) {
      res.status(403).json({ message: "Forbidden: Incorrect credential" });
      return;
    }
    if(!(user.role==="USER")){
      res.status(403).json({ message: "Forbidden: You're not a user" });
      return;
    }
    req.email = user.email;
    req.role = user.role;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
