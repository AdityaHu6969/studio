import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const courses = [
  {
    id: "MATH101",
    name: "Calculus II",
    teacher: {
      name: "Dr. Evans",
      avatar: "https://picsum.photos/seed/202/100/100"
    },
    description: "Advanced topics in differential and integral calculus."
  },
  {
    id: "PHY201",
    name: "Physics I",
    teacher: {
      name: "Dr. Smith",
      avatar: "https://picsum.photos/seed/203/100/100"
    },
    description: "Fundamentals of mechanics, heat, and sound."
  },
  {
    id: "HIST101",
    name: "World History",
    teacher: {
      name: "Dr. Jones",
      avatar: "https://picsum.photos/seed/204/100/100"
    },
    description: "A survey of major global events and civilizations."
  },
  {
    id: "CHEM101",
    name: "Chemistry I",
    teacher: {
      name: "Dr. Reed",
      avatar: "https://picsum.photos/seed/201/100/100"
    },
    description: "Introduction to atomic structure, bonding, and reactions."
  },
    {
    id: "ENG102",
    name: "English Literature",
    teacher: {
      name: "Dr. Austen",
      avatar: "https://picsum.photos/seed/205/100/100"
    },
    description: "Analysis of major works from Chaucer to modern day."
  },
  {
    id: "ART100",
    name: "Art History",
    teacher: {
      name: "Dr. Vinci",
      avatar: "https://picsum.photos/seed/206/100/100"
    },
    description: "Exploring artistic movements from the Renaissance to Pop Art."
  }
];

export default function CoursesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Courses & Faculty</h1>
        <p className="text-muted-foreground">Browse your enrolled courses and meet your teachers.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{course.description}</p>
              <div className="flex items-center gap-3 pt-4 border-t">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={course.teacher.avatar} alt={course.teacher.name} />
                  <AvatarFallback>{course.teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{course.teacher.name}</p>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
