import jwt from "jsonwebtoken";
import ApiError from "./ApiError";
import User from "@/modal/Users.Model";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import { SignJWT } from "jose";

export const SecretKey =
  process.env.SECRET_KEY || "agfnsdfhgsjdfbvjdjhxncbdsfcjdstdsh763543nfgeurt";

export interface TokenData {
  _id: string;
  username: string;
  name: string;
  position: string;
  sessionId: string;
}

export const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
export const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

export const getAccessToken = () => {
  return sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

const secret = new TextEncoder().encode(SecretKey);

export const GenerateAccessToken = async (data: TokenData) => {
  return await new SignJWT({
    _id: data._id,
    username: data.username,
    name: data.name,
    position: data.position,
    sessionId: data.sessionId,
  })
    .setProtectedHeader({ alg: "HS256" }) // Algorithm for HMAC
    .setExpirationTime("1h") // Expiration time
    .sign(secret);
};

// 🔹 Generate Refresh Token (6 Hours Expiry)
export const GenerateRefreshToken = async (data: TokenData) => {
  return await new SignJWT({
    _id: data._id,
    username: data.username,
    position: data.position,
    name: data.name,
    sessionId: data.sessionId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("6h")
    .sign(secret);
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

export const headerWithToken = () => {
  const token = getAccessToken();

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
export const headerWithOutToken = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};
export const headerWithFormData = () => {
  const token = getAccessToken();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
};
