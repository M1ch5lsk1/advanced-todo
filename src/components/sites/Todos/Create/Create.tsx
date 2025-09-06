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
import { getUser } from "@/utils";

export const Create = () => {
  const user = getUser();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [backendResponse, setResponse] = React.useState({
    message: "",
    ToDoId: "",
  });
  const [ToDoObj, SetToDoState] = React.useState({
    author: user._id,
    title: "",
    description: "",
    deadline: "",
    createdAt: "",
    modifiedAt: "",
    status: "pending",
  });
  React.useEffect(() => {
    console.log(date);
    SetToDoState({
      ...ToDoObj,
      deadline: date?.toString() || "",
      createdAt: new Date().toString(),
      modifiedAt: new Date().toString(),
    });
  }, [date]);
  React.useEffect(() => {
    console.log(backendResponse.message);
  }, [backendResponse]);
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
                  onChange={(e) => {
                    SetToDoState({ ...ToDoObj, description: e.target.value });
                  }}
                  required
                />
                <CardTitle>
                  Do kiedy zadanie powinno być zrealizowane?
                </CardTitle>
                <Calendar
                  mode="single"
                  required={true}
                  defaultMonth={date}
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border shadow-sm"
                />
                {/* {date?.toString()} */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!date}
                  onClick={async (e) => {
                    e.preventDefault();
                    await fetch(
                      "http://localhost:3000/api/items/todos/create",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(ToDoObj),
                      }
                    ).then(async (res) => {
                      const data = await res.json();
                      console.log("linia 115: ", data);
                      setResponse(data);
                    });
                  }}
                >
                  Zapisz
                </Button>
                {backendResponse && (
                  <div className={"text-center text-green-500 mt-4 bold"}>
                    {backendResponse.message}
                  </div>
                )}
                {backendResponse.message ? (location.href = "/todos") : ""}
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
