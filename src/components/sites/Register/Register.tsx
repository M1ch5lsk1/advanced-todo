import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { backendUrl, type ToDoTask, getUser } from "@/utils";
import { useState } from "react";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
// const backendUrl = "http://localhost:3000";
console.log(backendUrl);

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

export const Register = () => {
  const user = getUser();

  const getIsFormValid = () => {
    return humanInfo.nick && humanInfo.password.value.length >= 8;
  };

  const [serverValidationMsg, setServerValidation] = useState("");
  const [humanInfo, setHumanInfo] = useState({
    nick: "",
    firstName: "",
    lastName: "",
    email: "",
    password: {
      value: "",
      isTouched: false,
    },
    todos: [] as ToDoTask[],
  });

  const [response, setResponse] = useState<any>(null);
  const handleLogin = async () => {
    let response = await fetch(`${backendUrl}/api/items/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...humanInfo,
        password: humanInfo.password.value,
      }),
    });
    response = await response.json();
    setResponse(response);
    setServerValidation(response.message);
    window.location.href = "/login"; // Redirect to login page after registration
  };

  return (
    <div className="flex flex-col gap-6 max-w-[33vw] mx-auto mt-[10vh]">
      <Card>
        <CardHeader>
          <CardTitle>Załóż konto</CardTitle>
          <CardDescription>
            Wypełnij poniższy formularz, aby utworzyć nowe konto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nazwa użytkownika:</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="ChujekWujek84"
                  onChange={(e) =>
                    setHumanInfo({ ...humanInfo, nick: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Imię:</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jan"
                  onChange={(e) => {
                    setHumanInfo({ ...humanInfo, firstName: e.target.value });
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Nazwisko:</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Kowalski"
                  onChange={(e) => {
                    setHumanInfo({ ...humanInfo, lastName: e.target.value });
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email:</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="chujekwujek@pidief.com"
                  required
                  onChange={(e) =>
                    setHumanInfo({ ...humanInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Hasło:</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  onChange={(e) =>
                    setHumanInfo({
                      ...humanInfo,
                      password: { value: e.target.value, isTouched: true },
                    })
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                disabled={!getIsFormValid()}
              >
                Zarejestruj się
              </Button>
            </div>
            {serverValidationMsg &&
              (response.userId ? (
                <div className="text-center text-green-500 mt-4">
                  {serverValidationMsg}
                </div>
              ) : (
                <div className="text-center text-red-500 mt-4">
                  {serverValidationMsg}
                </div>
              ))}
            {humanInfo.password.isTouched &&
            humanInfo.password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
