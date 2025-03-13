import { CardStatusContent } from "@/components/card-status-content";
import { CardContent } from "@/components/ui/card";
import { CardStatusFooter } from "@/components/card-status-footer";

const SpecifiedStatus = () => {
  return (
    <>
      <CardContent className="flex items-center justify-center lg:h-[312px] ">
        <CardStatusContent />
      </CardContent>
      <CardStatusFooter />
    </>
  );
};

export default SpecifiedStatus;
