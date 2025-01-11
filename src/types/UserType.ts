import mongoose from "mongoose";

export interface NewUser {
  uniqueId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  mobile: string;
  dob: Date;
  position: string;
  permanentAddress: {
    street: string;
    city: number;
    state: number;
    zipCode: string;
    country: number;
  };
  addressSame: boolean;
  residenceAddress: {
    street: string;
    city: number;
    state: number;
    zipCode: string;
    country: number;
  };
  residenceType: string;
  documentProof: string[];
  accountDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    accountHolderName: string;
    uan: string | null;
  };
  joiningDate: Date;
  profilePicture: string | null;
  status: string;
  isActive: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  experience?: {
    years: number;
    details: string[];
  };
  certifications?: string[];
  employmentType?: string;
  salary?: {
    basicSalary: number;
    houseRentAllowance: number;
    medicalAllowance: number;
    transportAllowance: number;
    specialAllowance: number;
    otherAllowances: number;
    providentFund: number;
    incomeTax: number;
    professionalTax: number;
    otherDeductions: number;
    grossSalary: number;
    netSalary: number;
    createdBy: string | null;
    updatedBy: string | null;
    isActive: boolean;
  }[];
  courses?: {
    _id: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    fees: number;
    discount: number;
    isActive: boolean;
    createdBy: string | null;
    updatedBy: string | null;
  }[];
  enrollmentDate?: Date;
  parentDetails?: {
    fatherName: string;
    motherName: string;
    guardianPhoneNumber: string;
    address: {
      street: string;
      city: number;
      state: number;
      zipCode: string;
      country: number;
    };
  };
  subjects?: mongoose.Types.ObjectId[];
  depositAmount?: number;
}
