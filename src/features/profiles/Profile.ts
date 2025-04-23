import { v4 as uuidv4 } from "uuid";

export type typeMode = "direct" | "system" | "fixed_servers" | "pac_script";

type typeScheme = "http" | "socks5";

export interface ProxyServer {
  host: string;
  scheme?: typeScheme | undefined;
  port?: number | undefined;
}

export const initProxy = (
  host: string,
  scheme?: typeScheme | undefined,
  port?: number | undefined,
): ProxyServer => ({
  host,
  scheme,
  port,
});

export interface ProxyRules {
  singleProxy?: ProxyServer | undefined;
  // proxyForHttp?: ProxyServer | undefined;
  // proxyForHttps?: ProxyServer | undefined;
  // bypassList?: string[] | undefined;
}

export interface ProxyRules {
  singleProxy?: ProxyServer | undefined;
}

export const initProxyRules = ({ singleProxy }: ProxyRules): ProxyRules => ({
  singleProxy,
});

export interface PacScript {
  url?: string | undefined;
  mandatory?: boolean | undefined;
  data?: string | undefined;
}

export const initPacScript = (
  url?: string | undefined,
  mandatory?: boolean | undefined,
  data?: string | undefined,
): PacScript => ({
  url,
  mandatory,
  data,
});

export interface ProxyConfig {
  mode: typeMode;
  rules?: ProxyRules | undefined;
  pacScript?: PacScript | undefined;
}

export const initProxyConfig = (
  mode: typeMode,
  rules?: ProxyRules,
  pacScript?: PacScript,
): ProxyConfig => ({
  mode,
  rules,
  pacScript,
});

export interface Profile {
  id: string;
  name: string;
  color: string;
  config: ProxyConfig;
}

export const initProfile = (
  name: string,
  color: string,
  config: ProxyConfig,
): Profile => {
  const id =
    config.mode === "system" || config.mode === "direct"
      ? config.mode
      : uuidv4();
  return {
    id,
    name,
    color,
    config,
  };
};

export const initProfileWithId = (
  id: string,
  name: string,
  color: string,
  config: ProxyConfig,
): Profile => {
  return {
    id,
    name,
    color,
    config,
  };
};

const SystemProfile: Profile = initProfile(
  `[${i18n.t("profileName.system")}]`,
  "#333333",
  initProxyConfig("system"),
);

const DirectProfile: Profile = initProfile(
  `[${i18n.t("profileName.direct")}]`,
  "#CCCCCC",
  initProxyConfig("direct"),
);

export const DefaultProfiles = {
  Default: SystemProfile,
  System: SystemProfile,
  Direct: DirectProfile,
  all: {
    [SystemProfile.id]: SystemProfile,
    [DirectProfile.id]: DirectProfile,
  },
};
