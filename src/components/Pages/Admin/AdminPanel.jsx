import { Separator } from "../../ui/separator";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Building2, User } from "lucide-react";
import { Link } from "react-router-dom";

function AdminPanelPage() {
  return (
    <div className="md:max-w-3xl max-w-full mx-auto py-10 min-h-[calc(100dvh-82px)]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-md p-6 mb-12 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 ">Панель администратора</h1>
          <p className="text-muted-foreground">
            Выберите опции администрирования
          </p>
          <Separator className="mt-4 mb-0" />
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Link to="/admin/users" className="w-full">
          <Card >
            <CardHeader>
              <h2 className="text-xl font-bold text-center">Пользователи</h2>
            </CardHeader>
            <CardContent>
              <User color="#64748b" size={64} className="mx-auto" />
            </CardContent>
          </Card>
          </Link>
          <Link to="/admin/companies" className="w-full">
          <Card >
            <CardHeader>
              <h2 className="text-xl font-bold text-center">Предприятия</h2>
            </CardHeader>
            <CardContent>
              <Building2 color="#64748b" size={64} className="mx-auto" />
            </CardContent>
          </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelPage;
