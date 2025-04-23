import { i18n } from "#imports";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import ActivateProfileButton from "@/components/ActivateProfileButton";
import EditProfileNameButton from "@/components/EditProfileNameButton";
import ProfileForm from "@/components/forms/ProfileForm";
import ProfileColorDot from "@/components/ProfileColorDot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadProfiles, selectProfile } from "@/features/profiles/profilesSlice";
import { setTitle } from "@/lib/utils";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  protocol: z.enum(["http", "socks5"]),
  host: z.string().min(1, "Host is required"),
  port: z.number().int().min(1).max(65535),
  color: z.string(),
});

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>{i18n.t("error.proxyIdMissing")}</div>;
  }
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state: RootState) =>
    selectProfile(state, id),
  );

  useEffect(() => {
    setTitle(i18n.t("profiles.pageTitle", [profile?.name]));
  }, [profile]);

  useEffect(() => {
    dispatch(loadProfiles());
  }, [dispatch]);

  if (!profile) {
    // TODO handle error message correctly
    // TODO add error page
    return <div>{i18n.t("error.proxyNotExist")}</div>;
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <ProfileColorDot color={profile.color} size={6} />
            <span className="text-2xl">{profile.name}</span>
            <EditProfileNameButton profile={profile} />
            {import.meta.env.MODE === "development" && (
              <ActivateProfileButton profile={profile} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
