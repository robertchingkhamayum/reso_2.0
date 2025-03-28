import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import {
  emailSchema,
  stringSchema,
  passwordSchema,
  booleanSchema,
  genderSchema,
  playersSchema,
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
    if (!(user.role === "USER")) {
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

interface Player {
  name: string;
  gender: "male" | "female" | "other";
  gameId: string;
  teamLeader: boolean;
}

interface CostomRequest extends Request {
  email?: string;
  role?: "USER";
  event?: string;
  gender?: string;
  name?: string;
  contact?: string;
  address?: string;
  individual?: boolean;
  teamName?: string;
  players?: Player[];
  bankingName?: string;
  transactionId?: string;
  paymentProof?: File;
}

interface RequestBodyIndividual {
  event?: string;
  gender?: string;
  name?: string;
  contact?: string;
  address?: string;
  bankingName?: string;
  transactionId?: string;
  paymentProof?: File;
  individual?: boolean;
}

interface RequestBodyTeam extends RequestBodyIndividual {
  teamName?: string;
  players?: Player[];
}

//user register Middleware
export const userRegisterMiddleware = async (
  req: CostomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role } = req;
    if (role !== "USER") {
      res.status(403).json({ message: "Forbidden: You're not an USER" });
      return;
    }
    const {
      event,
      name,
      gender,
      contact,
      address,
      individual,
      transactionId,
      bankingName,
      paymentProof,
    } = req.body as RequestBodyIndividual;

    //input validation through zod
    const individualParsed = booleanSchema.safeParse(individual);
    const eventParsed = stringSchema.safeParse(event);
    const nameParsed = stringSchema.safeParse(name);
    const contactParsed = stringSchema.safeParse(contact);
    const addressParsed = stringSchema.safeParse(address);
    const genderParsed = genderSchema.safeParse(gender);
    const transactionIdParsed = stringSchema.safeParse(transactionId);
    const bankingNameParsed = stringSchema.safeParse(bankingName);
    if (
      !(
        eventParsed.success &&
        individualParsed.success &&
        nameParsed.success &&
        contactParsed.success &&
        addressParsed.success &&
        genderParsed.success &&
        transactionIdParsed.success &&
        bankingNameParsed.success
      )
    ) {
      res.status(400).json({ message: "Please enter correct input" });
      return;
    }
    //event exist check
    const eventExist = await prisma.event.findUnique({
      where: { event: eventParsed.data! },
    });
    if (!eventExist) {
      res.status(409).json({ message: "Event doesn't exist" });
      return;
    }
    //putting data to request
    req.event = eventParsed.data;
    req.name = nameParsed.data;
    req.gender = genderParsed.data;
    req.contact = contactParsed.data;
    req.address = addressParsed.data;
    req.transactionId = transactionIdParsed.data;
    req.bankingName = bankingNameParsed.data;

    //check type of registration
    if (!individual) {
      let { teamName, players } = req.body as RequestBodyTeam;
      if (typeof players === "string") {
        try {
          players = JSON.parse(players); // Convert JSON string to object
        } catch (error) {
          res.status(400).json({ message: "Invalid players format" });
          return;
        }
      }
      // Validate team name & players
      const teamNameParsed = stringSchema.safeParse(teamName);
      const playersParsed = playersSchema.safeParse(players);

      if (!(teamNameParsed.success && playersParsed.success)) {
        res.status(400).json({ message: "Please enter correct input" });
        return;
      }

      req.teamName = teamNameParsed.data;
      req.players = playersParsed.data;
      // next();
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
