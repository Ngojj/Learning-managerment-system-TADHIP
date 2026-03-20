import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { GraduationCap, User, Lock, Mail, Phone, Briefcase } from "lucide-react";
import { toast } from "sonner";

export function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    degree: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.username && formData.password && formData.email) {
      localStorage.setItem("currentUser", formData.username);
      localStorage.setItem("userRole", role);
      toast.success("Đăng ký thành công!");
      navigate(`/${role}/dashboard`);
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <Card className="w-full max-w-2xl relative z-10 bg-white/90 backdrop-blur-xl border-purple-100 shadow-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-4">
            <GraduationCap className="w-12 h-12 text-purple-600" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Đăng Ký Tài Khoản
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Tham gia cộng đồng học tập TADHIP
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
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

            {/* Form fields in two columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Họ</Label>
                <Input
                  id="firstName"
                  placeholder="Nguyễn"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input
                  id="lastName"
                  placeholder="Văn A"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {role === "teacher" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="0123456789"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Bằng cấp</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="degree"
                      placeholder="Thạc sĩ, Tiến sĩ..."
                      value={formData.degree}
                      onChange={(e) => handleChange("degree", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Đăng Ký
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Đã có tài khoản? </span>
            <Link to="/" className="text-purple-600 hover:text-pink-600 font-medium">
              Đăng nhập
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
