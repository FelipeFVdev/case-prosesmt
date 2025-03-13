import { CardStatusContent } from "@/components/card-status-content";
import { CardStatusFooter } from "@/components/card-status-footer";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const CardStatusScrollArea = () => {
  return (
    <>
      <ScrollArea className="lg:h-[312px] h-72 mb-2">
        <CardContent className="grid h-full grid-cols-1 lg:grid-cols-3 gap-4 ">
          <CardStatusContent />
        </CardContent>
      </ScrollArea>
      <CardStatusFooter />
    </>
  );
};

export default CardStatusScrollArea;
