import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type AttendanceStatus = "present" | "absent" | "late" | "excused";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status?: AttendanceStatus;
}

const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", rollNumber: "001" },
  { id: "2", name: "Bob Smith", rollNumber: "002" },
  { id: "3", name: "Carol Davis", rollNumber: "003" },
  { id: "4", name: "David Wilson", rollNumber: "004" },
  { id: "5", name: "Emma Brown", rollNumber: "005" },
];

const statusConfig = {
  present: { label: "P", color: "bg-present text-present-foreground" },
  absent: { label: "A", color: "bg-absent text-absent-foreground" },
  late: { label: "L", color: "bg-late text-late-foreground" },
  excused: { label: "E", color: "bg-excused text-excused-foreground" },
};

export const MarkAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status }
          : student
      )
    );
  };

  const saveAttendance = () => {
    // Here you would save to backend/Supabase
    console.log("Saving attendance:", students);
    alert("Attendance saved successfully!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Mark Attendance</h1>
        <p className="text-muted-foreground">Record student attendance for your classes.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade10a">Grade 10A - Physics</SelectItem>
                <SelectItem value="grade9c">Grade 9C - History</SelectItem>
                <SelectItem value="grade8b">Grade 8B - Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
            />
          </div>
        </div>

        {selectedClass && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
              <div className="text-sm font-medium">Status Legend:</div>
              {Object.entries(statusConfig).map(([status, config]) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={cn("w-8 h-8 rounded flex items-center justify-center text-sm font-bold", config.color)}>
                    {config.label}
                  </div>
                  <span className="text-sm capitalize">{status}</span>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Roll No.</th>
                    <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                    <th className="text-center py-3 px-4 font-semibold">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-accent/10">
                      <td className="py-4 px-4 font-medium">{student.rollNumber}</td>
                      <td className="py-4 px-4">{student.name}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center gap-1">
                          {Object.entries(statusConfig).map(([status, config]) => (
                            <button
                              key={status}
                              onClick={() => updateAttendance(student.id, status as AttendanceStatus)}
                              className={cn(
                                "w-10 h-10 rounded text-sm font-bold border-2 transition-all",
                                student.status === status 
                                  ? config.color + " border-transparent"
                                  : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                              )}
                            >
                              {config.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={saveAttendance} size="lg">
                Save Attendance
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};