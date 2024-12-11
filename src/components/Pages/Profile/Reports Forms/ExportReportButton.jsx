import axios from "axios";
import { Download } from "lucide-react";
import { useState } from "react";
import { utils, writeFileXLSX } from 'xlsx';

function ExportReportButton({ compId }) {
  const [isLoading, setLoading] = useState(false);

  async function handleClick() {
    if (isLoading) return;
    
    let data;
    setLoading(true);
    await axios
      .get(import.meta.env.VITE_API_URL + "reports/lists", {
        params: { company_id: compId, full: true },
      })
      .then((response) => {
        data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));

      let sheetData = [];

      data.map((item)=>{
        let sheetItem = {Дата: new Date(
          Date.parse(item.created_at)
        ).toLocaleDateString(undefined, {  year: "numeric", month: "long", day: "numeric" })}
        item.reports.map((report)=>{
          sheetItem[report.parametres.title] = report.param_value
        })
        sheetData.push(sheetItem);
      })

      const ws = utils.json_to_sheet(sheetData); 
      const wb = utils.book_new();  
      utils.book_append_sheet(wb, ws, 'Sheet1');  
      writeFileXLSX(wb, `Отчёт компании ${data[0].companies.title}.xlsx`);
  }

  return (
    <Download
      color="#64748b"
      size={28}
      onClick={handleClick}
      className="min-w-10 h-10 p-1 hover:bg-muted rounded-md cursor-pointer"
    />
  );
}
export default ExportReportButton;
