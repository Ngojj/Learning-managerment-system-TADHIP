import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Flame,
  CheckCircle2,
  Play,
  ChevronRight,
  Target,
} from "lucide-react";
import { mockCourses, mockStudentStats, mockCertificates } from "../../data/mockData";

export function StudentDashboard() {
  const navigate = useNavigate();
  const stats = mockStudentStats;
  const enrolledCourses = mockCourses.filter(c => c.progress !== undefined);
  const recentCertificates = mockCertificates.slice(0, 2);

  const statCards = [
    {
      icon: BookOpen,
      label: "Khóa Học Đang Học",
      value: stats.inProgressCourses,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: CheckCircle2,
      label: "Đã Hoàn Thành",
      value: stats.completedCourses,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Award,
      label: "Chứng Chỉ",
      value: stats.totalCertificates,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: Clock,
      label: "Giờ Học",
      value: stats.hoursLearned,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Xin chào, {localStorage.getItem("currentUser") || "Student"}! 👋
          </h1>
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full">
            <Flame className="w-5 h-5" />
            <span className="font-bold">{stats.currentStreak} ngày</span>
          </div>
        </div>
        <p className="text-gray-600">Tiếp tục hành trình học tập của bạn hôm nay!</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 border-none ${stat.bgColor} hover:shadow-lg transition-all cursor-pointer`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Play className="w-6 h-6 text-purple-600" />
                Tiếp Tục Học
              </h2>
              <Button
                variant="ghost"
                className="gap-1 text-purple-600 hover:text-purple-700"
                onClick={() => navigate("/courses")}
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {enrolledCourses.slice(0, 3).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="p-5 hover:shadow-xl transition-all cursor-pointer border-purple-100"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.teacherName}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Tiến độ</span>
                            <span className="font-semibold text-purple-600">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5" />
                    <h3 className="font-semibold">Mục Tiêu Tuần Này</h3>
                  </div>
                  <p className="text-sm text-purple-100 mb-4">
                    Hoàn thành 3 bài học và đạt 80% điểm quiz
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tiến độ: 2/3 bài học</span>
                      <span className="font-semibold">67%</span>
                    </div>
                    <Progress value={67} className="h-2 bg-white/20" />
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Recent Certificates & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Chứng Chỉ Mới Nhất
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-purple-600"
                onClick={() => navigate("/certificates")}
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                          {cert.courseName}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {new Date(cert.issueDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hành Động Nhanh</h2>
            <div className="space-y-3">
              <Button
                className="w-full justify-start gap-3 h-auto py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => navigate("/courses")}
              >
                <BookOpen className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Khám Phá Khóa Học</div>
                  <div className="text-xs opacity-90">Tìm khóa học phù hợp với bạn</div>
                </div>
              </Button>
              <Button
                className="w-full justify-start gap-3 h-auto py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                onClick={() => navigate("/roadmaps")}
              >
                <Target className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Xem Lộ Trình</div>
                  <div className="text-xs opacity-90">Lập kế hoạch học tập dài hạn</div>
                </div>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
