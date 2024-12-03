import { PenLine, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportEditForm from "./ReportEditForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function EditReportDialog({ id, compId, date }) {
  const { data, isPending } = useQuery({
    queryKey: ["reports", id],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "reports",
        { params: { list_id: id } }
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
          className="p-1 hover:bg-accent rounded-sm"
        />
      </DialogTrigger>
      <DialogContent className="h-[70%] p-4">
        <DialogHeader>
          <DialogTitle>Изменить отчёт</DialogTitle>
          <DialogDescription>
            Изменить данные об уже существующем отчёте
          </DialogDescription>
        </DialogHeader>
        {isPending && (
          <div className="flex justify-center">
          <LoaderCircle size={64} className="animate-spin py-10" />
        </div>
        )}
        {!isPending && (
          <ScrollArea>
            <div className="m-4">
              <ReportEditForm
                listId={id}
                compId={compId}
                data={data}
                date={date}
              />
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditReportDialog;
