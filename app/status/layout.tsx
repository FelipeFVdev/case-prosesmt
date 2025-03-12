import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusForm from "./components/status-form";

export default function StatusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-4 px-8 flex flex-col lg:grid lg:grid-cols-2 items-start justify-center gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Status Atual da COVID 19</CardTitle>
          <CardDescription>
            Consulta para visualizar o status atual da COVID-19: por estado,
            data específica ou globalmente.
          </CardDescription>
        </CardHeader>

        {children}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Envie o status atual da COVID-19 no estado</CardTitle>
          <CardDescription>
            Forneça o relatório atualizado sobre a situação do estado em relação
            à COVID-19.
          </CardDescription>
        </CardHeader>
        <StatusForm />
      </Card>
    </div>
  );
}
