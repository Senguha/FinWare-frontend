import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle, Building2 } from "lucide-react";

// const companies = [
//     { name: "ТехноПром", profit: "150 млн ₽" },
//     { name: "АгроХолдинг", profit: "80 млн ₽" },
//     { name: "СтройГигант", profit: "200 млн ₽" },
//     { name: "ЭнергоСеть", profit: "120 млн ₽" },
//     { name: "ФармаПлюс", profit: "90 млн ₽" },
// ]

function CompanyCarousel() {
  const { data: companies, isPending } = useQuery({
    queryKey: ["companies", "brief"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "companies",
        {
          params: {
            brief: true,
          },
        }
      );
      return data;
    },
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8 text-center">Нам доверяют</h3>
        {isPending && (
          <div className="flex justify-center">
            <LoaderCircle size={64} className="animate-spin" />
          </div>
        )}

        {!isPending && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {companies.map((company, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card key={company.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="line-clamp-1">
                            {company.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {company.city}, {company.countries.title}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="mr-2" />
              <CarouselNext />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default CompanyCarousel;
