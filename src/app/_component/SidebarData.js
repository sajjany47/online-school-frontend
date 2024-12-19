import {
  Home,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Briefcase,
  Settings,
  Bot,
} from "lucide-react";

export const SideMenuData = {
  teacher: [
    {
      title: "Dashboard",
      icon: Home,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
    {
      title: "Classes",
      icon: BookOpen,
      items: [
        {
          title: "Class 1",
          url: "/classes/class-1",
        },
        {
          title: "Class 2",
          url: "/classes/class-2",
        },
        {
          title: "Class 3",
          url: "/classes/class-3",
        },
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
        {
          title: "Student Records",
          url: "/students/records",
        },
        {
          title: "Attendance",
          url: "/students/attendance",
        },
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
        {
          title: "Create Exam",
          url: "/exams/create",
        },
        {
          title: "Results",
          url: "/exams/results",
        },
      ],
    },
    {
      title: "AI Tools",
      icon: Bot,
      items: [
        {
          title: "AI Assistant",
          url: "/ai/assistant",
        },
        {
          title: "AI Grading",
          url: "/ai/grading",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [{ title: "Settings", url: "/settings" }],
    },
  ],
};
