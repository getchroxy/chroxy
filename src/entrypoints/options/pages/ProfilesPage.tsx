import { i18n } from "#imports";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  initProfile,
  initProxy,
  initProxyConfig,
  initProxyRules,
  Profile,
} from "@/features/profiles/Profile";
import {
  loadProfiles,
  selectProfiles,
  setProfile,
} from "@/features/profiles/profilesSlice";
import { setTitle } from "@/lib/utils";
import randomColor from "randomcolor";
import React, { useEffect } from "react";

const Profiles: React.FC = () => {
  const dispatch = useAppDispatch();

  const profiles = useAppSelector(selectProfiles);

  useEffect(() => {
    setTitle(i18n.t("profiles.title"));
  }, []);

  useEffect(() => {
    dispatch(loadProfiles());
  }, []);

  const handleAddProfile = () => {
    const profile: Profile = initProfile(
      i18n.t("profiles.newProfile"),
      randomColor({ luminosity: "dark", format: "hex" }),
      initProxyConfig(
        "fixed_servers",
        initProxyRules({ singleProxy: initProxy("localhost", "http", 7890) }),
      ),
    );
    dispatch(setProfile(profile));
  };

  return (
    <div className="container mx-auto space-y-8 py-6">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            {i18n.t("profiles.listTitle", Object.keys(profiles).length)}
          </CardTitle>
          <CardDescription>
            <Button className="mt-3" onClick={handleAddProfile}>
              {i18n.t("addProfile")}
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-1 text-base">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profiles).map(([id, profile]) => (
              <Card key={id}>
                <CardContent>
                  <CardDescription>
                    <div className="space-y-2 overflow-clip whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <ProfileColorDot color={profile.color} size={3} />
                        <span className="leading-none font-medium">
                          {profile.name}
                        </span>
                      </div>
                      {profile.config.mode === "fixed_servers" && (
                        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                          {profile.config.rules?.singleProxy?.scheme}://
                          {profile.config.rules?.singleProxy?.host}:
                          {profile.config.rules?.singleProxy?.port}
                        </code>
                      )}
                      {profile.config.mode === "pac_script" && (
                        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                          {profile.config.pacScript?.data
                            ? profile.config.pacScript.data.slice(0, 40)
                            : profile.config.pacScript?.url}
                        </code>
                      )}
                    </div>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
