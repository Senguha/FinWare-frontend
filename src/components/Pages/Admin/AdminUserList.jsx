import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, LoaderCircle, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import AdminEditUserDialog from "./AdminEditUserDialog";
import DelUserDialog from "./DelUserDialog";

export default function AdminUserListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(import.meta.env.VITE_API_URL + "users", {
        withCredentials: true,
      });
      return data;
    },
  });

  const sortedAndFilteredUsers = useMemo(() => {
    if (!users) return [];
    return users
      .filter((user) =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortColumn === "date") {
          if (Date.parse(a.created_at) < Date.parse(b.created_at))
            return sortDirection === "asc" ? -1 : 1;
          if (Date.parse(a.created_at) > Date.parse(b.created_at))
            return sortDirection === "asc" ? 1 : -1;
        } else if (sortColumn === "comp") {
          if (a._count.companies < b._count.companies)
            return sortDirection === "asc" ? -1 : 1;
          if (a._count.companies > b._count.companies)
            return sortDirection === "asc" ? 1 : -1;
        }
      });
  }, [users, sortColumn, sortDirection, searchTerm]);

  console.log("Data ", users);
  console.log("Sort", sortedAndFilteredUsers);

  return (
    <div className="container mx-auto py-10 min-h-[calc(100dvh-82px)]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 pb-3 mb-12">
        <div className="text-3xl font-bold mb-2 flex gap-4">
          Пользователи FinWare
        </div>
        <p className="text-muted-foreground">
          Администрируйте пользователей использующие услуги FinWare
        </p>
        <Separator className="my-4" />
        <div className="flex sm:flex-row gap-4 ">
          <div className="relative max-w-80 mr-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск пользователей..."
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
                <DropdownMenuRadioItem value="date-asc">
                  По дате создания (сначала новые)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date-desc">
                  По дате создания (сначала старые)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comp-asc">
                  По количеству предприятий (возрастание)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comp-desc">
                  По количеству предприятий (убывание)
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
      {!isPending && sortedAndFilteredUsers.length === 0 ? (
        <p className="text-center font-medium text-2xl text-muted-foreground mt-8">
          Пользователи не найдены
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredUsers.map((user) => (
            <Card key={user.id} className="flex flex-col relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {user.login}
                </CardTitle>
                <CardDescription>
                  <p className="text-sm text-muted-foreground mb-1">
                    Создан: {" "}
                    {new Date(Date.parse(user.created_at)).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="font-semibold text-lg text-muted-foreground">
                  Предприятия: {user._count.companies}
                </p>
                <AdminEditUserDialog id={user.id} />
                <DelUserDialog id={user.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
