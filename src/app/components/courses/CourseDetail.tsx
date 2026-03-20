import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  Star,
  Users,
  Clock,
  Award,
  BookOpen,
  FileText,
  ChevronRight,
  Download,
} from "lucide-react";
import { mockCourses, mockSections } from "../../data/mockData";

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);
  const sections = mockSections.filter(s => s.courseId === courseId);
  
  const [activeTab, setActiveTab] = useState("overview");

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Không tìm thấy khóa học</h2>
      </div>
    );
  }

  const totalLectures = sections.reduce((sum, section) => sum + section.lectureCount, 0);
  const totalDuration = sections.reduce((sum, section) => sum + section.duration, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.language === "vi" ? "Tiếng Việt" : "English"}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-purple-100 mb-6">{course.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-purple-200">(892 đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolledCount.toLocaleString()} học viên</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${course.teacherName}&background=random`}
                  alt={course.teacherName}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-sm text-purple-200">Giảng viên</p>
                  <p className="font-semibold">{course.teacherName}</p>
                </div>
              </div>

              {course.progress !== undefined && (
                <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Tiến độ của bạn</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}
            </div>

            {/* Right Card */}
            <div>
              <Card className="overflow-hidden border-purple-100 shadow-2xl">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    {(course.price / 1000000).toFixed(1)}M VND
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      <span>{sections.length} học phần</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <PlayCircle className="w-5 h-5 text-purple-600" />
                      <span>{totalLectures} bài giảng</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span>{Math.floor(totalDuration / 60)} giờ {totalDuration % 60} phút</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span>Chứng chỉ hoàn thành</span>
                    </div>
                  </div>

                  {course.progress !== undefined ? (
                    <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Tiếp Tục Học
                    </Button>
                  ) : (
                    <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Đăng Ký Ngay
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="curriculum">Nội Dung</TabsTrigger>
            <TabsTrigger value="reviews">Đánh Giá</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Về Khóa Học Này</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Bạn sẽ học được gì:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Nắm vững các khái niệm cơ bản và nâng cao</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Xây dựng dự án thực tế từ đầu đến cuối</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Áp dụng best practices trong ngành</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Chuẩn bị cho các vị trí việc làm chuyên nghiệp</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Chủ Đề</h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full border border-purple-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nội Dung Khóa Học</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {sections.map((section, index) => (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      className="border border-purple-100 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-purple-50">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm">
                              {index + 1}
                            </span>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900">{section.title}</h3>
                              <p className="text-sm text-gray-600">
                                {section.lectureCount} bài học • {section.duration} phút
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-gray-50">
                        <div className="space-y-2">
                          {section.lectures.map((lecture, lIndex) => (
                            <div
                              key={lecture.id}
                              className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lecture.status === "completed" ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : lecture.status === "in-progress" ? (
                                  <PlayCircle className="w-5 h-5 text-purple-600" />
                                ) : (
                                  <Lock className="w-5 h-5 text-gray-400" />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{lecture.title}</p>
                                  <p className="text-sm text-gray-600">{lecture.duration} phút</p>
                                </div>
                              </div>
                              {lecture.materials.length > 0 && (
                                <Button size="sm" variant="ghost">
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          
                          {section.quizzes.map(quiz => (
                            <div
                              key={quiz.id}
                              className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 cursor-pointer transition-colors border border-yellow-200"
                              onClick={() => navigate(`/quiz/${quiz.id}`)}
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-yellow-600" />
                                <div>
                                  <p className="font-medium text-gray-900">{quiz.title}</p>
                                  <p className="text-sm text-gray-600">
                                    {quiz.timeLimit} phút • {quiz.questions.length} câu hỏi
                                  </p>
                                </div>
                              </div>
                              {quiz.score !== undefined && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                  {quiz.score}%
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">{course.rating}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">892 đánh giá</p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-8">{rating} ⭐</span>
                        <Progress value={rating === 5 ? 80 : rating === 4 ? 15 : 5} className="h-2" />
                        <span className="text-sm text-gray-600 w-12">
                          {rating === 5 ? "80%" : rating === 4 ? "15%" : "5%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=User${i}&background=random`}
                          alt="User"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Học viên {i}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2 tuần trước</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Khóa học rất hay và bổ ích. Giảng viên truyền đạt rất dễ hiểu. Tôi đã học được rất nhiều kiến thức mới.
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
