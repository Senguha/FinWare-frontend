import { useState, useRef } from "react";
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
import { PasswordInput } from "@/components/ui/passwordInput";
import { useAuthStore } from "@/stores/zustand";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: "Пароль должен содержать не менее 1 символа",
      })
      .max(20, { message: "Логин не должен превышать 20 символов" }),
    confirmPassword: z
      .string()
      .min(1, {
        message: "Пароль должен содержать не менее 1 символа",
      })
      .max(20, { message: "Пароль не должен превышать 20 символов" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают!",
    path: ["confirmPassword"],
  });

function PassEditForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const userId = useAuthStore((state) => state.id);

  const [isLoading, setLoading] = useState(false);
  const closeRef = useRef()
  const { toast } = useToast();

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);

    axios
      .put(
        import.meta.env.VITE_API_URL + "users/" + userId,
        {
          password: values.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast({
          title: "Ваш пароль был успешно изменён!",
        });
        console.log(res);
        closeRef.current.click()
      })
      .catch((err) =>
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: err.response?.data,
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                ></PasswordInput>
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
                <PasswordInput
                  placeholder="Password"
                  {...field}
                ></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full">
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            Изменить
          </Button>
          <DialogClose asChild>
            <Button className="sr-only" ref={closeRef}>Close</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

export { PassEditForm };
