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
      enum: ["Teacher", "Student", "Employee", "Finance", "Admin"],
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
      enum: ["OWNED", "RENTED", "OTHER"],
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
      enum: ["Full-time", "Part-time", "Contract"],
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
      lowercase: true,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
    isActive: Boolean,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
    joiningDate: Date,
    salary: {
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
    },
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
    subjects: [String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
