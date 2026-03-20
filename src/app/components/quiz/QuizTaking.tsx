import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Flag,
} from "lucide-react";
import { mockSections } from "../../data/mockData";
import confetti from "canvas-confetti";

export function QuizTaking() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  // Find quiz from sections
  const quiz = mockSections
    .flatMap(s => s.quizzes)
    .find(q => q.id === quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit ? quiz.timeLimit * 60 : 900); // in seconds

  if (!quiz) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Không tìm thấy bài kiểm tra</h2>
      </div>
    );
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);

    // Trigger confetti if passed
    if (finalScore >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const currentQ = quiz.questions[currentQuestion];
  const allOptions = currentQ ? [currentQ.correctAnswer, ...currentQ.wrongOptions].sort() : [];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 text-center">
            {score >= 70 ? (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Chúc Mừng! 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                  Bạn đã hoàn thành bài kiểm tra xuất sắc!
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Hãy Cố Gắng Hơn! 💪
                </h1>
                <p className="text-gray-600 mb-6">
                  Bạn có thể làm lại bài kiểm tra để đạt điểm cao hơn
                </p>
              </>
            )}

            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full mb-6">
              <Award className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <p className="text-sm text-gray-600">Điểm số của bạn</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {score}%
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Tổng số câu hỏi</span>
                <span className="font-semibold">{quiz.questions.length}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="text-green-700">Trả lời đúng</span>
                <span className="font-semibold text-green-700">
                  {Math.round((score / 100) * quiz.questions.length)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <span className="text-red-700">Trả lời sai</span>
                <span className="font-semibold text-red-700">
                  {quiz.questions.length - Math.round((score / 100) * quiz.questions.length)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Quay Lại
              </Button>
              {score < 70 && (
                <Button
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                    setScore(0);
                  }}
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  Làm Lại
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Câu hỏi {currentQuestion + 1} / {quiz.questions.length}</span>
                <span>{Math.round(progress)}% hoàn thành</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </Card>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm mb-6">
            {/* Question Type Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
              {currentQ.type === "multiple-choice" && "Nhiều lựa chọn"}
              {currentQ.type === "true-false" && "Đúng/Sai"}
              {currentQ.type === "fill-blank" && "Điền vào chỗ trống"}
              {currentQ.type === "open-ended" && "Tự luận"}
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.content}
            </h2>

            {/* Options */}
            {(currentQ.type === "multiple-choice" || currentQ.type === "true-false") && (
              <RadioGroup
                value={selectedAnswers[currentQuestion]}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {allOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedAnswers[currentQuestion] === option
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-gray-900"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === "fill-blank" && (
              <input
                type="text"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                placeholder="Nhập câu trả lời của bạn..."
                value={selectedAnswers[currentQuestion] || ""}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              />
            )}

            {currentQ.type === "open-ended" && (
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none resize-none"
                rows={6}
                placeholder="Nhập câu trả lời của bạn..."
                value={selectedAnswers[currentQuestion] || ""}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              />
            )}
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Câu Trước
          </Button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  index === currentQuestion
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : selectedAnswers[index]
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
            >
              <Flag className="w-4 h-4" />
              Nộp Bài
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentQuestion === quiz.questions.length - 1}
              className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Câu Tiếp
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Submit Warning */}
        {Object.keys(selectedAnswers).length !== quiz.questions.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                Bạn chưa trả lời hết các câu hỏi. Vui lòng hoàn thành tất cả câu hỏi trước khi nộp bài.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
