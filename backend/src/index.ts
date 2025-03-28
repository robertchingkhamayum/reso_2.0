import express from "express";
import cors from "cors";
import users from "./routes/users";
import admin from "./routes/admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = Number(process.env.PORT)||3000;
const JWT_SECRET= process.env.JWT_SECRET as string
app.use(express.json());
app.use(cors());
app.get("/islogIn",(req,res)=>{
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
        res.status(200).json({ auth: verified, message: "It's authenticated" });
      }
    } catch {
      res.status(403).json({ message: "Forbidden", notlogin:true });
    }
})
app.use("/users", users);
app.use("/admin", admin);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
