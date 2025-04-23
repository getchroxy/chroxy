import { i18n } from "#imports";
import NewProxyDialogTrigger from "@/components/NewProxyDialogTrigger";
import SidebarItems from "@/components/SidebarItems";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useMatch } from "react-router";
import iconUrl from "~/assets/icon.png";

const AppSidebar: React.FC = () => {
  const match = useMatch({ path: "/:path", end: false });

  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <Link to="/" className="hover:bg-gray-100">
          <div className="flex h-16 items-center gap-2 p-1">
            <div className="rounded-full border-1 border-gray-300 bg-white p-1">
              <img
                src={iconUrl}
                alt={i18n.t("chroxyIconAlt")}
                className="h-9 w-9"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-slate-900">Chroxy</h1>
              <p>v{browser.runtime.getManifest().version}</p>
            </div>
          </div>
        </Link>
        <div className="px-4 py-1 text-sm text-gray-500">
          {i18n.t("manageProxiesDesc")}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{i18n.t("proxiesLabel")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Surge">
                <SidebarMenuButton
                  asChild
                  isActive={match?.pathname === "/proxies"}
                >
                  <Link to="/proxies">
                    <div className="h-3 w-3"></div>
                    <span>{i18n.t("allProxies")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <NewProxyDialogTrigger />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{i18n.t("aboutLabel")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="About">
                <SidebarMenuButton
                  asChild
                  isActive={match?.pathname === "/about"}
                >
                  <Link to="/about">
                    <span>{i18n.t("aboutLabel")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p>{i18n.t("copyright")}</p>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
