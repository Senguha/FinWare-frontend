import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";

const baseFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Название должно содержать не менее 1 символа",
    })
    .max(40, { message: "Название не должно превышать 40 символов" }),
  phoneNumber: z.coerce
    .string()
    .min(6, {
      message: "Номер телефона должен быть меньше 6 символов",
    })
    .max(15, { message: "Номер телефона не должен превышать 15 символов" })
    .optional()
    .or(z.literal("")),
  country: z.number().int().or(z.string()).pipe(z.coerce.number().int()),
  city: z
    .string()
    .min(1, {
      message: "Название города должно содержать не менее 1 символа",
    })
    .max(20, { message: "Название города не должно превышать 20 символов" }),
  street: z
    .string()
    .min(1, {
      message: "Название улицы должно содержать не менее 1 символа",
    })
    .max(20, { message: "Название улицы не должно превышать 20 символов" }),
  building: z
    .number()
    .min(1, { message: "Номер строения должен быть больше или равен 1" })
    .max(500, { message: "Номер строения не должен превышать 500" })
    .or(z.string())
    .pipe(z.coerce.number().int().min(1).max(500)),
});
const formSchema = z.discriminatedUnion("contact", [
  baseFormSchema.extend({
    contact: z.literal(true),
    personFirstName: z
      .string()
      .min(1, {
        message: "Имя должно содержать не менее 1 символа",
      })
      .max(20, { message: "Имя не должно превышать 20 символов" }),
    personLastName: z
      .string()
      .min(1, {
        message: "Фамилия должно содержать не менее 1 символа",
      })
      .max(20, { message: "Фамилия не должно превышать 20 символов" }),
    personMiddleName: z
      .string()
      .min(1, {
        message: "Отчество должно содержать не менее 1 символа",
      })
      .max(20, { message: "Отчество не должно превышать 20 символов" })
      .optional(),
    personNumber: z.coerce
      .string()
      .min(6, {
        message: "Номер телефона должен быть меньше 6 символов",
      })
      .max(15, {
        message: "Номер телефона не должен превышать 15 символов",
      }),
    personPosition: z
      .string()
      .min(1, {
        message: "Должность должна содержать не менее 1 символа",
      })
      .max(30, { message: "Должность не должна превышать 20 символов" }),
  }),
  baseFormSchema.extend({
    contact: z.literal(false),
    personFirstName: z
      .string()
      .min(1, {
        message: "Имя должно содержать не менее 1 символа",
      })
      .max(20, { message: "Имя не должно превышать 20 символов" })
      .optional()
      .or(z.literal("")),
    personLastName: z
      .string()
      .min(1, {
        message: "Фамилия должно содержать не менее 1 символа",
      })
      .max(20, { message: "Фамилия не должно превышать 20 символов" })
      .optional()
      .or(z.literal("")),
    personMiddleName: z
      .string()
      .min(1, {
        message: "Отчество должно содержать не менее 1 символа",
      })
      .max(20, { message: "Отчество не должно превышать 20 символов" })
      .optional()
      .or(z.literal("")),
    personNumber: z.coerce
      .number()
      .int()
      .min(1000000, {
        message: "Номер телефона должен быть больше или равен 1000000",
      })
      .max(99999999999, {
        message: "Номер телефона не должен превышать 999999",
      })
      .optional()
      .or(z.literal("")),
    personPosition: z
      .string()
      .min(1, {
        message: "Должность должна содержать не менее 1 символа",
      })
      .max(30, { message: "Должность не должна превышать 20 символов" })
      .optional()
      .or(z.literal("")),
  }),
]);

function AddForm() {
  const { data: countries, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "countries"
      );
      return data;
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      phoneNumber: "",
      country: "",
      city: "",
      street: "",
      building: "",
      contact: false,
      personFirstName: "",
      personLastName: "",
      personMiddleName: "",
      personNumber: "",
      personPosition: "",
    },
  });

  const [isLoading, setLoading] = useState(false);
  const closeRef = useRef();
  const queryClient = useQueryClient();

  const{toast} = useToast();

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    axios
      .post(import.meta.env.VITE_API_URL + "companies", values, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        toast({
          title: "Предприятие успешно добавлено",
          description: "Теперь мы можете вести отчётность предприятия " + response.data.title,
        });
        queryClient.invalidateQueries("companies");
        closeRef.current.click();
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.response?.data,
        })
      }).finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="ООО Иванов" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="79991234567"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending && (
          <div className="flex justify-center">
            <LoaderCircle size={24} className="animate-spin" />
          </div>
        )}
        {!isPending && (
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Страна</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries.find(
                              (country) => country.id === field.value
                            )?.title
                          : "Выберете страну"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>Страны не найдены.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              value={country.title}
                              key={country.id}
                              onSelect={() => {
                                form.setValue("country", country.id);
                              }}
                            >
                              {country.title}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  country.title === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Город</FormLabel>
              <FormControl>
                <Input placeholder="Москва" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Улица</FormLabel>
              <FormControl>
                <Input placeholder="Ленина" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="building"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Строение</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="1"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="flex gap-4 align-middle space-y-0">
              <FormLabel>Контактное лицо</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                ></Switch>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("contact") && (
          <>
            <FormField
              control={form.control}
              name="personFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван" {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input placeholder="Иванов" {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personMiddleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input placeholder="Иванович" {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="79991234567"
                  {...field}
                  onChange={(e) =>
                    e.target.validity.valid && field.onChange(e.target.value)
                  }
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Должность</FormLabel>
                  <FormControl>
                    <Input placeholder="Секретарь" {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex w-full">
          <Button type="submit" className="ml-auto mt-4" disabled={isLoading}>
            Добавить
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

export default AddForm;
