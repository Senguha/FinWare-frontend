import React, { useState } from "react";
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

const formSchema = z
  .object({
    login: z
      .string()
      .min(1, {
        message: "Логин должен содержать не менее 1 символа",
      })
      .max(20, { message: "Логин не должен превышать 20 символов" }),
    password: z.string().min(1, {
      message: "Пароль должен содержать не менее 1 символа",
    }),
    confirmPassword: z.string().min(1, {
      message: "Пароль должен содержать не менее 1 символа",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают!",
    path: ["confirmPassword"],
  });

function RegistrationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async (values) => {
    setLoading(true)
    console.log(values);
    
    axios
      .post(import.meta.env.VITE_API_URL + "users/register", {
        login: values.login,
        password: values.password,
      })
      .then((res) => {
        toast({
          title: "Ваш аккаунт был успешно создан!",
          description: "Добро пожаловать, " + res.data.login,
        });
        console.log(res);
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
                <Input placeholder="Password" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повтор пароля</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full">
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            Создать аккаунт
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { RegistrationForm };

