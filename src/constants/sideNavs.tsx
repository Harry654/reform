import React from "react";
import {
  Home,
  FileText,
  Users,
  BarChart,
  CreditCard,
  Bell,
  HelpCircle,
  Folder,
  Mail,
  Share,
} from "lucide-react";

const sideNavs = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "dashboard",
    route: "/dashboard",
    active: true,
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "new survey",
    route: "/create",
    active: true,
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "templates",
    route: "/templates",
    active: true,
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    label: "billing",
    route: "/billing",
    active: true,
  },
  {
    icon: <Folder className="h-5 w-5" />,
    label: "my surveys",
    route: "/my-surveys",
    active: false,
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "audience",
    route: "/audience",
    active: false,
  },
  {
    icon: <BarChart className="h-5 w-5" />,
    label: "analytics",
    route: "/analytics",
    active: false,
  },

  {
    icon: <Bell className="h-5 w-5" />,
    label: "notifications",
    route: "/notifications",
    active: false,
  },
  {
    icon: <HelpCircle className="h-5 w-5" />,
    label: "help & support",
    route: "/help-support",
    active: false,
  },

  {
    icon: <Mail className="h-5 w-5" />,
    label: "inbox",
    route: "/inbox",
    active: false,
  },
  {
    icon: <Share className="h-5 w-5" />,
    label: "integrations",
    route: "/integrations",
    active: false,
  },
];

export default sideNavs;
