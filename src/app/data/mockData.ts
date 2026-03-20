// Mock data for the TADHIP application

export interface Course {
  id: string;
  title: string;
  language: "vi" | "en";
  description: string;
  tags: string[];
  minScore: number;
  price: number;
  teacherId: string;
  teacherName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  enrolledCount: number;
  rating: number;
  imageUrl: string;
  progress?: number;
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  lectureCount: number;
  duration: number; // in minutes
  lectures: Lecture[];
  quizzes: Quiz[];
}

export interface Lecture {
  id: string;
  sectionId: string;
  title: string;
  videoUrl: string;
  status: "completed" | "in-progress" | "not-started";
  materials: string[];
  references: string[];
  duration: number;
}

export interface Quiz {
  id: string;
  sectionId: string;
  title: string;
  maxAttempts: number;
  timeLimit: number; // in minutes
  status: "completed" | "in-progress" | "not-started";
  score?: number;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  type: "multiple-choice" | "true-false" | "fill-blank" | "open-ended";
  content: string;
  correctAnswer: string;
  wrongOptions: string[];
}

export interface Certificate {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  studentName: string;
  issueDate: string;
  expiryDate: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  tips: string;
  courses: { order: number; courseId: string }[];
  certificateId?: string;
}

export interface RoadmapCertificate {
  id: string;
  name: string;
  roadmapId: string;
  roadmapName: string;
  studentName: string;
  issueDate: string;
  expiryDate: string;
}

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: "c1",
    title: "React & TypeScript: The Complete Guide",
    language: "en",
    description: "Master React and TypeScript from scratch. Build modern web applications with confidence.",
    tags: ["React", "TypeScript", "Web Development"],
    minScore: 70,
    price: 1500000,
    teacherId: "t1",
    teacherName: "Nguyễn Văn A",
    level: "Intermediate",
    enrolledCount: 1234,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    progress: 45,
  },
  {
    id: "c2",
    title: "Thiết Kế UI/UX Hiện Đại",
    language: "vi",
    description: "Học cách thiết kế giao diện người dùng đẹp mắt và trải nghiệm người dùng tuyệt vời.",
    tags: ["UI/UX", "Design", "Figma"],
    minScore: 75,
    price: 2000000,
    teacherId: "t2",
    teacherName: "Trần Thị B",
    level: "Beginner",
    enrolledCount: 892,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    progress: 20,
  },
  {
    id: "c3",
    title: "Python for Data Science",
    language: "en",
    description: "Dive into data science with Python. Learn pandas, numpy, and machine learning basics.",
    tags: ["Python", "Data Science", "Machine Learning"],
    minScore: 80,
    price: 2500000,
    teacherId: "t1",
    teacherName: "Nguyễn Văn A",
    level: "Advanced",
    enrolledCount: 2341,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
  },
  {
    id: "c4",
    title: "Lập Trình Web Fullstack",
    language: "vi",
    description: "Trở thành fullstack developer với Node.js, Express, MongoDB và React.",
    tags: ["Fullstack", "Node.js", "MongoDB"],
    minScore: 70,
    price: 3000000,
    teacherId: "t3",
    teacherName: "Lê Văn C",
    level: "Intermediate",
    enrolledCount: 1567,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
  },
  {
    id: "c5",
    title: "Mobile App Development with Flutter",
    language: "en",
    description: "Build beautiful cross-platform mobile apps using Flutter and Dart.",
    tags: ["Flutter", "Mobile", "Dart"],
    minScore: 75,
    price: 2200000,
    teacherId: "t2",
    teacherName: "Trần Thị B",
    level: "Intermediate",
    enrolledCount: 987,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    progress: 60,
  },
  {
    id: "c6",
    title: "DevOps & Cloud Computing",
    language: "vi",
    description: "Làm chủ DevOps với Docker, Kubernetes và AWS Cloud Services.",
    tags: ["DevOps", "Docker", "AWS"],
    minScore: 80,
    price: 3500000,
    teacherId: "t3",
    teacherName: "Lê Văn C",
    level: "Advanced",
    enrolledCount: 754,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
  },
];

