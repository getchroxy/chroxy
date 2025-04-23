import { i18n } from "#imports";
import { FormSchema } from "@/components/forms/ProfileFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface FixedServerFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const FixedServerForm: React.FC<FixedServerFormProps> = ({ form }) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex gap-3">
        <FormField
          name="rules.singleProxy.scheme"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-28">
              <FormLabel>{i18n.t("label.protocol")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={i18n.t("placeholder.selectProtocol")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http">
                      {i18n.t("protocol.http")}
                    </SelectItem>
                    <SelectItem value="socks5">
                      {i18n.t("protocol.socks5")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rules.singleProxy.host"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{i18n.t("label.host")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={i18n.t("placeholder.host")}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rules.singleProxy.port"
          render={({ field }) => (
            <FormItem className="w-24">
              <FormLabel>{i18n.t("label.port")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={i18n.t("placeholder.port")}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      field.onChange("");
                    } else if (/^[0-9]+$/g.test(value)) {
                      field.onChange(parseInt(value, 10));
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FixedServerForm;
