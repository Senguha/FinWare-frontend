import { PenLine} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportEditForm from "./ReportEditForm"

  function EditReportDialog({id}) {

    return (
    
    <Dialog>
    <DialogTrigger>
        <PenLine color="#64748b" size={28} className="p-1 hover:bg-accent rounded-sm"/>
    </DialogTrigger>  
    <DialogContent className='h-[70%] p-4'>
    <DialogHeader>
      <DialogTitle>Изменить предприятие</DialogTitle>
      <DialogDescription>Изменить данные об уже существующем предприятии</DialogDescription>
    </DialogHeader>
    <ScrollArea className='p-4'>
        <ReportEditForm id={id}/>
    </ScrollArea>   
    </DialogContent>
    </Dialog>
  )
}

export default EditReportDialog