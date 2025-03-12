"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonCardProps {
  data: any;
  title?: string;
  className?: string;
}

export function JsonCard({
  data,
  title = "JSON Data",
  className,
}: JsonCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderValue = (value: any, path = "", indent = 0) => {
    const indentSize = 16;
    const paddingLeft = indent * indentSize;

    if (value === null) {
      return <span className="text-gray-400">null</span>;
    }

    if (typeof value === "boolean") {
      return <span className="text-yellow-500">{value.toString()}</span>;
    }

    if (typeof value === "number") {
      return <span className="text-blue-500">{value}</span>;
    }

    if (typeof value === "string") {
      return <span className="text-green-500">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-gray-400">[]</span>;
      }

      const hasComplexItems = value.some(
        (item) => typeof item === "object" && item !== null
      );

      if (!hasComplexItems && value.length < 5) {
        return (
          <span className="text-gray-400">
            [
            {value.map((item, i) => (
              <span key={i}>
                {renderValue(item, `${path}.${i}`, 0)}
                {i < value.length - 1 && ", "}
              </span>
            ))}
            ]
          </span>
        );
      }

      return (
        <pre>
          <span className="text-gray-400">[</span>
          <div className="ml-4">
            {value.map((item, i) => (
              <div key={i} style={{ paddingLeft }}>
                {renderValue(item, `${path}.${i}`, indent + 1)}
                {i < value.length - 1 && (
                  <span className="text-gray-400">,</span>
                )}
              </div>
            ))}
          </div>
          <span className="text-gray-400">]</span>
        </pre>
      );
    }

    if (typeof value === "object") {
      const keys = Object.keys(value);

      if (keys.length === 0) {
        return <span className="text-gray-400">{"{}"}</span>;
      }

      return (
        <pre>
          <span className="text-gray-400">{"{"}</span>
          <div className="ml-4">
            {keys.map((key, i) => (
              <div key={key} style={{ paddingLeft }}>
                <span className="text-purple-500">"{key}"</span>
                <span className="text-gray-400">: </span>
                {renderValue(value[key], `${path}.${key}`, indent + 1)}
                {i < keys.length - 1 && (
                  <span className="text-gray-400">,</span>
                )}
              </div>
            ))}
          </div>
          <span className="text-gray-400">{"}"}</span>
        </pre>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <Card className={cn("border gap-0 ", className)}>
      <CardHeader className="bg-muted rounded-t-lg flex flex-row items-center justify-between pt-3">
        <CardTitle className="text-lg font-medium">View JSON Data</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-4 rounded-t-lg bg-muted font-mono text-sm overflow-auto max-h-[600px]">
        {renderValue(data, "root")}
      </CardContent>
    </Card>
  );
}
