import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: String,
    name: String,
    username: String,
    mobile: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    dob: Date,
    state: {
      type: Number,
      default: null,
    },
    country: {
      type: Number,
      default: null,
    },
    city: {
      type: Number,
      default: null,
    },
    assignedLoansCount: { type: Number, default: 0 },
    password: String,
    sessionId: String,
    isPasswordReset: Boolean,
    userImage: Object,
    permanentHouseOrBuildingNumber: String,
    permanentStreet: String,
    permanentLandmark: String,
    permanentPincode: String,
    permanentState: Number,
    permanentCountry: Number,
    permanentCity: Number,
    residenceHouseOrBuildingNumber: String,
    residenceStreet: String,
    residenceLandmark: String,
    residencePincode: String,
    residenceState: Number,
    residenceCountry: Number,
    residenceCity: Number,
    residenceType: {
      type: String,
      enum: ["OWNED", "RENTED", "OTHER"],
    },
    addressSame: Boolean,
    education: [
      {
        boardName: { type: String },
        passingYear: { type: String, trim: true },
        marksPercentage: { type: String, trim: true },
        resultImage: Object,
      },
    ],
    fresherOrExperience: {
      type: String,
      enum: ["EXPERIENCE", "FRESHER"],
    },
    workDetail: [
      {
        companyName: { type: String },
        position: { type: String },
        startingYear: { type: String, trim: true },
        endingYear: { type: String, trim: true },
        experienceLetter: Object,
        relievingLetter: Object,
        appointmentLetter: Object,
        salarySlip: Object,
      },
    ],
    aadharNumber: { type: String, trim: true },

    passportImage: Object /*{ url: String, publicId: String }*/,
    voterImage: Object,
    panImage: Object,
    aadharImage: Object,
    passbookImage: Object,
    uanImage: Object,
    voterNumber: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    passportNumber: { type: String, trim: true },
    bankName: { type: String, lowercase: true },
    accountNumber: { type: String, trim: true },
    bankBranchName: String,
    uan: String,
    ifsc: { type: String, trim: true },
    isProfileVerified: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
    },
    profileRatio: String,
    approvedBy: String,
    isActive: Boolean,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
    pageIndex: Number,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employee", employeeSchema);

export default Employee;
