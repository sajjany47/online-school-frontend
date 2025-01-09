import dbConnect from "@/lib/db";
import { GenerateEmployeeId } from "@/lib/utils";
import User from "@/modal/User.Model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const reqData = await req.json();
    const checkUser = await User.findOne({ username: reqData.username });
    if (checkUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    } else {
      let newUser: any = {
        uniqueId: GenerateEmployeeId(),
        name: reqData.name,
        username: reqData.username,
        email: reqData.email,
        password: await bcrypt.hash(reqData.password, 10),
        mobile: reqData.mobile,
        dob: new Date(reqData.dob),
        position: reqData.position,
        permanentAddress: {
          street: reqData.permanentAddress.street,
          city: Number(reqData.permanentAddress.city),
          state: Number(reqData.permanentAddress.state),
          zipCode: reqData.permanentAddress.zipCode,
          country: Number(reqData.permanentAddress.city),
        },
        addressSame: reqData.addressSame,
        residenceAddress: {
          street: reqData.residenceAddress.street,
          city: Number(reqData.residenceAddress.city),
          state: Number(reqData.residenceAddress.state),
          zipCode: reqData.residenceAddress.zipCode,
          country: Number(reqData.residenceAddress.city),
        },
        residenceType: reqData.residenceType,
        experience: {
          years: Number(reqData.experience.years ?? 0),
          details: reqData.experience.details ?? [],
        },
        certifications: reqData.certifications ?? [],
        employmentType: reqData.employmentType,
        documentProof: reqData.documentProof ?? [],
        accountDetails: {
          bankName: reqData.accountDetails.bankName,
          accountNumber: reqData.accountDetails.accountNumber,
          ifscCode: reqData.accountDetails.ifscCode,
          branchName: reqData.accountDetails.branchName,
          accountHolderName: reqData.accountDetails.accountHolderName,
          uan: reqData.accountDetails.uan,
        },
        joiningDate: new Date(reqData.joiningDate),
        profilePicture: reqData.profilePicture ?? null,
        status: reqData.status ?? "PENDING",
        isActive: reqData.isActive ?? true,
        createdBy: reqData.user ? reqData.user._id : null,
        updatedBy: reqData.user ? reqData.user._id : null,
      };
      if (reqData.position === "Student") {
        newUser.courses = [
          {
            _id: new mongoose.Types.ObjectId(),
            courseId: new mongoose.Types.ObjectId(reqData.courseId),
            startDate: new Date(reqData.startDate),
            endDate: new Date(reqData.endDate),
            fees: Number(reqData.fees),
            discount: Number(reqData.discount),
            isActive: reqData.isActive ?? true,
            createdBy: reqData.user ? reqData.user._id : null,
            updatedBy: reqData.user ? reqData.user._id : null,
          },
        ];
      }
      return NextResponse.json(
        { success: true, data: reqData },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
