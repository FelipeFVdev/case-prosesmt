import CardStatusScrollArea from "@/components/card-status-scrollarea";
import StatusForm from "@/components/status-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatesProvider } from "./context/states-context";

export default function Status() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Status Atual da COVID 19</CardTitle>
          <CardDescription>
            Consulta para visualizar o status atual da COVID-19: por estado,
            data específica ou globalmente.
          </CardDescription>
        </CardHeader>
        <StatesProvider>
          <CardStatusScrollArea />
        </StatesProvider>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Envie o status atual da COVID-19 no estado</CardTitle>
          <CardDescription>
            Forneça o relatório atualizado sobre a situação do estado em relação
            à COVID-19.
          </CardDescription>
        </CardHeader>
        <StatusForm />
      </Card>
    </>
  );
}
