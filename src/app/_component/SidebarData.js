import {
  Home,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Briefcase,
  Settings,
} from "lucide-react";

export const SideMenuData = {
  teacher: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home />,
    },
    {
      title: "Classes",
      url: "/classes",
      icon: <BookOpen />,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: <Calendar />,
    },
    {
      title: "Students",
      url: "/students",
      icon: <Users />,
    },
    {
      title: "Assignments",
      url: "/assignments",
      icon: <FileText />,
    },
    {
      title: "Exams",
      url: "/exams",
      icon: <Briefcase />,
    },
    {
      title: "Results",
      url: "/results",
      icon: <Briefcase />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings />,
    },
  ],
};
