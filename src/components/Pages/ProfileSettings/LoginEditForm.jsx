import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useAuthStore } from "@/stores/zustand";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  login: z
    .string()
    .min(1, {
      message: "Логин должен содержать не менее 1 символа",
    })
    .max(20, { message: "Логин не должен превышать 20 символов" }),
});

function LoginEditForm() {
  
  const closeRef = useRef()
  
  const {toast} = useToast();
  
  const userLogin  = useAuthStore((state) => state.login);
  const userId  = useAuthStore((state) => state.id);
  const setUser  = useAuthStore((state) => state.setUser);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: userLogin,
    },
  });

 
  const [isLoading, setLoading] = useState(false);


  const onSubmit = (values) =>{
    setLoading(true);
    axios.put(import.meta.env.VITE_API_URL + "users/"+userId,{
      login: values.login,
    },{withCredentials: true})
    .then((res) => {
      setUser(res.data)
      toast({
        title: "Изменение логина успешно",
        description: "Добро пожаловать, " + res.data.login,
      });
      console.log(res);
      closeRef.current.click()
    })
    .catch((err) => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: err.response?.data,
      })
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }

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
                <Input placeholder="user" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full pt-4">
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

export default LoginEditForm;
