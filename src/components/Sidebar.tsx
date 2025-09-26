import { 
  Home,
  UserCheck,
  PieChart,
  IdCard,
  School,
  Users,
  UserCog,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SectionType } from "./AttendanceLayout";

interface SidebarProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

const menuItems = [
  {
    category: "MAIN",
    items: [
      { id: "dashboard" as SectionType, label: "Dashboard", icon: Home },
      { id: "mark-attendance" as SectionType, label: "Mark Attendance", icon: UserCheck },
    ]
  },
  {
    category: "REPORTS",
    items: [
      { id: "class-reports" as SectionType, label: "Class Reports", icon: PieChart },
      { id: "student-reports" as SectionType, label: "Student Reports", icon: IdCard },
    ]
  },
  {
    category: "ADMIN",
    items: [
      { id: "manage-classes" as SectionType, label: "Manage Classes", icon: School },
      { id: "manage-students" as SectionType, label: "Manage Students", icon: Users },
      { id: "manage-users" as SectionType, label: "Manage Users", icon: UserCog },
      { id: "system-settings" as SectionType, label: "System Settings", icon: Settings },
    ]
  }
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <nav className="w-64 bg-nav-background text-nav-foreground flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-center">Attendo</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((section) => (
          <div key={section.category} className="mb-6">
            <div className="px-6 mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                {section.category}
              </h3>
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "w-full flex items-center px-6 py-3 text-left transition-all duration-300",
                        "border-l-3 border-transparent hover:bg-nav-hover",
                        isActive && "bg-nav-active border-l-white font-bold"
                      )}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-white/10">
        <p className="text-center text-sm text-white/60">
          © 2025 Attendo Inc.
        </p>
      </div>
    </nav>
  );
};