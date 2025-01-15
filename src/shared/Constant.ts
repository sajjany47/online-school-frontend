import jwt from "jsonwebtoken";
import ApiError from "./ApiError";
import User from "@/modal/User.Model";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";

export const SecretKey =
  process.env.SECRET_KEY || "agfnsdfhgsjdfbvjdjhxncbdsfcjdstdsh763543nfgeurt";

export interface TokenData {
  _id: string;
  username: string;
  name: string;
  position: string;
  sessionId: string;
}

export const GenerateAccessToken = (data: TokenData) => {
  const a = {
    _id: data._id,
    username: data.username,
    name: data.name,
    position: data.position,
    sessionId: data.sessionId,
  };
  const accessToken = jwt.sign(a, SecretKey, {
    expiresIn: "1h",
    // expiresIn: "10s",
  });

  return accessToken;
};

export const GenerateRefreshToken = (data: TokenData) => {
  const a = {
    _id: data._id,
    username: data.username,
    position: data.position,
    name: data.name,
    sessionId: data.sessionId,
  };
  const refreshToken = jwt.sign(a, SecretKey, {
    expiresIn: "6h",
    // expiresIn: "15s",
  });

  return refreshToken;
};

export const VerifyToken = async (token: string) => {
  await dbConnect();
  try {
    jwt.verify(token, SecretKey, async (err, decoded) => {
      const decodedToken = decoded as TokenData;
      if (err) {
        throw new ApiError("Access Denied. No token provided.", 401);
      }

      try {
        const verifySession = await User.findOne({
          _id: new mongoose.Types.ObjectId(decodedToken._id),
        });

        if (!verifySession) {
          throw new ApiError("Invalid session. Please login first.", 401);
        }

        if (verifySession.sessionId !== decodedToken.sessionId) {
          throw new ApiError(
            "Access Denied due to new login from another device.",
            401
          );
        }
        return decodedToken;
      } catch {
        throw new ApiError("Failed to generate tokens.", 401);
      }
    });
  } catch {
    throw new Error("Invalid or expired token");
  }
};
