import { FormSchema } from "@/components/forms/ProfileFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface PACScriptFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const PACScriptForm: React.FC<PACScriptFormProps> = ({
  form,
}: PACScriptFormProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <FormField
        name="pacScript.url"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{i18n.t("label.pacScriptUrl")}</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ""} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="pacScript.data"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{i18n.t("label.pacScript")}</FormLabel>
            <FormControl>
              <Textarea className="h-40" {...field} value={field.value ?? ""} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PACScriptForm;
