import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-4 px-8 flex items-center justify-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Status Atual</CardTitle>
          <CardDescription>
            Consulta onde podemos visualizar o status atual de todos os estados
            da federação ou de apenas um estado
          </CardDescription>
        </CardHeader>

        {children}
      </Card>
    </div>
  );
}
