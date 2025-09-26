import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./Dashboard";
import { MarkAttendance } from "./MarkAttendance";
import { ClassReports } from "./ClassReports";
import { StudentReports } from "./StudentReports";
import { ManageClasses } from "./ManageClasses";
import { ManageStudents } from "./ManageStudents";

export type SectionType = 
  | "dashboard" 
  | "mark-attendance" 
  | "class-reports" 
  | "student-reports" 
  | "manage-classes" 
  | "manage-students"
  | "manage-users"
  | "system-settings";

export const AttendanceLayout = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "mark-attendance":
        return <MarkAttendance />;
      case "class-reports":
        return <ClassReports />;
      case "student-reports":
        return <StudentReports />;
      case "manage-classes":
        return <ManageClasses />;
      case "manage-students":
        return <ManageStudents />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="animate-in fade-in-50 duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};