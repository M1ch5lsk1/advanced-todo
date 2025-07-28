import { Button } from "@/components/ui/button";
import React from "react";

export const Todos = () => {
  return (
    <>
      <Button
        onClick={() => {
          window.location.href = "/todos/create";
        }}
      >
        Utwórz ToDo
      </Button>
      <p>Utwórz lub podejrzyj swoje ToDo</p>
    </>
  );
};
