import dbConnect from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { GenerateAccessToken, GenerateRefreshToken } from "@/shared/Constant";
import mongoose from "mongoose";
import { NewUser } from "@/types/UserType";
import User from "@/modal/Users.Model";

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

    if (!checkUser.isActive) {
      return NextResponse.json(
        {
          success: false,
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

    if (!verifyPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Password",
        },
        {
          status: 401,
        }
      );
    }

    const sessionID = nanoid();
    const data = {
      _id: checkUser._id.toString(),
      username: checkUser.username,
      name: checkUser.name,
      position: checkUser.position,
      sessionId: sessionID,
      userImage: checkUser.userImage ?? null,
    };
    const accessToken =await GenerateAccessToken(data);
    const refreshToken =await GenerateRefreshToken(data);

    console.log("acccessToken===>", accessToken);
    console.log("refreshToken===>", refreshToken);

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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
