import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: String,
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
    subjects: [String],
    experience: {
      years: Number,
      details: [
        {
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
    documents: {
      name: String,
      number: String,
      documentName: {
        type: String,
        enum: [
          "Passport",
          "Aadhar Card",
          "Driving Licence",
          "National Card",
          "Voter Card",
        ],
      },
    },
    accountDetails: {
      bankName: String,
      accountNumber: String,
      ifscCode: String,
      branchName: String,
      accountHolderName: String,
      uan: String,
    },
    enrollmentDate: Date,
    joiningDate: Date,
    salary: Number,
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
