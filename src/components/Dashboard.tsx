import { Card } from "@/components/ui/card";

const quickStats = [
  {
    value: "98%",
    label: "Today's Overall Attendance",
    trend: "+2% from yesterday"
  },
  {
    value: "2 / 5",
    label: "Classes Marked Today",
    trend: "3 remaining"
  },
  {
    value: "Grade 8B",
    label: "Lowest Attendance This Week",
    trend: "85% average"
  }
];

const todaySchedule = [
  {
    time: "09:00 AM",
    class: "Grade 10A",
    subject: "Physics",
    status: "completed",
    statusText: "✓ Marked"
  },
  {
    time: "10:00 AM",
    class: "Grade 9C",
    subject: "History",
    status: "completed",
    statusText: "✓ Marked"
  },
  {
    time: "11:00 AM",
    class: "Grade 10A",
    subject: "Chemistry",
    status: "pending",
    statusText: "Pending..."
  },
  {
    time: "01:00 PM",
    class: "Grade 8B",
    subject: "Mathematics",
    status: "pending",
    statusText: "Pending..."
  }
];

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your attendance overview.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.trend}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          Today's Schedule: Friday, September 26, 2025
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Subject</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {todaySchedule.map((schedule, index) => (
                <tr key={index} className="border-b border-border hover:bg-accent/20 transition-colors">
                  <td className="py-4 px-4 font-medium">{schedule.time}</td>
                  <td className="py-4 px-4">{schedule.class}</td>
                  <td className="py-4 px-4">{schedule.subject}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      schedule.status === 'completed' 
                        ? 'text-present' 
                        : 'text-late'
                    }`}>
                      {schedule.statusText}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};