import dbConnect from "@/lib/db";
import { GenerateEmployeeId } from "@/lib/utils";
import User from "@/modal/Users.Model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NewUser } from "@/types/UserType";
import Config from "@/shared/Config";

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
      const newUser: NewUser = {
        _id: new mongoose.Types.ObjectId(),
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
        documentProof: reqData.documentProof ?? [],
        accountDetails: {
          bankName: reqData.accountDetails.bankName,
          accountNumber: reqData.accountDetails.accountNumber,
          ifscCode: reqData.accountDetails.ifscCode,
          branchName: reqData.accountDetails.branchName,
          accountHolderName: reqData.accountDetails.accountHolderName,
          uan: reqData.accountDetails.uan ?? null,
        },
        joiningDate: new Date(reqData.joiningDate),
        profilePicture: reqData.profilePicture ?? null,
        status: reqData.status ?? Config.Status.PENDING,
        isActive: reqData.isActive ?? true,
        createdBy: reqData.user ? reqData.user._id : null,
        updatedBy: reqData.user ? reqData.user._id : null,
      };
      if (
        reqData.position === Config.Position.Teacher ||
        reqData.position === Config.Position.Employee ||
        reqData.position === Config.Position.Finance ||
        reqData.position === Config.Position.Admin
      ) {
        newUser.experience = {
          years: Number(reqData.experience.years ?? 0),
          details: reqData.experience.details ?? [],
        };
        newUser.certifications = reqData.certifications ?? [];
        newUser.employmentType = reqData.employmentType;
        newUser.salary = [
          {
            basicSalary: Number(reqData.salary.basicSalary),
            houseRentAllowance: Number(reqData.salary.houseRentAllowance),
            medicalAllowance: Number(reqData.salary.medicalAllowance),
            transportAllowance: Number(reqData.salary.transportAllowance),
            specialAllowance: Number(reqData.salary.specialAllowance),
            otherAllowances: Number(reqData.salary.otherAllowances),
            providentFund: Number(reqData.salary.providentFund),
            incomeTax: Number(reqData.salary.incomeTax),
            professionalTax: Number(reqData.salary.professionalTax),
            otherDeductions: Number(reqData.salary.otherDeductions),
            grossSalary: Number(reqData.salary.grossSalary),
            netSalary: Number(reqData.salary.netSalary),
            createdBy: reqData.user ? reqData.user._id : null,
            updatedBy: reqData.user ? reqData.user._id : null,
            isActive: true,
          },
        ];
      }
      if (reqData.position === Config.Position.Student) {
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
        newUser.enrollmentDate = new Date(reqData.enrollmentDate);
        newUser.parentDetails = {
          fatherName: reqData.parentDetails.fatherName,
          motherName: reqData.parentDetails.motherName,
          guardianPhoneNumber: reqData.parentDetails.guardianPhoneNumber,
          address: {
            street: reqData.parentDetails.address.street,
            city: Number(reqData.parentDetails.address.city),
            state: Number(reqData.parentDetails.address.state),
            zipCode: reqData.parentDetails.address.zipCode,
            country: Number(reqData.parentDetails.address.country),
          },
        };
        newUser.subjects = reqData.subjects.map(
          (item: string) => new mongoose.Types.ObjectId(item)
        );
        newUser.depositAmount = Number(reqData.depositAmount);
      }

      const prepareData = new User(newUser);

      await prepareData.save();

      return NextResponse.json(
        { success: true, data: prepareData },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
