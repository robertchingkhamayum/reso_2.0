import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface CostomRequest extends Request {
  email?: string;
  role?: "USER" | "ADMIN";
}

export const validate = (
  req: CostomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Not Log In", status: false });
    return;
  }
  const token = authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET) as {
      email: string;
      role: "USER" | "ADMIN";
    };
    if (verified) {
      req.email = verified.email;
      req.role = verified.role;
      next();
    }
  } catch {
    res.status(403).json({ message: "Forbidden", notlogin: true });
  }
};

// Input Validation
import z from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Invalid email address" });
export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be 6 or more characters long" })
  .max(30, { message: "Must be 30 or fewer characters long" });
export const stringSchema = z.string();
export const contactSchema = z.string().min(10).max(10);
export const genderSchema = z.enum(["male", "female", "other"]);
export const booleanSchema =z.boolean()
const playerSchema = z.object({
  name: z.string(),
  gender: z.enum(["male", "female", "other"]),
  gameId:z.string(),
  teamLeader: z.boolean()
});

export const playersSchema = z.array(playerSchema);

