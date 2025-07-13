import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const location = useLocation();
  const user = { name: "" }; // do zamiany w przyszłości na hook sprawdzający cookies

  const navLinks = [
    { to: "/", label: "Strona główna" },
    { to: "/todos", label: user.name ? "Moje zadania" : "" },
    {
      to: user.name ? "/account" : "/login",
      label: user.name ? "Twoje konto" : "Logowanie",
    },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-slate-800 tracking-tight"
        >
          📝 AdvancedTodo
        </Link>
        <div className="flex gap-2">
          {navLinks.map(
            (link) =>
              link.label && (
                <Button
                  key={link.to}
                  asChild
                  variant={location.pathname === link.to ? "default" : "ghost"}
                  size="sm"
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              )
          )}
        </div>
      </div>
    </nav>
  );
};
