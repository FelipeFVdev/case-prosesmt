"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Code } from "lucide-react";
import { JsonCard } from "./json-card";

interface JsonModalProps {
  data: object;
  title?: string;
  buttonText?: string;
}

export function JsonModal({
  data,
  title = "JSON Data",
  buttonText = "Visualizar JSON Data",
}: JsonModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2"
          variant="outline"
          disabled={!Object.keys(data).length}
        >
          <Code className="h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-auto max-h-[100vh] gap-4 p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-0 items-start">
          <DialogTitle className="text-base text-muted-foreground">
            JSON
          </DialogTitle>
          <DialogDescription className="text-[12px] text-muted-foreground">
            Visualizar dados
          </DialogDescription>
        </DialogHeader>
        <div className=" overflow-auto max-h-[calc(90vh-100px)]">
          <JsonCard
            data={data}
            title={title}
            className="border-0 shadow-none lg:px-8 lg:pb-8 lg:pt-0 p-4"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
