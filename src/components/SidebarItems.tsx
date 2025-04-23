import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProfileColorDot from "@/components/ProfileColorDot";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  loadProfiles,
  selectProfiles,
} from "@/features/profiles/profilesSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

const SidebarItems: React.FC = () => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles);
  const { id: paramId } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(loadProfiles());
  }, []);

  return (
    <>
      {Object.entries(profiles).map(([_, profile]) => (
        <SidebarMenuItem key={profile.id}>
          <SidebarMenuButton asChild isActive={paramId === profile.id}>
            <Link to={`/proxy/${profile.id}`}>
              <ProfileColorDot color={profile.color} size={3} />
              <span>{profile.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default SidebarItems;
