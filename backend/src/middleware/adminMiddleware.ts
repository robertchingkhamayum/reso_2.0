import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import {
  emailSchema,
  stringSchema,
  passwordSchema,
} from "./validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface CostomRequestSignup extends Request {
  email?: string;
  name?: string;
  password?: string;
}

//admin signup Middleware
export const adminSignupMiddleware = async (
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
  role?: "ADMIN";
}

//admin signin middleware
export const adminSigninMiddleware = async (
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
    if (!(user.role === "ADMIN")) {
      res.status(403).json({ message: "Forbidden: You're not an Admin" });
      return;
    }
    req.email = user.email;
    req.role = user.role;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

interface CostomRequestEvent extends Request {
  email?: string;
  role?: "ADMIN";
  event?: string;
  date?: string;
  description?: string;
}

interface RequestBody {
  eventLabel?: string;
  event?: string;
  date?: string;
  description?: string;
}

//admin event create middleware
export const adminEventMiddleware = async (
  req: CostomRequestEvent,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req;
    const { event, date, description } = req.body as RequestBody;

    if (role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden: You're not an ADMIN" });
      return;
    }

    const eventParse = stringSchema.safeParse(event);
    const dateParse = stringSchema.safeParse(date);
    const descriptionParse = stringSchema.safeParse(description);
    if (!(eventParse.success && dateParse.success && descriptionParse.success)) {
      res.status(400).json({ message: "Please enter correct input" });
      return;
    }
    const eventExist = await prisma.event.findUnique({
      where: { event: eventParse.data! },
    });

    if (eventExist) {
      res.status(409).json({ message: "Event already exist" });
      return;
    }
    req.event = eventParse.data;
    req.date = dateParse.data;
    req.description = descriptionParse.data;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
