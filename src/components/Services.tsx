import {
  CircleDollarSign,
  DatabaseIcon,
  SearchCheckIcon,
  UserCogIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const services = [
  {
    label: "Payroll",
    icon: <CircleDollarSign />,
  },
  {
    label: "Employee Database",
    icon: <DatabaseIcon />,
  },
  {
    label: "Hiring",
    icon: <SearchCheckIcon />,
  },
  {
    label: "Onboarding",
    icon: <UserCogIcon />,
  },
];

export default function Services() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <Card key={service.label}>
          <CardHeader>{service.icon}</CardHeader>
          <CardContent>
            <h4>{service.label}</h4>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
