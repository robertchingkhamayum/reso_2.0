import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  userSignupMiddleware,
  userSigninMiddleware,
  userRegisterMiddleware,
} from "../middleware/usersMiddleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userValidate, validate } from "../middleware/validation";
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
        role: "USER",
        uid: user.id,
      };
      const userData = {
        email: user.email,
        name: user.name,
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({
        message: "User registered successfully",
        authorization: "Bearer " + token,
        userData,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
);

interface CostomRequestSignin extends Request {
  email?: string;
  name?: string;
  userId?: number;
}

//user sign in route
router.post(
  "/signin",
  userSigninMiddleware,
  (req: CostomRequestSignin, res: Response) => {
    const { email, name, userId } = req;

    try {
      const details = {
        email: email!,
        role: "USER",
        uid: userId,
      };
      const userData = {
        email: email,
        name: name,
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({
        message: "User signin successfully",
        authorization: "Bearer " + token,
        userData,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
);

interface Player {
  name: string;
  gender: "male" | "female" | "other";
  gameId: string;
  teamLeader: boolean;
}

interface CostomRequest extends Request {
  email?: string;
  event?: string;
  eventId?: number;
  userId?: number;
  gender?: "male" | "female" | "other"| null;
  name?: string;
  contact?: string;
  address?: string;
  individual?: boolean;
  teamName?: string;
  players?: Player[];
  bankingName?: string;
  transactionId?: string;
  paymentProof?: string;
}

//user event registration
router.post(
  "/register",
  userValidate,
  userRegisterMiddleware,
  async (req: CostomRequest, res: Response) => {
    try {
      const {
        email,
        userId,
        eventId,
        gender,
        name,
        contact,
        address,
        individual,
        bankingName,
        transactionId,
        paymentProof,
      } = req;

      // If individual registration
      if (individual) {
        const registrationDetails = await prisma.registration.create({
          data: {
            gender: individual ? gender! : null,
            name: name!,
            contact: contact!,
            address: address!,
            individual: true,
            bankingName: bankingName!,
            transactionId: transactionId!,
            paymentUrl: paymentProof!,
            userId: userId!,
            eventId: eventId!,
          },
        });

        res.status(201).json({
          message: "Individual registration successful",
          registrationDetails,
        });
        return;
      }

      // If team registration
      const { teamName, players } = req;
      if (!teamName || !players || players.length === 0) {
        res.status(400).json({ message: "Team name and players are required" });
        return;
      }

      await prisma.$transaction(async (prisma) => {
        const registration = await prisma.registration.create({
          data: {
            gender: individual ? gender! : null,
            name: name!,
            contact: contact!,
            address: address!,
            individual: false,
            bankingName: bankingName!,
            transactionId: transactionId!,
            paymentUrl: paymentProof!,
            userId: userId!,
            eventId: eventId!,
          },
        });

        const team = await prisma.team.create({
          data: {
            teamName: teamName!,
            players: JSON.stringify(players),
            registrationId: registration.id,
          },
        });

        const eventUser = await prisma.eventUser.create({
          data:{
            eventId: eventId!,
            registrationId: registration.id,
            email: email!
          }
        })
        return [registration, team, eventUser];
      });
      res.status(201).json({
        message: "Team registration successful",
      });
      return;
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal Server Error", error });
      return;
    }
  }
);

interface CustomRequestRegister extends Request {
  email?: string;
}
router.get(
  "/registered",
  userValidate,
  async (req: CustomRequestRegister, res: Response) => {
    const { email } = req;
    try {
      const registeredDetails = await prisma.eventUser.findUnique({
        where: { email: email },
        include:{
          event:true,
          registration:true
        }
      });

      res
        .status(200)
        .json({ message: "Get details  successfully", registeredDetails });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      return;
    }
  }
);

export default router;
