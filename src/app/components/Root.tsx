import { Outlet, useLocation } from "react-router";
import { Header } from "./layout/Header";

export function Root() {
  const location = useLocation();
  const hideHeader = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {!hideHeader && <Header />}
      <main className={hideHeader ? "" : "pt-16"}>
        <Outlet />
      </main>
    </div>
  );
}
