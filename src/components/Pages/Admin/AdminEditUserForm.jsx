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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSchema = z.object({
  login: z
    .string()
    .min(1, {
      message: "Логин должен содержать не менее 1 символа",
    })
    .max(20, { message: "Логин не должен превышать 20 символов" }),
  password: z
    .string()
    .max(20, { message: "Логин не должен превышать 20 символов" }).optional(),
  admin: z.string(),
});

function AdminEditUserForm({ user }) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      login: user?.login || "",
      password:  "",
      admin: user?.is_admin.toString() || "false",
    },
  });

  const [isLoading, setLoading] = useState(false);
  const closeRef = useRef();

  const { toast } = useToast();

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    let sendData;
    if (values.password === "") {
      sendData = {login: values.login, is_admin: values.admin };
    } else {
      sendData = {login: values.login, password: values.password, is_admin: values.admin };
    }
    axios
      .put(import.meta.env.VITE_API_URL + "users/" + user.id, sendData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Пользователь успешно обновлен",
        });
        queryClient.invalidateQueries("users");
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
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="User" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Новый пароль</FormLabel>
                
                <FormControl>
                  <Input placeholder="Password" {...field}></Input>
                </FormControl>
                <FormDescription>Если не заполните, то пароль не изменится</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберете роль" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="false">Пользователь</SelectItem>
                    <SelectItem value="true">Администратор</SelectItem>
                  </SelectContent>
                </Select>
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
    </>
  );
}

export default AdminEditUserForm;