// Mock sections data
export const mockSections: Section[] = [
  {
    id: "s1",
    courseId: "c1",
    title: "Introduction to React",
    lectureCount: 5,
    duration: 120,
    lectures: [
      {
        id: "l1",
        sectionId: "s1",
        title: "What is React?",
        videoUrl: "#",
        status: "completed",
        materials: ["React Basics.pdf", "Code Examples.zip"],
        references: ["https://react.dev"],
        duration: 15,
      },
      {
        id: "l2",
        sectionId: "s1",
        title: "Setting Up Development Environment",
        videoUrl: "#",
        status: "completed",
        materials: ["Setup Guide.pdf"],
        references: [],
        duration: 25,
      },
      {
        id: "l3",
        sectionId: "s1",
        title: "Your First React Component",
        videoUrl: "#",
        status: "in-progress",
        materials: ["Component Example.jsx"],
        references: [],
        duration: 30,
      },
      {
        id: "l4",
        sectionId: "s1",
        title: "JSX Syntax Deep Dive",
        videoUrl: "#",
        status: "not-started",
        materials: [],
        references: [],
        duration: 20,
      },
      {
        id: "l5",
        sectionId: "s1",
        title: "Props and State",
        videoUrl: "#",
        status: "not-started",
        materials: [],
        references: [],
        duration: 30,
      },
    ],
    quizzes: [
      {
        id: "q1",
        sectionId: "s1",
        title: "React Basics Quiz",
        maxAttempts: 3,
        timeLimit: 15,
        status: "completed",
        score: 85,
        questions: [
          {
            id: "qs1",
            quizId: "q1",
            type: "multiple-choice",
            content: "What does JSX stand for?",
            correctAnswer: "JavaScript XML",
            wrongOptions: ["JavaScript Extension", "Java Syntax", "JavaScript Expert"],
          },
          {
            id: "qs2",
            quizId: "q1",
            type: "true-false",
            content: "React is a framework",
            correctAnswer: "False",
            wrongOptions: ["True"],
          },
        ],
      },
    ],
  },
  {
    id: "s2",
    courseId: "c1",
    title: "TypeScript Fundamentals",
    lectureCount: 6,
    duration: 150,
    lectures: [],
    quizzes: [],
  },
  {
    id: "s3",
    courseId: "c1",
    title: "Advanced React Patterns",
    lectureCount: 8,
    duration: 200,
    lectures: [],
    quizzes: [],
  },
];

// Mock certificates
export const mockCertificates: Certificate[] = [
  {
    id: "cert1",
    name: "React & TypeScript Completion Certificate",
    courseId: "c1",
    courseName: "React & TypeScript: The Complete Guide",
    studentName: "Nguyễn Văn An",
    issueDate: "2026-02-15",
    expiryDate: "2028-02-15",
  },
  {
    id: "cert2",
    name: "UI/UX Design Certificate",
    courseId: "c2",
    courseName: "Thiết Kế UI/UX Hiện Đại",
    studentName: "Nguyễn Văn An",
    issueDate: "2026-01-20",
    expiryDate: "2028-01-20",
  },
];

// Mock roadmaps
export const mockRoadmaps: Roadmap[] = [
  {
    id: "r1",
    title: "Frontend Developer Roadmap 2026",
    description: "Complete path to becoming a professional frontend developer. Master HTML, CSS, JavaScript, React, and more.",
    teacherId: "t1",
    teacherName: "Nguyễn Văn A",
    tips: "Practice coding every day. Build real projects. Don't just watch tutorials - code along!",
    courses: [
      { order: 1, courseId: "c2" },
      { order: 2, courseId: "c1" },
      { order: 3, courseId: "c5" },
    ],
  },
  {
    id: "r2",
    title: "Lộ Trình Fullstack Developer",
    description: "Trở thành fullstack developer chuyên nghiệp với lộ trình học từ frontend đến backend và deployment.",
    teacherId: "t3",
    teacherName: "Lê Văn C",
    tips: "Tập trung vào một ngôn ngữ backend trước khi học nhiều thứ. Hiểu sâu về database và API design.",
    courses: [
      { order: 1, courseId: "c1" },
      { order: 2, courseId: "c4" },
      { order: 3, courseId: "c6" },
    ],
  },
  {
    id: "r3",
    title: "Data Science Career Path",
    description: "Your complete guide to breaking into data science. Learn Python, statistics, ML, and real-world applications.",
    teacherId: "t1",
    teacherName: "Nguyễn Văn A",
    tips: "Focus on statistics and mathematics fundamentals. Work on Kaggle competitions to gain practical experience.",
    courses: [
      { order: 1, courseId: "c3" },
    ],
  },
];

// Student stats
export interface StudentStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalCertificates: number;
  hoursLearned: number;
  currentStreak: number;
}

export const mockStudentStats: StudentStats = {
  totalCourses: 6,
  completedCourses: 2,
  inProgressCourses: 3,
  totalCertificates: 2,
  hoursLearned: 87,
  currentStreak: 12,
};
