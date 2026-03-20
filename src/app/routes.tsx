import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { TeacherDashboard } from "./components/teacher/TeacherDashboard";
import { CourseCatalog } from "./components/courses/CourseCatalog";
import { CourseDetail } from "./components/courses/CourseDetail";
import { QuizTaking } from "./components/quiz/QuizTaking";
import { RoadmapList } from "./components/roadmap/RoadmapList";
import { RoadmapDetail } from "./components/roadmap/RoadmapDetail";
import { Certificates } from "./components/student/Certificates";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "register", Component: Register },
      { path: "student/dashboard", Component: StudentDashboard },
      { path: "teacher/dashboard", Component: TeacherDashboard },
      { path: "courses", Component: CourseCatalog },
      { path: "courses/:courseId", Component: CourseDetail },
      { path: "quiz/:quizId", Component: QuizTaking },
      { path: "roadmaps", Component: RoadmapList },
      { path: "roadmaps/:roadmapId", Component: RoadmapDetail },
      { path: "certificates", Component: Certificates },
      { path: "*", Component: NotFound },
    ],
  },
]);
