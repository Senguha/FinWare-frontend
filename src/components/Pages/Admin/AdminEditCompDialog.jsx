import { PenLine, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AdminEditForm from "./AdminEditCompForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function AdminEditCompDialog({ id }) {
  const { data: countries, isPendingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "countries"
      );
      return data;
    },
  });
  const { data: companyData, isPendingComp } = useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "companies/" + id
      );
      return data;
    },
  });

  const { data: users, isPending: isPendingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "users", {withCredentials: true} 
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
      <DialogContent className="h-[70%] p-4">

        {(isPendingCountries || isPendingComp || isPendingUsers) ? (
          <div className="flex justify-center">
            <LoaderCircle size={64} className="animate-spin py-10" />
          </div>
        ) :
        (
          <>
          <DialogHeader>
          <DialogTitle>Изменить предприятие</DialogTitle>
          <DialogDescription>
            Изменить данные об уже существующем предприятии
          </DialogDescription>
        </DialogHeader>
          <ScrollArea>
            <div className="m-4">
              <AdminEditForm id={id} countries={countries} companyData={companyData} users={users}/>
            </div>
          </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AdminEditCompDialog;
