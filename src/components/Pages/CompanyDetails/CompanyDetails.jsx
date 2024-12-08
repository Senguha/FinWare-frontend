import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Phone, MapPin, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReportTable from "./ReportTable";
import { Separator } from "../../ui/separator";
import { CompanyChart } from "./CompanyChart";

// const companyData = {
//   "id": "1",
//   "title": "ОАО \"Рога и копыта\"",
//   "phone_number": "7914141152",
//   "city": "Тюмень",
//   "street": "Ленина",
//   "building": "14",
//   "countries": {
//     "title": "Россия"
//   },
//   "contact_persons": {
//     "first_name": "Кирилл",
//     "last_name": "Васильев",
//     "middle_name": "Даниилович",
//     "phone_number": "7784142108525",
//     "position": "Начальник Отдела кадров"
//   }
// }

function CompanyDetailsPage() {
  const id = useParams().id;

  const { data: companyData, isPending } = useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "companies/" + id
      );
      return data;
    },
  });

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
    <>
      {isPending && (
        <div className="flex justify-center">
          <LoaderCircle
            size={64}
            className="animate-spin py-10 min-h-[calc(100dvh-82px)]"
          />
        </div>
      )}

      {!isPending && (
        <div className="container mx-auto py-10 min-h-[calc(100dvh-82px)]">
          <h1 className="text-3xl font-bold mb-6"></h1>
          <div className="rounded-lg border bg-card text-card-foreground shadow-md p-6 mb-12 flex flex-col gap-6">
            <div>
            <h1 className="text-3xl font-bold mb-2 ">Информация о компании</h1>
          <p className="text-muted-foreground">
          Просматривайте информацию о предприятии, её отчётность и контактные лица
          </p>
        <Separator className="mt-4 mb-0" />
          </div>
            <Card >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {companyData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  {companyData.phone_number && (
                    <div>
                    <dt className="font-semibold">Телефон:</dt>
                    <dd className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <a
                        href={`tel:+${companyData.phone_number}`}
                        className="hover:underline"
                      >
                        +{companyData.phone_number}
                      </a>
                    </dd>
                  </div>
                  )}
                  <div>
                    <dt className="font-semibold">Адрес:</dt>
                    <dd className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {companyData.countries.title}, г. {companyData.city}, ул.{" "}
                      {companyData.street}, д. {companyData.building}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            {companyData.contact_persons[0] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Контактное лицо
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {companyData.contact_persons[0] && (
                    <dl className="space-y-2">
                      <div>
                        <dt className="font-semibold">ФИО:</dt>
                        <dd>
                          {companyData.contact_persons[0].last_name}{" "}
                          {companyData.contact_persons[0].first_name}{" "}
                          {companyData.contact_persons[0].middle_name}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Должность:</dt>
                        <dd>{companyData.contact_persons[0].position}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Телефон:</dt>
                        <dd className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <a
                            href={`tel:+${companyData.contact_persons[0].phone_number}`}
                            className="hover:underline"
                          >
                            +{companyData.contact_persons[0].phone_number}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          
          <div className="rounded-lg border bg-card text-card-foreground shadow-md p-6 mb-12 flex flex-col gap-6">
          
          <h1 className="text-3xl font-bold">Финансовая отчётность</h1>
          <Separator />
          <CompanyChart compId={id}/>  
          
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
                  <Accordion key={report.id} type="multiple">
                    <AccordionItem
                      value={"item" + report.id}
                      className="rounded-md border shadow-sm px-6"
                    >
                      <AccordionTrigger>
                        <span className="text-lg text-">
                          Отчёт от:
                          {" " +
                            new Date(
                              Date.parse(report.created_at)
                            ).toLocaleDateString(undefined, {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ReportTable ListId={report.id} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyDetailsPage;
