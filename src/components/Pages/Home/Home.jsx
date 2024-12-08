import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart, TableProperties, TrendingUp } from 'lucide-react'
import CompanyCarousel from "./CompanyCarousel"

export default function HomePage() {
  


  return (
      <>  
      <main className="flex-grow min-h-[calc(100dvh-82px)]">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Финансовая отчетность для вашего бизнеса</h2>
          <p className="text-xl mb-8">Простой и эффективный способ анализировать и представлять финансовые показатели вашего предприятия</p>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Ключевые возможности</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Финансовые отчеты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Создавайте подробные финансовые отчеты с легкостью</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-4 w-4" />
                  Визуализация данных
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Представляйте данные в виде понятных графиков и диаграмм</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Анализ трендов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Отслеживайте тенденции и прогнозируйте будущие показатели</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TableProperties className="mr-2 h-4 w-4" />
                  Экспорт данных
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Выводите данные из отчётов в формат CSV или Excel</p> 
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <CompanyCarousel />
    </main>
    </>
  )
}