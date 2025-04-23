import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Profile } from "@/features/profiles/Profile";
import { setActiveProfile } from "@/features/profiles/profilesSlice";
import { Check } from "lucide-react";
import React from "react";

interface ActivateProfileButtonProps {
  profile: Profile;
}

const ActivateProfileButton: React.FC<ActivateProfileButtonProps> = ({
  profile,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(setActiveProfile(profile.id))}>
      <Check />
    </Button>
  );
};

export default ActivateProfileButton;
