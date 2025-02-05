import {
  Home,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Briefcase,
  Settings,
  DollarSign,
  UserCheck,
  Clipboard,
  Globe,
  ShieldCheck,
  Info,
} from "lucide-react";

export const SideMenuData = {
  Teacher: [
    {
      title: "Dashboard",
      icon: Home,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Classes",
      icon: BookOpen,
      items: [
        { title: "Class 1", url: "/classes/class-1" },
        { title: "Class 2", url: "/classes/class-2" },
        { title: "Class 3", url: "/classes/class-3" },
      ],
    },
    {
      title: "Schedule",
      icon: Calendar,
      items: [{ title: "Schedule", url: "/schedule" }],
    },
    {
      title: "Students",
      icon: Users,
      items: [
        { title: "Student Records", url: "/students/records" },
        { title: "Attendance", url: "/students/attendance" },
      ],
    },
    {
      title: "Assignments",
      icon: FileText,
      items: [{ title: "Assignments", url: "/assignments" }],
    },
    {
      title: "Exams & Results",
      icon: Briefcase,
      items: [
        { title: "Create Exam", url: "/exams/create" },
        { title: "Results", url: "/exams/results" },
      ],
    },
    {
      title: "Info",
      icon: Info,
      items: [{ title: "Personal Details", url: "/personal-info" }],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [{ title: "Settings", url: "/settings" }],
    },
  ],
  Student: [
    {
      title: "Dashboard",
      icon: Home,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Classes",
      icon: BookOpen,
      items: [{ title: "My Classes", url: "/classes" }],
    },
    {
      title: "Assignments",
      icon: FileText,
      items: [{ title: "My Assignments", url: "/assignments" }],
    },
    {
      title: "Exams & Results",
      icon: Briefcase,
      items: [{ title: "Results", url: "/results" }],
    },
    {
      title: "Info",
      icon: Info,
      items: [{ title: "Personal Details", url: "/personal-info" }],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [{ title: "Settings", url: "/settings" }],
    },
  ],
  Finance: [
    {
      title: "Dashboard",
      icon: Home,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Fees",
      icon: DollarSign,
      items: [
        { title: "Fee Structure", url: "/finance/fees/structure" },
        { title: "Payment Records", url: "/finance/fees/records" },
      ],
    },
    {
      title: "Salaries",
      icon: Clipboard,
      items: [
        { title: "Salary Records", url: "/finance/salaries/records" },
        { title: "Generate Payslips", url: "/finance/salaries/payslips" },
      ],
    },
    {
      title: "Reports",
      icon: Briefcase,
      items: [{ title: "Finance Reports", url: "/finance/reports" }],
    },
    {
      title: "Info",
      icon: Info,
      items: [{ title: "Personal Details", url: "/personal-info" }],
    },
  ],
  Employee: [
    {
      title: "Dashboard",
      icon: Home,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Attendance",
      icon: UserCheck,
      items: [{ title: "My Attendance", url: "/attendance" }],
    },
    {
      title: "Tasks",
      icon: Clipboard,
      items: [{ title: "My Tasks", url: "/tasks" }],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [{ title: "Settings", url: "/settings" }],
    },
    {
      title: "Info",
      icon: Info,
      items: [{ title: "Personal Details", url: "/personal-info" }],
    },
  ],
  Admin: [
    {
      title: "Dashboard",
      icon: Home,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Manage Users",
      icon: Users,
      items: [
        { title: "Teachers", url: "/admin/teachers" },
        { title: "Students", url: "/admin/students" },
        { title: "Employees", url: "/admin/employees" },
      ],
    },
    {
      title: "Global Settings",
      icon: Globe,
      items: [{ title: "School Settings", url: "/settings/global" }],
    },
    {
      title: "Security",
      icon: ShieldCheck,
      items: [{ title: "Roles & Permissions", url: "/settings/security" }],
    },
    {
      title: "Info",
      icon: Info,
      items: [{ title: "Personal Details", url: "/personal-info" }],
    },
  ],
};
