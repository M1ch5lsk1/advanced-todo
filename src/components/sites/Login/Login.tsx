import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Login = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [color, setColor] = useState("");
  return (
    <div
      className={cn(
        "flex flex-col gap-6 max-w-[33vw] mx-auto mt-[10vh]",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Zaloguj się</CardTitle>
          <CardDescription>
            Wprowadź swoje dane, aby uzyskać dostęp do swojego konta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="chujekwujek@pidief.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Hasło</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Zapomniałeś hasła?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full"
                  onClick={async (e) => {
                    let response;
                    e.preventDefault();
                    await fetch("http://localhost:3000/api/items/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: email,
                        password: password,
                      }),
                    }).then((res: Response) => {
                      response = res;
                      if (res.ok) {
                        setMessage({
                          text: "Zalogowano pomyślnie!",
                          type: "success",
                        });
                      } else {
                        setMessage({
                          text: "Błąd logowania. Sprawdź dane.",
                          type: "error",
                        });
                      }
                    });
                    setColor(
                      message.type === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    );
                    response = await response.json();
                    localStorage.setItem("user", JSON.stringify(response.user));
                    window.location.href = "/"; // Redirect to home page after login
                  }}
                >
                  Zaloguj się
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Nie masz konta?{" "}
              <a href="/register" className="underline underline-offset-4">
                Zarejestruj się
              </a>
            </div>
          </form>
        </CardContent>
        {message && (
          <div className={"text-center " + color + " mt-4"}>{message.text}</div>
        )}
      </Card>
    </div>
  );
};
