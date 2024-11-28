import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function DelCompDialog({id}) {
  const closeRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const {toast} = useToast();

  const queryClient = useQueryClient();




  const deleteComp = async () => {
    setLoading(true);
    axios
      .delete(import.meta.env.VITE_API_URL + "companies/" + id, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        queryClient.invalidateQueries("companies");
        closeRef.current.click();
        toast({
          title: "Предприятие успешно удалено",
          description: response.data.title + " удалено успешно",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.response?.data,
        })
      }).finally(() => setLoading(false));
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Trash2
          color="#64748b"
          size={28}
          className="absolute top-10 right-2 p-1 hover:bg-accent rounded-sm"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы абсолютно уверены?</DialogTitle>
          <DialogDescription>
            Данное действие необратимо. Вы точно уверены, что хотите удалить это
            предприятие?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={deleteComp} disabled={isLoading}>
            Удалить
          </Button>
          <DialogClose asChild>
            <Button className="sr-only" ref={closeRef}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DelCompDialog;
