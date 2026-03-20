import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Map,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  User,
  Clock,
  Star,
  TrendingUp,
} from "lucide-react";
import { mockRoadmaps, mockCourses } from "../../data/mockData";

export function RoadmapDetail() {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const roadmap = mockRoadmaps.find(r => r.id === roadmapId);

  if (!roadmap) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Không tìm thấy lộ trình</h2>
      </div>
    );
  }

  const roadmapCourses = roadmap.courses
    .map(rc => ({
      order: rc.order,
      course: mockCourses.find(c => c.id === rc.courseId)
    }))
    .filter(item => item.course)
    .sort((a, b) => a.order - b.order);

  const completedCourses = roadmapCourses.filter(rc => rc.course?.progress === 100).length;
  const totalProgress = roadmapCourses.reduce((sum, rc) => sum + (rc.course?.progress || 0), 0) / roadmapCourses.length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Map className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{roadmap.title}</h1>
                <div className="flex items-center gap-3 text-purple-200">
                  <User className="w-4 h-4" />
                  <span>Bởi {roadmap.teacherName}</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-purple-100 mb-8 max-w-3xl">
              {roadmap.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm text-purple-200">Tổng khóa học</span>
                </div>
                <p className="text-2xl font-bold">{roadmapCourses.length}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm text-purple-200">Đã hoàn thành</span>
                </div>
                <p className="text-2xl font-bold">{completedCourses}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm text-purple-200">Tiến độ</span>
                </div>
                <p className="text-2xl font-bold">{Math.round(totalProgress)}%</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-sm text-purple-200">Chứng chỉ</span>
                </div>
                <p className="text-2xl font-bold">✓</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Tiến Độ Tổng Thể</span>
                <span className="font-bold">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Path */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Map className="w-6 h-6 text-purple-600" />
                Lộ Trình Học Tập
              </h2>

              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-purple-300 via-pink-300 to-blue-300" />

                <div className="space-y-6">
                  {roadmapCourses.map((item, index) => {
                    const course = item.course!;
                    const isCompleted = course.progress === 100;
                    const isInProgress = (course.progress || 0) > 0 && (course.progress || 0) < 100;
                    const isLocked = index > 0 && (roadmapCourses[index - 1].course?.progress || 0) < 100;

                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="relative"
                      >
                        {/* Step Number */}
                        <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg z-10 ${
                          isCompleted
                            ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                            : isInProgress
                            ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                            : isLocked
                            ? "bg-gray-300 text-gray-500"
                            : "bg-white border-4 border-purple-300 text-purple-600"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-8 h-8" />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6" />
                          ) : (
                            item.order
                          )}
                        </div>

                        {/* Course Card */}
                        <Card className={`ml-24 p-6 hover:shadow-xl transition-all ${
                          isLocked ? "opacity-60" : "cursor-pointer"
                        }`}
                          onClick={() => !isLocked && navigate(`/courses/${course.id}`)}
                        >
                          <div className="flex gap-4">
                            <img
                              src={course.imageUrl}
                              alt={course.title}
                              className="w-32 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                                    {course.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {course.teacherName}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      {course.rating}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {course.level}
                                    </span>
                                  </div>
                                </div>
                                {!isLocked && (
                                  <Button
                                    size="sm"
                                    className="gap-1 bg-gradient-to-r from-purple-600 to-pink-600"
                                  >
                                    {isCompleted ? "Xem lại" : isInProgress ? "Tiếp tục" : "Bắt đầu"}
                                    <ChevronRight className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>

                              {course.progress !== undefined && course.progress > 0 && (
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">Tiến độ</span>
                                    <span className="font-semibold text-purple-600">
                                      {course.progress}%
                                    </span>
                                  </div>
                                  <Progress value={course.progress} className="h-2" />
                                </div>
                              )}

                              {isLocked && (
                                <div className="mt-3 p-2 bg-gray-100 rounded text-sm text-gray-600 flex items-center gap-2">
                                  <Lock className="w-4 h-4" />
                                  Hoàn thành khóa học trước để mở khóa
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Teacher Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Lời Khuyên Từ Giảng Viên</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{roadmap.tips}</p>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <img
                    src={`https://ui-avatars.com/api/?name=${roadmap.teacherName}&background=random`}
                    alt={roadmap.teacherName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{roadmap.teacherName}</p>
                    <p className="text-sm text-gray-600">Giảng viên hướng dẫn</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Certificate Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-bold text-gray-900">Chứng Chỉ Hoàn Thành</h3>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Hoàn thành tất cả {roadmapCourses.length} khóa học trong lộ trình này để nhận chứng chỉ lộ trình chính thức.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tiến độ hoàn thành</span>
                    <span className="font-semibold text-yellow-700">
                      {completedCourses}/{roadmapCourses.length}
                    </span>
                  </div>
                  <Progress 
                    value={(completedCourses / roadmapCourses.length) * 100} 
                    className="h-2"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Learning Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Thống Kê Học Tập</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-gray-700">Khóa học đã bắt đầu</span>
                    <span className="font-bold text-purple-600">
                      {roadmapCourses.filter(rc => (rc.course?.progress || 0) > 0).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Khóa học hoàn thành</span>
                    <span className="font-bold text-green-600">{completedCourses}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-700">Khóa học còn lại</span>
                    <span className="font-bold text-blue-600">
                      {roadmapCourses.length - completedCourses}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
