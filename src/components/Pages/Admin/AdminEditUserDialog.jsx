import { PenLine, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AdminEditUserForm from "./AdminEditUserForm";

function AdminEditUserDialog({ id }) {
  const { data: user, isPending } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "users/" + id, {
          withCredentials: true,
        }
      );
      return data;
    },
  });


  return (
    <Dialog>
      <DialogTrigger>
        <PenLine
          color="#64748b"
          size={28}
          className="absolute top-2 right-2 p-1 hover:bg-accent rounded-sm"
        />
      </DialogTrigger>
      <DialogContent>

        {(isPending) ? (
          <div className="flex justify-center">
            <LoaderCircle size={64} className="animate-spin py-10" />
          </div>
        ) :
        (
          <>
          <DialogHeader>
          <DialogTitle>Редактировать пользователя</DialogTitle>
          <DialogDescription>
            Изменить данные об уже существующем пользователе
          </DialogDescription>
        </DialogHeader>

            <AdminEditUserForm user={user}/>

          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AdminEditUserDialog;
