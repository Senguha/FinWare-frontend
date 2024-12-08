import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import ReportEditDialog from "./Reports Forms/ReportEditDialog";
import AddReportDialog from "./Reports Forms/AddReportDialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportDelDialog from "./Reports Forms/ReportDelDialog";
import ExportReportButton from "./Reports Forms/ExportReportButton";

function ReportSheet({ id }) {
  const { data: reportData, isPending: isPendingReps } = useQuery({
    queryKey: ["company", id, "report_list"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "reports/lists",
        { params: { company_id: id } }
      );
      return data;
    },
  });
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="absolute bottom-2 right-2" variant="secondary">
          Отчёты
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col gap-1">
        <SheetHeader>
          <SheetTitle>Отчётность предприятия</SheetTitle>
          <SheetDescription>
            Добавляйте, изменяйте и удаляйте отчётности о бухгалтерском балансе предприятия.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea>
        {isPendingReps && (
          <LoaderCircle
            size={64}
            className="animate-spin py-10 min-h-[calc(100dvh-82px)]"
          />
        )}
        {!isPendingReps &&
          (reportData.length === 0 ? (
            <>
              <div className="flex gap-2 my-2">
                <Separator className="my-4 w-[40%] ml-auto" />
                <AddReportDialog compId={id} />
                <Separator className="my-4 w-[40%] mr-auto" />
              </div>
              <p className="font-medium text-lg text-center text-muted-foreground m-8">
                Отчёты не найдены
              </p>
            </>
          ) : (
            <>
              <div className="flex mt-2 bg-card rounded-md p-2 w-fit border shadow-sm">
                <AddReportDialog compId={id} />
                <ExportReportButton compId={id} />
              </div>
              <Separator className="my-4" />
              {reportData.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="mr-auto">
                        {new Date(
                          Date.parse(report.created_at)
                        ).toLocaleDateString(undefined, {  year: "numeric", month: "long", day: "numeric" })}
                      </div>
                      <ReportEditDialog id={report.id} compId={id} date={report.created_at}/>
                      <ReportDelDialog id={report.id} compId={id} />
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </>
          ))}
        </ScrollArea>
        
      </SheetContent>
    </Sheet>
  );
}

export default ReportSheet;
