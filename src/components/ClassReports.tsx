import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const classData = [
  {
    class: "Grade 10A",
    subject: "Physics",
    totalStudents: 28,
    averageAttendance: 94,
    presentToday: 26,
    absentToday: 2
  },
  {
    class: "Grade 9C",
    subject: "History", 
    totalStudents: 30,
    averageAttendance: 89,
    presentToday: 27,
    absentToday: 3
  },
  {
    class: "Grade 8B",
    subject: "Mathematics",
    totalStudents: 25,
    averageAttendance: 85,
    presentToday: 21,
    absentToday: 4
  }
];

export const ClassReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this-week");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Class Reports</h1>
        <p className="text-muted-foreground">View attendance statistics and trends for all classes.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Attendance Overview</h2>
          <div className="w-full md:w-48">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-term">This Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {classData.map((classInfo, index) => (
            <Card key={index} className="p-6 border border-border hover:shadow-md transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary">{classInfo.class}</h3>
                <p className="text-sm text-muted-foreground">{classInfo.subject}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Students</span>
                  <span className="font-bold">{classInfo.totalStudents}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Attendance</span>
                  <span className={`font-bold ${
                    classInfo.averageAttendance >= 90 ? 'text-present' :
                    classInfo.averageAttendance >= 80 ? 'text-late' : 'text-absent'
                  }`}>
                    {classInfo.averageAttendance}%
                  </span>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Today's Status</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-present rounded-full"></div>
                      <span className="text-sm">Present: {classInfo.presentToday}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-absent rounded-full"></div>
                      <span className="text-sm">Absent: {classInfo.absentToday}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-present h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(classInfo.presentToday / classInfo.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};