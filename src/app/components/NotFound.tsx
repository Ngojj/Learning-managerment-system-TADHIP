import { Link } from "react-router";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl text-gray-600 mt-4">Không tìm thấy trang</p>
        <Link to="/">
          <Button className="mt-6 gap-2">
            <Home className="w-4 h-4" />
            Về Trang Chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
