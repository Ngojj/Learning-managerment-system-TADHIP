import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { GraduationCap, User, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (username && password) {
      localStorage.setItem("currentUser", username);
      localStorage.setItem("userRole", role);
      toast.success("Đăng nhập thành công!");
      navigate(`/${role}/dashboard`);
    } else {
      toast.error("Vui lòng nhập tên đăng nhập và mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-xl border-purple-100 shadow-2xl">
        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <GraduationCap className="w-16 h-16 text-purple-600" />
              <Sparkles className="w-6 h-6 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Chào Mừng Đến TADHIP
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Nền tảng học tập hiện đại & sáng tạo
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === "student"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-200"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User className={`w-6 h-6 ${role === "student" ? "text-purple-600" : "text-gray-400"}`} />
                  <span className={`font-medium ${role === "student" ? "text-purple-600" : "text-gray-600"}`}>
                    Sinh Viên
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === "teacher"
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <GraduationCap className={`w-6 h-6 ${role === "teacher" ? "text-pink-600" : "text-gray-400"}`} />
                  <span className={`font-medium ${role === "teacher" ? "text-pink-600" : "text-gray-600"}`}>
                    Giảng Viên
                  </span>
                </div>
              </button>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Tên đăng nhập
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Đăng Nhập
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <Link to="/register" className="text-purple-600 hover:text-pink-600 font-medium">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
