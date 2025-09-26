import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";

const studentData = [
  {
    id: "1",
    name: "Alice Johnson",
    rollNumber: "001",
    class: "Grade 10A",
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    lateDays: 2,
    attendanceRate: 95
  },
  {
    id: "2", 
    name: "Bob Smith",
    rollNumber: "002",
    class: "Grade 10A",
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    lateDays: 1,
    attendanceRate: 85
  },
  {
    id: "3",
    name: "Carol Davis", 
    rollNumber: "003",
    class: "Grade 9C",
    totalDays: 20,
    presentDays: 20,
    absentDays: 0,
    lateDays: 0,
    attendanceRate: 100
  },
  {
    id: "4",
    name: "David Wilson",
    rollNumber: "004", 
    class: "Grade 8B",
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    lateDays: 3,
    attendanceRate: 80
  }
];

export const StudentReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  const filteredStudents = studentData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.includes(searchTerm);
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Student Reports</h1>
        <p className="text-muted-foreground">Individual student attendance records and analytics.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                <SelectItem value="Grade 9C">Grade 9C</SelectItem>
                <SelectItem value="Grade 8B">Grade 8B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-term">This Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Roll No.</th>
                <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold">Class</th>
                <th className="text-center py-3 px-4 font-semibold">Present</th>
                <th className="text-center py-3 px-4 font-semibold">Absent</th>
                <th className="text-center py-3 px-4 font-semibold">Late</th>
                <th className="text-center py-3 px-4 font-semibold">Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-accent/10 transition-colors">
                  <td className="py-4 px-4 font-medium">{student.rollNumber}</td>
                  <td className="py-4 px-4">{student.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{student.class}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-present/10 text-present">
                      {student.presentDays}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-absent/10 text-absent">
                      {student.absentDays}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-late/10 text-late">
                      {student.lateDays}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`font-bold ${
                        student.attendanceRate >= 90 ? 'text-present' :
                        student.attendanceRate >= 80 ? 'text-late' : 'text-absent'
                      }`}>
                        {student.attendanceRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No students found matching your criteria.
          </div>
        )}
      </Card>
    </div>
  );
};