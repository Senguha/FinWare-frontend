import { CirclePlus} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportAddForm from "./ReportAddForm"



  function AddReportDialog({compId}) {

    return (
    <Dialog>
    <DialogTrigger>
        <CirclePlus color="#64748b" size={28} className="min-w-10 h-10 p-1 hover:bg-muted rounded-md mx-auto" />
    </DialogTrigger>  
    <DialogContent className='h-[70%] p-4'>
    <DialogHeader>
      <DialogTitle>Добавить отчёт</DialogTitle>
      <DialogDescription>Добавьте новый бухгалтерский отчёт в базу предприятия</DialogDescription>
    </DialogHeader>
    <ScrollArea>
      <div className="m-4">
        <ReportAddForm compId={compId} />
      </div>
    </ScrollArea>   
    </DialogContent>
    </Dialog>
  )
}
export default AddReportDialog