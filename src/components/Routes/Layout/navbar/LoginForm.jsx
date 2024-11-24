import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useAuthStore } from "@/stores/zustand";

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
import { PasswordInput } from "../../../ui/passwordInput";


const formSchema = z.object({
  login: z
    .string()
    .min(1, {
      message: "Логин должен содержать не менее 1 символа",
    })
    .max(20, { message: "Логин не должен превышать 20 символов" }),
  password: z.string().min(1, {
    message: "Пароль должен содержать не менее 1 символа",
  }),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  
  const [isLoading, setLoading] = useState(false)

  const { toast } = useToast();

  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true)
    axios
      .post(import.meta.env.VITE_API_URL + "users/login", {
        login: values.login,
        password: values.password,
      })
      .then((res) => {
        setUser(res.data);
        toast({
          title: "Вход в систему выполнен успешно",
          description: "Добро пожаловать, " + res.data.login,
        });
        console.log(res.data);
      })
      .catch((err) =>
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: err.response.data,
        })
      );
      setLoading(false)
  };

  return (
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field}></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full">
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            Вход
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { LoginForm };