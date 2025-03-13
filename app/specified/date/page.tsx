import { CardStatusContent } from "@/components/card-status-content";
import { CardContent } from "@/components/ui/card";
import { CardStatusFooter } from "@/components/card-status-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const DateSpecified = () => {
  return (
    <>
      <ScrollArea className="lg:h-[450px] h-80">
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          <CardStatusContent />
        </CardContent>
      </ScrollArea>

      <CardStatusFooter />
    </>
  );
};

export default DateSpecified;
