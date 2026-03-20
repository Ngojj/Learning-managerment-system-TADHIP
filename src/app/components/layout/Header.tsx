import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { 
  BookOpen, 
  GraduationCap, 
  LogOut, 
  Map, 
  Award,
  LayoutDashboard 
} from "lucide-react";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [userRole] = useState<"student" | "teacher">(
    localStorage.getItem("userRole") as "student" | "teacher" || "student"
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={`/${userRole}/dashboard`} className="flex items-center gap-2 group">
          <div className="relative">
            <GraduationCap className="w-8 h-8 text-purple-600 group-hover:text-pink-600 transition-colors" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            TADHIP
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="gap-2 hover:bg-purple-50"
            onClick={() => navigate(`/${userRole}/dashboard`)}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="gap-2 hover:bg-purple-50"
            onClick={() => navigate("/courses")}
          >
            <BookOpen className="w-4 h-4" />
            Khóa Học
          </Button>
          <Button
            variant="ghost"
            className="gap-2 hover:bg-purple-50"
            onClick={() => navigate("/roadmaps")}
          >
            <Map className="w-4 h-4" />
            Lộ Trình
          </Button>
          {userRole === "student" && (
            <Button
              variant="ghost"
              className="gap-2 hover:bg-purple-50"
              onClick={() => navigate("/certificates")}
            >
              <Award className="w-4 h-4" />
              Chứng Chỉ
            </Button>
          )}
          <Button
            variant="ghost"
            className="gap-2 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Đăng Xuất
          </Button>
        </nav>
      </div>
    </header>
  );
}
