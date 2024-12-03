import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import moment from "moment";
import ru from "date-fns/locale/ru";

const FormSchema = z.object({
  date: z.coerce.date(),
  param1: z.coerce.number().int().positive(),
  param2: z.coerce.number().int().positive(),
  param3: z.coerce.number().int().positive(),
  param4: z.coerce.number().int().positive(),
  param5: z.coerce.number().int().positive(),
  param6: z.coerce.number().int().positive(),
  param7: z.coerce.number().int().positive(),
  param8: z.coerce.number().int().positive(),
  param9: z.coerce.number().int().positive(),
  param10: z.coerce.number().int().positive(),
  param11: z.coerce.number().int().positive(),
  param12: z.coerce.number().int().positive(),
  param13: z.coerce.number().int().positive(),
  param14: z.coerce.number().int().positive(),
  param15: z.coerce.number().int().positive(),
  param16: z.coerce.number().int().positive(),
});

function ReportEditForm({ compId, listId, data, date }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
      date: date,
      param1: data[0].param_value,
      param2: data[1].param_value,
      param3: data[2].param_value,
      param4: data[3].param_value,
      param5: data[4].param_value,
      param6: data[5].param_value,
      param7: data[6].param_value,
      param8: data[7].param_value,
      param9: data[8].param_value,
      param10: data[9].param_value,
      param11: data[10].param_value,
      param12: data[11].param_value,
      param13: data[12].param_value,
      param14: data[13].param_value,
      param15: data[14].param_value,
      param16: data[15].param_value,
    },
  });
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);
  const closeRef = useRef();
  const queryClient = useQueryClient();

  function onSubmit(values) {
    console.log(values);
    setLoading(true);
    let dateUTC=moment(values.date).utc(true).format()     
    console.log(dateUTC);
    const dataArr = {data:[
      {
        company_id: compId,
        date: dateUTC,
      },
      {
        param_id: "100",
        param_value: values.param1,
      },

      {
        param_id: "101",
        param_value: values.param2,
      },
      {
        param_id: "102",
        param_value: values.param3,
      },
      {
        param_id: "103",
        param_value: values.param4,
      },
      {
        param_id: "104",
        param_value: values.param5,
      },
      {
        param_id: "105",
        param_value: values.param6,
      },
      {
        param_id: "106",
        param_value: values.param7,
      },
      {
        param_id: "107",
        param_value: values.param8,
      },
      {
        param_id: "108",
        param_value: values.param9,
      },
      {
        param_id: "109",
        param_value: values.param10,
      },
      {
        param_id: "110",
        param_value: values.param11,
      },
      {
        param_id: "111",
        param_value: values.param12,
      },
      {
        param_id: "112",
        param_value: values.param13,
      },
      {
        param_id: "113",
        param_value: values.param14,
      },
      {
        param_id: "114",
        param_value: values.param15,
      },
      {
        param_id: "115",
        param_value: values.param16,
      },
    ]};
    console.log(dataArr);
    axios
      .put(import.meta.env.VITE_API_URL + "reports/lists/"+ listId, dataArr, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        toast({
          title: "Отчёт успешно изменён",
        });
        queryClient.invalidateQueries({
          queryKey: ["company", compId, "report_list"],
        });
        queryClient.invalidateQueries({
          queryKey: ["companies", "user"],
        });
        closeRef.current.click();
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.response?.data,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "d MMMM y", { locale: ru })
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    timeZone="UTC"
                    locale={ru}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Внеоборотные Активы</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Основные средства</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Незавершенное Строительство</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Долгосрочные Финансовые Вложения</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отложенные Налоговые Активы</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param6"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Оборотные активы</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param7"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Запасы</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param8"
          render={({ field }) => (
            <FormItem>
              <FormLabel>НДС</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param9"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дебиторская задолженность</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param10"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Краткосрочные Финансовые Вложения</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param11"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Денежные Средства</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param12"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Собственный Капитал</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param13"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Долгосрочные Обязательства</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param14"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заемные Средства</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param15"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Кредиторская Задолженность</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="param16"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Резервы Предстоящих Расходов</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full">
          <Button type="submit" className="ml-auto mt-4" disabled={isLoading}>
            Изменить
          </Button>
          <DialogClose asChild>
            <Button className="sr-only" ref={closeRef}>
              Close
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

export default ReportEditForm;
