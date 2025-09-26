import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Search, UserPlus } from "lucide-react";
import { useState } from "react";

const studentData = [
  {
    id: "1",
    name: "Alice Johnson",
    rollNumber: "001",
    class: "Grade 10A",
    email: "alice.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    status: "active"
  },
  {
    id: "2",
    name: "Bob Smith", 
    rollNumber: "002",
    class: "Grade 10A",
    email: "bob.smith@school.edu",
    phone: "+1 (555) 234-5678",
    status: "active"
  },
  {
    id: "3",
    name: "Carol Davis",
    rollNumber: "003", 
    class: "Grade 9C",
    email: "carol.davis@school.edu",
    phone: "+1 (555) 345-6789",
    status: "active"
  },
  {
    id: "4",
    name: "David Wilson",
    rollNumber: "004",
    class: "Grade 8B", 
    email: "david.wilson@school.edu",
    phone: "+1 (555) 456-7890",
    status: "inactive"
  }
];

export const ManageStudents = () => {
  const [students, setStudents] = useState(studentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleEdit = (studentId: string) => {
    console.log("Edit student:", studentId);
  };

  const handleDelete = (studentId: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const handleAddNew = () => {
    console.log("Add new student");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark mb-2">Manage Students</h1>
          <p className="text-muted-foreground">Add, edit, and organize student information.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Student
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, roll number, or email..."
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Roll No.</th>
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Class</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Phone</th>
                <th className="text-center py-3 px-4 font-semibold">Status</th>
                <th className="text-center py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-accent/10 transition-colors">
                  <td className="py-4 px-4 font-bold text-primary">{student.rollNumber}</td>
                  <td className="py-4 px-4 font-medium">{student.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{student.class}</td>
                  <td className="py-4 px-4 text-sm">{student.email}</td>
                  <td className="py-4 px-4 text-sm">{student.phone}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active' 
                        ? 'bg-present/10 text-present' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(student.id)}
                        className="p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(student.id)}
                        className="p-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedClass !== "all" 
                ? "No students match your search criteria."
                : "No students found. Add your first student to get started."
              }
            </p>
            {!searchTerm && selectedClass === "all" && (
              <Button onClick={handleAddNew} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Add New Student
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};