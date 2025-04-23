import { z } from "zod";

const ModeEnum = z.enum(["fixed_servers", "pac_script"]);

const ProxySchemeEnum = z.enum(["http", "socks5"]);

const FixedServersSchema = z.object({
  mode: z.literal(ModeEnum.Values.fixed_servers),
  rules: z.object({
    singleProxy: z.object({
      scheme: ProxySchemeEnum,
      host: z.string().min(1, i18n.t("error.hostRequired")),
      port: z.number().int().min(1).max(65535),
    }),
  }),
});

const PacScriptSchema = z.object({
  mode: z.literal(ModeEnum.Values.pac_script),
  pacScript: z.object({
    url: z.union([z.string().url(), z.string().length(0)]).optional(),
    mandatory: z.boolean().optional(),
    data: z.string().optional(),
  }),
});

const modeDiscriminatorSchema = z.discriminatedUnion("mode", [
  FixedServersSchema,
  PacScriptSchema,
]);

const FormSchema = z
  .object({
    name: z.string().min(1, i18n.t("error.nameRequired")),
    color: z.string(),
  })
  .and(modeDiscriminatorSchema);

export { FormSchema, ModeEnum, ProxySchemeEnum };
