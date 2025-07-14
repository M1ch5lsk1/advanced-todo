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

export const Register = () => {
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
                <Label htmlFor="name">Imię</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jan Kowalski"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jan@kowalski.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Zarejestruj się
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
