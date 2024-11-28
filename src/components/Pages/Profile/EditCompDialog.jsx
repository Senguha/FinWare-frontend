import { PenLine} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EditForm from "./EditCompForm"
import { ScrollArea } from "@/components/ui/scroll-area";

  function EditCompDialog({id}) {

    return (
    
    <Dialog>
    <DialogTrigger>
        <PenLine color="#64748b" size={28} className="absolute top-2 right-2 p-1 hover:bg-accent rounded-sm"/>
    </DialogTrigger>  
    <DialogContent className='h-[70%] p-4'>
    <DialogHeader>
      <DialogTitle>Изменить предприятие</DialogTitle>
      <DialogDescription>Изменить данные об уже существующем предприятии</DialogDescription>
    </DialogHeader>
    <ScrollArea className='p-4'>
        <EditForm id={id}/>
    </ScrollArea>   
    </DialogContent>
    </Dialog>
  )
}

export default EditCompDialog