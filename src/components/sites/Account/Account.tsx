import React from "react";

import { Button } from "@/components/ui/button";
export const Account = () => {
  return (
    <>
      <Button
        className="center"
        onClick={() => {
          window.localStorage.removeItem("user");
          window.location.href = "/"; // Redirect to login page after logout
        }}
      >
        Wyloguj się
      </Button>
    </>
  );
};
