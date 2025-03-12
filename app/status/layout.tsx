import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-4 px-8 flex items-center justify-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Status Atual da COVID 19</CardTitle>
          <CardDescription>
            Consulta onde podemos visualizar o status atual da COVID 19 de todos
            os estados da federação ou de apenas um estado
          </CardDescription>
        </CardHeader>

        {children}
      </Card>
    </div>
  );
}
