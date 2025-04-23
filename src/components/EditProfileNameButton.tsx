import { i18n } from "#imports";
import { useAppDispatch } from "@/app/hooks";
import ColorPicker from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Profile } from "@/features/profiles/Profile";
import { setProfile } from "@/features/profiles/profilesSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditProfileNameButtonProps {
  profile: Profile;
}

const formSchema = z.object({
  name: z.string().min(1, i18n.t("error.nameRequired")),
  color: z.string(),
});

const EditProfileNameButton: React.FC<EditProfileNameButtonProps> = ({
  profile,
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      color: profile.color,
    },
  });

  // Reset the form when the dialog opens or closes
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        color: profile.color,
      });
    }
  }, [profile, open, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedProfile = {
      ...profile,
      name: data.name.trim(),
      color: data.color,
    };
    dispatch(setProfile(updatedProfile)).then(() => {});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>{i18n.t("editProfileName")}</DialogTitle>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-3">
              <FormField
                name="color"
                control={form.control}
                render={() => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder={i18n.t("placeholder.profileName")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">{i18n.t("saveChanges")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileNameButton;
