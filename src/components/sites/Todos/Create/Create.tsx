import * as React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

export const Create = () => {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  );
  const [ToDoObj, SetToDoState] = React.useState({
    title: "",
    description: "",
    date: "",
  });
  return (
    <div className="flex flex-col gap-6 max-w-[33vw] mx-auto mt-[2vh]">
      <Card>
        <CardHeader>
          <CardTitle>Utwórz ToDo</CardTitle>
          <CardDescription>
            Wpisz ToDo aby potem o nim nie zapomnieć.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>Tytuł</Label>
                <Input
                  id="text"
                  type="text"
                  placeholder="Weri ważne zadanie"
                  onChange={(e) => {
                    console.log(ToDoObj);
                    SetToDoState({ ...ToDoObj, title: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label>Zadanie</Label>
                </div>
                <Textarea
                  id="text"
                  className="min-h-[10vh]"
                  placeholder="Pójść do kibelka po wstaniu"
                  required
                />
                <Calendar
                  mode="single"
                  defaultMonth={date}
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border shadow-sm"
                />
                {date?.toString()}
                <Button
                  type="submit"
                  className="w-full"
                  onClick={async (e) => {
                    e.preventDefault();
                    await fetch("http://localhost:3000/api/items/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: email,
                        password: password,
                      }),
                    });
                  }}
                >
                  Zapisz
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        {/* {message && (
          <div
            className={
              "text-center " +
              (message.type == "success" ? "text-green-500" : "text-red-500") +
              " mt-4"
            }
          >
            {message.text}
          </div>
        )} */}
      </Card>
    </div>
  );
};
