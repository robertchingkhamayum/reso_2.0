import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  adminSigninMiddleware,
  adminEventMiddleware,
} from "../middleware/adminMiddleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { adminValidate } from "../middleware/validation";
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;
const router = Router();

interface CostomRequestSignin extends Request {
  email?: string;
  adminId?: number;
  eventId?: number;
}

//admin sign in route
router.post(
  "/signin",
  adminSigninMiddleware,
  (req: CostomRequestSignin, res: Response) => {
    const { email, adminId, eventId } = req;

    try {
      const details = {
        id: adminId,
        email: email,
        eventId: eventId,
        role: "ADMIN",
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({
        message: "User signin successfully",
        authorization: "Bearer " + token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
);

interface CustomRequestEvent extends Request {
  eventId?: number;
  updatedData?: Partial<Event>;
}

//admin event update route
router.put(
  "/event",
  adminValidate,
  adminEventMiddleware,
  async (req: CustomRequestEvent, res: Response) => {
    const { updatedData, eventId } = req;
    try {
      const eventDetails = await prisma.event.update({
        where: { id: eventId },
        data: { ...updatedData },
      });

      res
        .status(200)
        .json({ message: "Event updated successfully", eventDetails });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      return;
    }
  }
);

export default router;
