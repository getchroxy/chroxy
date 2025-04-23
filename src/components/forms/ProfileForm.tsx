import { i18n } from "#imports";
import { useAppDispatch } from "@/app/hooks";
import ColorPicker from "@/components/ColorPicker";
import ProfileDeleteButton from "@/components/ProfileDeleteButton";
import FixedServerForm from "@/components/forms/FixedServerForm";
import PACScriptForm from "@/components/forms/PACScriptForm";
import { FormSchema, ModeEnum } from "@/components/forms/ProfileFormSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  initPacScript,
  initProfile,
  initProfileWithId,
  initProxy,
  initProxyConfig,
  initProxyRules,
  Profile,
} from "@/features/profiles/Profile";
import { deleteProfile, setProfile } from "@/features/profiles/profilesSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import randomColor from "randomcolor";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

interface ProfileFormProps {
  profile?: Profile;
  onSuccess?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSuccess }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profile?.name ?? "",
      color:
        profile?.color ?? randomColor({ luminosity: "dark", format: "hex" }),
      ...(profile?.config.mode === "fixed_servers"
        ? {
            mode: "fixed_servers",
            rules: profile.config.rules,
          }
        : {}),
      ...(profile?.config.mode === "pac_script"
        ? {
            mode: "pac_script",
            pacScript: profile.config.pacScript,
          }
        : {}),
    },
  });

  // Add formState to track if the form is dirty (has been modified)
  const { isDirty } = form.formState;

  useEffect(() => {
    switch (profile?.config.mode) {
      case "fixed_servers":
        form.reset({
          name: profile?.name ?? "",
          color:
            profile?.color ??
            randomColor({ luminosity: "dark", format: "hex" }),
          mode: "fixed_servers",
          rules: profile.config.rules,
        });
        break;
      case "pac_script":
        form.reset({
          name: profile?.name ?? "",
          color:
            profile?.color ??
            randomColor({ luminosity: "dark", format: "hex" }),
          mode: "pac_script",
          pacScript: profile.config.pacScript,
        });
        break;
    }
  }, [form, profile]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("data onSubmit", data);
    let config;
    switch (data.mode) {
      case "fixed_servers":
        config = initProxyConfig(
          data.mode,
          initProxyRules({
            singleProxy: initProxy(
              data.rules.singleProxy.host,
              data.rules.singleProxy.scheme,
              data.rules.singleProxy.port,
            ),
          }),
        );
        break;
      case "pac_script":
        config = initProxyConfig(
          data.mode,
          undefined,
          initPacScript(data.pacScript.url, undefined, data.pacScript.data),
        );
        break;
      default:
        break;
    }
    console.log("config", config);
    if (config) {
      let _profile;
      if (profile) {
        _profile = initProfileWithId(profile.id, data.name, data.color, config);
      } else {
        _profile = initProfile(data.name, data.color, config);
      }
      console.log("profile", _profile);
      dispatch(setProfile(_profile));
      if (onSuccess) {
        onSuccess();
        setTimeout(() => {
          form.reset();
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    if (profile) {
      dispatch(deleteProfile(profile.id));
      navigate("/proxies");
    }
  };

  //   return <></>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        {!profile && (
          <div className="flex max-w-md gap-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{i18n.t("label.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={i18n.t("placeholder.profileName")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="color"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>{i18n.t("label.color")}</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex w-full justify-center">
                          <div
                            className="h-6 w-6 cursor-pointer rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: form.watch("color") }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full border-0 border-none p-0">
                        <ColorPicker
                          color={form.watch("color")}
                          onChange={(color) => {
                            form.setValue("color", color);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        <Separator className="" />

        <FormField
          name="mode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i18n.t("label.mode")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={i18n.t("placeholder.mode")} />
                  </SelectTrigger>
                  <SelectContent>
                    {ModeEnum.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {i18n.t(`mode.${opt}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("mode") === "fixed_servers" && (
          <FixedServerForm form={form} />
        )}
        {form.watch("mode") === "pac_script" && <PACScriptForm form={form} />}

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={profile && !isDirty}>
            {profile ? i18n.t("saveChanges") : i18n.t("createProfile")}
          </Button>

          {profile && <ProfileDeleteButton onDelete={handleDelete} />}
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
