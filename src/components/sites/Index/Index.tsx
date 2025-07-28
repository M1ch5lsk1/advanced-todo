import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUser } from "@/utils";
// Przykładowe dane notatek, to jest placeholder dla ludzi niezalogowanych

// const user = {}; // do zamiany w przyszłości na hook sprawdzający cookies

const user = getUser();
const isUser = Boolean(user);
// ? JSON.parse(window.localStorage.getItem("user") || "")
// : undefined;

console.log("User from localStorage:", user);
console.log("Is user", Boolean(user));
const notes = [
  {
    id: 1,
    title: "Spotkanie z zespołem",
    content: "Przypomnij o spotkaniu w środę o 10:00.",
    date: "2025-07-12",
  },
  {
    id: 2,
    title: "Zakupy",
    content: "Kupić mleko, chleb, jajka i kawę.",
    date: "2025-07-11",
  },
  {
    id: 3,
    title: "Nowy pomysł",
    content: "Stworzyć aplikację do zarządzania projektami.",
    date: "2025-07-10",
  },
];

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 py-12">
      <Alert
        variant="default"
        className="max-w-[25vw] mx-auto mb-8 scale-[125%]"
      >
        {/* <Terminal /> */}
        <AlertTitle>
          Witaj {isUser ? "ponownie " + user?.nick : "użytkowniku"}!
        </AlertTitle>
        {
          <AlertDescription>
            {isUser
              ? "Zobacz lub stwórz notatki. Nigdy nie zapomnij o tym co jest dla ciebie ważne!"
              : "Zaloguj się aby stworzyć lub przeglądać swoje notatki."}
          </AlertDescription>
        }
      </Alert>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Twoje ostatnie notatki
        </h1>
        <div className="space-y-6">
          {notes.map((note) => (
            <Card key={note.id} className="transition-shadow hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl">{note.title}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {note.date}
                </span>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{note.content}</p>
                <Button variant="outline" size="sm" disabled>
                  Zobacz szczegóły
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
