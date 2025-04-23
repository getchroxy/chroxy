import { i18n } from "#imports";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import ProfileForm from "./forms/ProfileForm";

const NewProxyDialogTrigger: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus /> {i18n.t("addProfile")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{i18n.t("newProfile")}</DialogTitle>
          <DialogDescription>
            {i18n.t("newProfileDescription")}
          </DialogDescription>
        </DialogHeader>

        <ProfileForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NewProxyDialogTrigger;
