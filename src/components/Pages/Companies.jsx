import { useState, useMemo} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Building2, LoaderCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { formatRubles } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Separator } from "../ui/separator";


export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

  const { data: companies, isPending } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "companies"
      );
      return data;
    },
  });

  const sortedAndFilteredCompanies = useMemo(() => {
    if (!companies) return [];
    return companies
      .filter(
        (company) =>
          company.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.countries.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          company.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortColumn === "title") {
          if (a.title < b.title) return sortDirection === "asc" ? -1 : 1;
          if (a.title > b.title) return sortDirection === "asc" ? 1 : -1;
        } else if (sortColumn === "profit") {
          if (
            a.report_lists[0]?.reports[0].param_value <
              b.report_lists[0]?.reports[0].param_value ||
            !a.report_lists[0]?.reports[0]?.param_value
          )
            return sortDirection === "asc" ? -1 : 1;
          if (
            a.report_lists[0]?.reports[0].param_value >
              b.report_lists[0]?.reports[0].param_value ||
            !b.report_lists[0]?.reports[0]?.param_value
          )
            return sortDirection === "asc" ? 1 : -1;
        }
      });
  }, [companies, sortColumn, sortDirection, searchTerm]);

  console.log("Data ", companies);
  console.log("Sort", sortedAndFilteredCompanies);

  return (
    <div className="container mx-auto py-10 min-h-[calc(100dvh-82px)]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 pb-3 mb-12">
      <h1 className="text-3xl font-bold mb-2 ">Предприятия</h1>
      <p className="text-muted-foreground">Просматривайте предприятия использующие услуги FinWare</p>
      <Separator  className="my-4"/>
      <div className="flex sm:flex-row gap-4 ">
        <div className="relative max-w-80 mr-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск предприятий..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-80"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-[180px]">
              Сортировка <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={`${sortColumn}-${sortDirection}`}
              onValueChange={(value) => {
                const [column, direction] = value.split("-");
                setSortColumn(column);
                setSortDirection(direction);
              }}
            >
              <DropdownMenuRadioItem value="title-asc">
                По названию (А-Я)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title-desc">
                По названию (Я-А)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="profit-asc">
                По прибыли (возрастание)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="profit-desc">
                По прибыли (убывание)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
      
      {isPending && (
        <div className="flex justify-center">
          <LoaderCircle size={64} className="animate-spin" />
        </div>
      )}
      {!isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredCompanies.length === 0 ? (
            <p className="text-center text-muted-foreground mt-8">
              Предприятия не найдены
            </p>
          ) : (
            sortedAndFilteredCompanies.map((company) => (
              <Card key={company.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {company.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {company.city}, {company.countries.title}
                    </p>
                    <p className="font-semibold text-lg">Чистая прибыль:</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatRubles(
                        company.report_lists[0]?.reports[0].param_value
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
