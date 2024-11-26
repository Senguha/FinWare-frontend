import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { LoaderCircle, Info } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";


function ReportTable( {ListId} ) {
  const {data , isPending} = useQuery({
    queryKey: ["reportList", ListId],
    queryFn:async () => {
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "reports", 
          {params:{
            list_id: ListId,
          },
          }
        );
        return data;
  }})
  
    return (
    <>
        {isPending && (
        <div className="flex justify-center">
          <LoaderCircle
            size={64}
            className="animate-spin py-10"
          />
        </div>
      )}
      {!isPending && ( 
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Показатель</TableHead>
                    <TableHead>Значение</TableHead>
                    <TableHead className="w-24">Описание</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((report) => (
                    <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.parametres.title}</TableCell>
                        <TableCell className="text-lg font-medium">{report.parametres.measurement_unit == null ? report.param_value : report.param_value + " " + report.parametres.measurement_unit}</TableCell>
                        <TableCell className="w-24 flex justify-center">{<TooltipProvider><Tooltip><TooltipTrigger><Info /></TooltipTrigger><TooltipContent>{report.parametres.desc}</TooltipContent></Tooltip></TooltipProvider>}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      )}
    </>
    
  )
}

export default ReportTable