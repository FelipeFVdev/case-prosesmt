"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JsonModal } from "@/components/json.modal";
import { useState } from "react";

const formSchema = z.object({
  stateBrazil: z.string().min(2),
  cases: z.coerce.number().nonnegative().safe(),
  confirmed: z.coerce.number().nonnegative().safe(),
  deaths: z.coerce.number().nonnegative().safe(),
  recoverd: z.coerce.number().nonnegative().safe(),
  createdAt: z.any(),
  updatedAt: z.any(),
});

const StatusForm = () => {
  const [jsonData, setJsonData] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stateBrazil: "",
      cases: 0,
      confirmed: 0,
      deaths: 0,
      recoverd: 0,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setJsonData({
      uid: "99",
      uf: "xx",
      state: values.stateBrazil,
      cases: values.cases,
      confirmed: values.confirmed,
      death: values.deaths,
      recoverd: values.recoverd,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
    });

    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="grid lg:grid-cols-2 col-span-2 gap-6">
              <FormField
                control={form.control}
                name="stateBrazil"
                render={({ field }) => (
                  <FormItem className="w-auto">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do Estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cases"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Casos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a quantidade de casos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmados</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a quantidade de confirmados"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deaths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mortes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a quantidade de mortes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recoverd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recuperados</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a quantidade de recuperados"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Criado
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="updatedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Atualizado
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="lg:flex grid items-center gap-2">
            <Button type="submit">Enviar</Button>
            <JsonModal data={jsonData} title="User Profile" />
          </CardFooter>
        </form>
      </Form>
    </>
  );
};

export default StatusForm;
