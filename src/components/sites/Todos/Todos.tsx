import { Button } from "@/components/ui/button";
import { Create } from "./Create/Create";
import { useState } from "react";

export const Todos = () => {
  const [isCreate, setCreateStatus] = useState(false);
  const UI = () => {
    return (
      <>
        <Button
          onClick={() => {
            setCreateStatus(!isCreate);
          }}
        >
          Utwórz ToDo
        </Button>

        <p>Utwórz lub podejrzyj swoje ToDo</p>
      </>
    );
  };

  const el = isCreate ? <Create /> : <UI />;
  return (
    <>
      {isCreate && (
        <Button
          className="flex flex-col mx-auto mt-[6vh]"
          onClick={() => setCreateStatus(!isCreate)}
        >
          Anuluj
        </Button>
      )}
      {el}
    </>
  );
};
