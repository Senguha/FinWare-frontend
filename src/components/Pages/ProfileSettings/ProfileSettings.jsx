import { useAuthStore } from "@/stores/zustand";
import { Pencil } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "../../ui/dialog";
import LoginEditForm from "./LoginEditForm";
import { PassEditForm } from "./PassEditForm";
import { Separator } from "../../ui/separator";

function ProfileSettings() {
  const { login, created_at, is_admin } = useAuthStore();
  return (
    <div className="md:max-w-xl max-w-full mx-auto py-10 min-h-[calc(100dvh-82px)]">   
      <div className="rounded-lg border bg-card text-card-foreground shadow-md p-6 mb-12 flex flex-col gap-6">
      <div>
      <h1 className="text-3xl font-bold mb-2 ">Настройки аккаунта</h1>
      <p className="text-muted-foreground">
          Изменяйте личные данные вашей учётной записи
        </p>
      <Separator className="mt-4 mb-0" />
      </div>
        <div>
          <p className="text-muted-foreground font-medium">Логин</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{login}</p>
            <Dialog>
                <DialogTrigger>
                  <div className="p-1 hover:bg-accent rounded-sm">
                    <Pencil color={"#64748b"} className="h-4 w-4" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <LoginEditForm/>
                </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground font-medium">Пароль</p>
          <div className="flex items-center gap-2">
          <p className="font-medium">••••••••••••</p>
          <Dialog>
                <DialogTrigger>
                <div className="p-1 hover:bg-accent rounded-sm">
                    <Pencil color={"#64748b"} className="h-4 w-4" />
                </div>
                </DialogTrigger>
                <DialogContent>
                  <PassEditForm/>
                </DialogContent>
            </Dialog>

          </div>
        </div>
        <div>
          <p className="text-muted-foreground font-medium">Роль</p>
          <p className="font-medium">
            {is_admin ? "Администратор" : "Пользователь"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground font-medium">Дата создания</p>
          <p className="font-medium">
            {new Date(Date.parse(created_at)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
