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
import ReportEditDialog from "./ReportEditDialog";

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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        {isPendingReps && (
          <LoaderCircle
            size={64}
            className="animate-spin py-10 min-h-[calc(100dvh-82px)]"
          />
        )}
        {!isPendingReps &&
          (reportData.length === 0 ? (
            <p className="font-medium text-lg text-center text-muted-foreground m-8">
              Отчёты не найдены
            </p>
          ) : (
            reportData.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="mr-auto">
                    {new Date(
                      Date.parse(report.created_at)
                    ).toLocaleDateString()}
                    </div>
                    
                    <ReportEditDialog id={report.id}/>
                    <Trash2
                      color="#64748b"
                      size={28}
                      className="p-1 hover:bg-accent rounded-sm"
                    />
                  </CardTitle>
                </CardHeader>
              </Card>
            ))
          ))}
      </SheetContent>
    </Sheet>
  );
}

export default ReportSheet;
