import dbConnect from "@/lib/db";
import User from "@/modal/User.Model";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { GenerateAccessToken, GenerateRefreshToken } from "@/shared/Constant";
import mongoose from "mongoose";
import { NewUser } from "@/types/UserType";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const reqData = await req.json();
    const checkUser: NewUser | null = await User.findOne({
      username: reqData.username,
    });
    if (!checkUser) {
      return NextResponse.json(
        { success: false, error: "User not found!" },
        { status: 404 }
      );
    }
    if (checkUser) {
      if (!checkUser.isActive) {
        return NextResponse.json(
          {
            sucess: false,
            error: "User locked, Contact with admin",
          },
          {
            status: 423,
          }
        );
      }
      const verifyPassword = await bcrypt.compare(
        reqData.password,
        checkUser.password
      );
      if (verifyPassword) {
        const sessionID = nanoid();
        const data = {
          _id: checkUser._id.toString(),
          username: checkUser.username,
          name: checkUser.name,
          position: checkUser.position,
          sessionId: sessionID,
          userImage: checkUser.userImage ?? null,
        };
        const accessToken = GenerateAccessToken(data);
        const refreshToken = GenerateRefreshToken(data);
        await User.updateOne(
          { _id: new mongoose.Types.ObjectId(checkUser._id) },
          { $set: { sessionId: sessionID } }
        );
        return NextResponse.json(
          {
            success: true,
            data: {
              data: data,
              token: {
                accessToken: accessToken,
                refreshToken: refreshToken,
              },
            },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            sucess: false,
            error: "Invalid Password",
          },
          {
            status: 401,
          }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
