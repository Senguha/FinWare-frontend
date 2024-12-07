import { Card, CardContent } from "../../../ui/card";
import {
  BadgeDollarSign,
  CircleUserRound,
  LogIn,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/Routes/Layout/navbar/LoginForm";
import { RegistrationForm } from "@/components/Routes/Layout/navbar/RegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/zustand";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
function Navbar() {
  const { toast } = useToast();

  const login = useAuthStore((state) => state.login);
  const is_admin = useAuthStore((state) => state.is_admin);
  const resetUser = useAuthStore((state) => state.resetUser);

  const logout = async () => {
    axios
      .get(import.meta.env.VITE_API_URL + "users/logout", {
        withCredentials: true,
      })
      .then(resetUser())
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: err.response.data,
        });
      });
  };

  return (
    <header className="m-4">
      <Card>
        <CardContent className="py-2 px-4 flex">
          <nav className="font-medium text-lg flex items-center w-full md:justify-normal justify-between">
            <div className="flex items-center gap-4 md:mr-24">
              <BadgeDollarSign size={48} />
              <span className="font-bold sr-only md:not-sr-only">FinWare</span>
            </div>
            <div className="flex gap-4">
              <Link to={"/"} className="hover:bg-accent rounded-lg py-2 px-4">
                Главная
              </Link>
              <Link
                to={"/companies"}
                className="hover:bg-accent rounded-lg py-2 px-4"
              >
                Предприятия
              </Link>
            </div>
            <div className="md:ml-auto">
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="flex gap-2 hover:bg-accent"
                  >
                    <div className="py-2 px-2 rounded-lg">
                      {login && (
                        <span className="sr-only md:not-sr-only">{login}</span>
                      )}
                      <CircleUserRound size={32} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!login ? (
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          <LogIn /> <span>Войти</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                    ) : (
                      <>
                        {!is_admin ? (
                          <Link to={"/profile"}>
                            <DropdownMenuItem>
                              <User />
                              <span>Личный кабинет</span>
                            </DropdownMenuItem>
                          </Link>
                        ) : (
                          <Link to={"/admin"}>
                            <DropdownMenuItem>
                              <User />
                              <span>Админ-панель</span>
                            </DropdownMenuItem>
                          </Link>
                        )}

                        <Link to={"/settings"}>
                          <DropdownMenuItem>
                            <Settings />
                            <span>Настройки</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => logout()}>
                          <LogOut />
                          <span> Выйти</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogTitle className="sr-only" />
                <DialogContent className="pt-12">
                  <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Вход в систему</TabsTrigger>
                      <TabsTrigger value="registration">
                        Регистрация
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <LoginForm />
                    </TabsContent>
                    <TabsContent value="registration">
                      <RegistrationForm />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </nav>
        </CardContent>
      </Card>
    </header>
  );
}

export default Navbar;
