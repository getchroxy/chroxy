import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProxyItem from "@/components/ProxyItem";
import { DefaultProfiles } from "@/features/profiles/Profile";
import {
  loadProfiles,
  selectActivedProfile,
  selectProfiles,
  setActiveProfile,
} from "@/features/profiles/profilesSlice";
import { CogIcon, EarthIcon } from "lucide-react";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  // const proxies = useAppSelector(selectProxies);
  // const settings = useAppSelector(selectSettings);
  const profiles = useAppSelector(selectProfiles);
  const activeProfile = useAppSelector(selectActivedProfile);

  useEffect(() => {
    dispatch(loadProfiles());
  }, [dispatch]);

  const handleActiveProfile = (id: string) => {
    dispatch(setActiveProfile(id));
    setInterval(() => {
      window.close();
    }, 80);
  };

  return (
    <ul className="flex w-[200px] flex-col space-y-1 p-1 text-base">
      {Object.entries(DefaultProfiles.all).map(([id, profile]) => (
        <ProxyItem
          key={id}
          title={profile.name}
          indicator={activeProfile.id === profile.id}
          onClick={() => handleActiveProfile(profile.id)}
        >
          <>
            <EarthIcon
              size={16}
              className="flex-none"
              style={{
                color: profile.color,
              }}
            />
            <span className="overflow-hidden text-ellipsis">
              {profile.name}
            </span>
          </>
        </ProxyItem>
      ))}
      <hr />
      {Object.entries(profiles).map(([id, profile]) => (
        <ProxyItem
          key={id}
          title={profile.name}
          indicator={activeProfile.id === profile.id}
          onClick={() => handleActiveProfile(profile.id)}
        >
          <>
            <EarthIcon
              size={16}
              className="flex-none"
              style={{
                color: profile.color,
              }}
            />
            <span className="overflow-hidden text-ellipsis">
              {profile.name}
            </span>
          </>
        </ProxyItem>
      ))}
      <hr />
      <ProxyItem
        title={i18n.t("popup.options")}
        onClick={() => chrome.runtime.openOptionsPage()}
      >
        <>
          <CogIcon size={16} className="flex-none" />
          <span className="overflow-hidden text-ellipsis">
            {i18n.t("popup.options")}
          </span>
        </>
      </ProxyItem>
    </ul>
  );
}

export default App;
