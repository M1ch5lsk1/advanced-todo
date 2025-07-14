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

export const Login = ({ className, ...props }: React.ComponentProps<"div">) => {
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
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
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
      </Card>
    </div>
  );
};
