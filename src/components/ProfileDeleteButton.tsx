import { i18n } from "#imports";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

interface ProfileDeleteButtonProps {
  onDelete: () => void;
}

const ProfileDeleteButton: React.FC<ProfileDeleteButtonProps> = ({
  onDelete,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{i18n.t("deleteConfirmation")}</AlertDialogTitle>
          <AlertDialogDescription>
            {i18n.t("deleteDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{i18n.t("deleteCancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className={buttonVariants({
              variant: "destructive",
            })}
          >
            {i18n.t("deleteConfirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileDeleteButton;
