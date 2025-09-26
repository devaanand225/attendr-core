import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, School } from "lucide-react";
import { useState } from "react";

const classData = [
  {
    id: "1",
    name: "Grade 10A",
    subject: "Physics",
    teacher: "Dr. Sarah Johnson",
    students: 28,
    schedule: "Mon, Wed, Fri - 9:00 AM"
  },
  {
    id: "2", 
    name: "Grade 9C",
    subject: "History",
    teacher: "Prof. Michael Davis",
    students: 30,
    schedule: "Tue, Thu - 10:00 AM"
  },
  {
    id: "3",
    name: "Grade 8B", 
    subject: "Mathematics",
    teacher: "Ms. Emily Wilson",
    students: 25,
    schedule: "Mon, Wed, Fri - 1:00 PM"
  }
];

export const ManageClasses = () => {
  const [classes, setClasses] = useState(classData);

  const handleEdit = (classId: string) => {
    // Edit functionality would open a form/modal
    console.log("Edit class:", classId);
  };

  const handleDelete = (classId: string) => {
    // Delete functionality with confirmation
    if (confirm("Are you sure you want to delete this class?")) {
      setClasses(prev => prev.filter(c => c.id !== classId));
    }
  };

  const handleAddNew = () => {
    // Add new class functionality
    console.log("Add new class");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark mb-2">Manage Classes</h1>
          <p className="text-muted-foreground">Create and manage class schedules and assignments.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Class
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((classInfo) => (
          <Card key={classInfo.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-1">{classInfo.name}</h3>
                <p className="text-muted-foreground">{classInfo.subject}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(classInfo.id)}
                  className="p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(classInfo.id)}
                  className="p-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Teacher</span>
                <span className="font-medium">{classInfo.teacher}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Students</span>
                <span className="font-medium">{classInfo.students}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Schedule</span>
                <span className="font-medium text-sm">{classInfo.schedule}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Students
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Attendance History
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {classes.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-muted-foreground mb-4">
            <School className="w-12 h-12 mx-auto mb-4 opacity-50" />
            No classes found. Create your first class to get started.
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" />
            Add New Class
          </Button>
        </Card>
      )}
    </div>
  );
};