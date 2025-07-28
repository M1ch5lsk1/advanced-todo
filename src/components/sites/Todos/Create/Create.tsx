import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Create = () => {
  return (
    <div className="flex flex-col gap-6 max-w-[33vw] mx-auto mt-[10vh]">
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
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label>Zadanie</Label>
                </div>
                <Input
                  id="text"
                  type="text"
                  placeholder="Pójść do kibelka po wstaniu"
                  required
                />
                <Button type="submit" className="w-full">
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
