import Config from "@/shared/Config";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uniqueId: String,
    name: String,
    username: String,
    email: { type: String, trim: true, lowercase: true },
    password: String,
    mobile: { type: String, trim: true },
    dob: Date,
    position: {
      type: String,
      enum: [
        Config.Position.Teacher,
        Config.Position.Student,
        Config.Position.Employee,
        Config.Position.Finance,
        Config.Position.Admin,
      ],
      required: true,
    },
    permanentAddress: {
      street: String,
      city: Number,
      state: Number,
      zipCode: String,
      country: Number,
    },
    addressSame: Boolean,
    residenceAddress: {
      street: String,
      city: Number,
      state: Number,
      zipCode: String,
      country: Number,
    },
    residenceType: {
      type: String,
      enum: [
        Config.ResidenceType.Owned,
        Config.ResidenceType.Rented,
        Config.ResidenceType.Other,
      ],
    },

    experience: {
      years: Number,
      details: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          organizationName: { type: String },
          position: { type: String },
          startingYear: { type: String, trim: true },
          endingYear: { type: String, trim: true },
          experienceLetter: {
            type: String || null,
            default: null,
          },
          relievingLetter: {
            type: String || null,
            default: null,
          },
          appointmentLetter: {
            type: String || null,
            default: null,
          },
          salarySlip: {
            type: String || null,
            default: null,
          },
        },
      ],
    },
    certifications: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        boardName: { type: String },
        passingYear: { type: String, trim: true },
        marksPercentage: { type: String, trim: true },
        certificate: {
          type: String || null,
          default: null,
        },
      },
    ],
    employmentType: {
      type: String,
      enum: [
        Config.EmploymentType.FullTime,
        Config.EmploymentType.PartTime,
        Config.EmploymentType.Contract,
      ],
    },

    documentProof: [
      {
        documentName: String,
        documnetNumber: String,
        documentId: mongoose.Schema.Types.ObjectId,
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
    accountDetails: {
      bankName: String,
      accountNumber: String,
      ifscCode: String,
      branchName: String,
      accountHolderName: String,
      uan: String,
    },
    profilePicture: String,
    status: {
      type: String,
      trim: true,
      enum: [
        Config.Status.PENDING,
        Config.Status.VERIFIED,
        Config.Status.REJECTED,
      ],
      default: Config.Status.PENDING,
    },
    isActive: Boolean,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
    joiningDate: Date,
    depositAmount: Number,
    salary: [
      {
        basicSalary: Number,
        houseRentAllowance: Number,
        medicalAllowance: Number,
        transportAllowance: Number,
        specialAllowance: Number,
        otherAllowances: Number,
        providentFund: Number,
        incomeTax: Number,
        professionalTax: Number,
        otherDeductions: Number,
        grossSalary: Number,
        netSalary: Number,
        createdBy: mongoose.Schema.Types.ObjectId,
        updatedBy: mongoose.Schema.Types.ObjectId,
        isActive: Boolean,
      },
    ],
    courses: [
      {
        courseId: mongoose.Schema.Types.ObjectId,
        startDate: Date,
        endDate: Date,
        fees: Number,
        discount: Number,
        isActive: Boolean,
        createdBy: mongoose.Schema.Types.ObjectId,
        updatedBy: mongoose.Schema.Types.ObjectId,
      },
    ],
    enrollmentDate: Date,
    parentDetails: {
      fatherName: String,
      motherName: String,
      guardianPhoneNumber: String,
      address: {
        street: String,
        city: Number,
        state: Number,
        zipCode: String,
        country: Number,
      },
    },
    subjects: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
