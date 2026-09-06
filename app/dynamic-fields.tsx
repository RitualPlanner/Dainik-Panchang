"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "./contexts/language-context";

interface DynamicFieldsProps {
  fields: string[];
  onChange: (fields: string[]) => void;
}

export default function DynamicFields({
  fields,
  onChange,
}: DynamicFieldsProps) {
  const { language, t } = useLanguage();

  const addField = () => {
    onChange([...fields, ""]);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    onChange(newFields);
  };

  const updateField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    onChange(newFields);
  };

  const getPlaceholder = (index: number) => {
    if (language === "gu") {
      return `દિન મહિમા ${index + 1} દાખલ કરો`;
    }
    if (language === "hi") {
      return `दिन महिमा ${index + 1} दर्ज करें`;
    }
    return `Enter Significance ${index + 1}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">
          {t("dinMahima")}
        </h3>
        <Button
          onClick={addField}
          variant="outline"
          size="sm"
          className="gap-1.5 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          {t("addField")}
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={field}
            onChange={(e) => updateField(index, e.target.value)}
            placeholder={getPlaceholder(index)}
            className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
          />
          <Button
            onClick={() => removeField(index)}
            variant="destructive"
            size="icon"
            className="rounded-xl shrink-0 cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
