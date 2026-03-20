import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  BarChart3,
} from "lucide-react";
import { mockCourses, mockRoadmaps } from "../../data/mockData";

export function TeacherDashboard() {
  const navigate = useNavigate();
  const teacherCourses = mockCourses.slice(0, 4);
  const teacherRoadmaps = mockRoadmaps.slice(0, 2);

  const stats = [
    {
      icon: BookOpen,
      label: "Khóa Học",
      value: teacherCourses.length,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      label: "Học Viên",
      value: "3.2K",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Award,
      label: "Chứng Chỉ Đã Cấp",
      value: 892,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: TrendingUp,
      label: "Đánh Giá TB",
      value: "4.8",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Chào mừng Giảng Viên! 👨‍🏫
        </h1>
        <p className="text-gray-600">Quản lý khóa học và theo dõi tiến độ học viên</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 border-none ${stat.bgColor} hover:shadow-lg transition-all`}>
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Tạo Nội Dung Mới</h3>
              <p className="text-sm text-purple-100">
                Bắt đầu tạo khóa học hoặc lộ trình học mới cho học viên
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-purple-600 hover:bg-purple-50 gap-2">
                <Plus className="w-4 h-4" />
                Khóa Học
              </Button>
              <Button className="bg-white/10 text-white hover:bg-white/20 gap-2 border border-white/20">
                <Plus className="w-4 h-4" />
                Lộ Trình
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Khóa Học Của Tôi</h2>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Tạo Mới
              </Button>
            </div>

            <div className="grid gap-4">
              {teacherCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-5 hover:shadow-xl transition-all border-purple-100">
                    <div className="flex gap-4">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-32 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.enrolledCount} học viên
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                {course.rating}/5.0
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-1"
                              onClick={() => navigate(`/courses/${course.id}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="gap-1">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {course.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Roadmaps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Lộ Trình Của Tôi</h2>
            <div className="space-y-3">
              {teacherRoadmaps.map((roadmap, index) => (
                <Card
                  key={roadmap.id}
                  className="p-4 hover:shadow-lg transition-all cursor-pointer border-blue-100"
                  onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{roadmap.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{roadmap.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{roadmap.courses.length} khóa học</span>
                    <Button size="sm" variant="ghost" className="h-auto p-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Analytics Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6" />
                <h3 className="font-semibold">Phân Tích Tuần Này</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100">Lượt xem mới</span>
                  <span className="font-bold">+234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100">Học viên mới</span>
                  <span className="font-bold">+47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100">Hoàn thành</span>
                  <span className="font-bold">+18</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50">
                Xem Chi Tiết
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
