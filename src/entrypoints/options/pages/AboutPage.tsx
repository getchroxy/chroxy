import { i18n } from "#imports";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setTitle } from "@/lib/utils";
import React, { useEffect } from "react";
import iconUrl from "~/assets/icon.png";

const AboutPage: React.FC = () => {
  useEffect(() => {
    setTitle(i18n.t("aboutTitle"));
  }, []);

  return (
    <div className="container mx-auto space-y-8 py-6">
      {/* 顶部标题卡片 */}
      <Card className="mx-auto max-w-3xl overflow-hidden p-0">
        <div className="from-primary/20 to-secondary/20 flex items-center justify-between bg-gradient-to-r p-6">
          <div className="flex items-center gap-4">
            <div className="bg-background rounded-full p-2 shadow-md">
              <img
                src={iconUrl}
                alt={i18n.t("chroxyLogo")}
                className="h-12 w-12"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Chroxy</h1>
              <p className="text-muted-foreground text-sm">
                {i18n.t("chromeProxyManager")}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Button
              variant="outline"
              className="border-primary/30 bg-background/80"
            >
              {i18n.t("version")} {browser.runtime.getManifest().version}
            </Button>
          </div>
        </div>
      </Card>

      {/* 主要内容卡片 */}
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">{i18n.t("aboutChroxy")}</CardTitle>
          <CardDescription>{i18n.t("aboutDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{i18n.t("whatIsChroxy")}</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {i18n.t("chroxyDescription")}
            </p>
          </div>

          <Separator className="my-2" />

          <div>
            <h3 className="text-lg font-medium">{i18n.t("features")}</h3>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
              <li>{i18n.t("feature1")}</li>
              <li>{i18n.t("feature2")}</li>
              <li>{i18n.t("feature3")}</li>
              <li>{i18n.t("feature4")}</li>
              <li>{i18n.t("feature5")}</li>
              <li>{i18n.t("feature6")}</li>
            </ul>
          </div>

          <Separator className="my-2" />

          <div>
            <h3 className="text-lg font-medium">{i18n.t("howToUse")}</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {i18n.t("howToUseDesc")}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bg-muted/30 rounded-md p-4">
                <h4 className="text-sm font-medium">{i18n.t("step1Title")}</h4>
                <p className="text-muted-foreground mt-1 text-xs">
                  {i18n.t("step1Desc")}
                </p>
              </div>
              <div className="bg-muted/30 rounded-md p-4">
                <h4 className="text-sm font-medium">{i18n.t("step2Title")}</h4>
                <p className="text-muted-foreground mt-1 text-xs">
                  {i18n.t("step2Desc")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            {i18n.t("back")}
          </Button>
          <Button
            variant="default"
            onClick={() =>
              window.open("https://github.com/your-repo/chroxy", "_blank")
            }
          >
            {i18n.t("viewOnGithub")}
          </Button>
        </CardFooter>
      </Card>

      {/* 版本信息卡片 */}
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.t("versionInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{i18n.t("version")}</span>
            <span className="text-muted-foreground text-sm">
              {browser.runtime.getManifest().version}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">{i18n.t("lastUpdated")}</span>
            <span className="text-muted-foreground text-sm">
              {i18n.t("lastUpdatedDate")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">{i18n.t("chromeStore")}</span>
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              onClick={() =>
                window.open("https://chrome.google.com/webstore", "_blank")
              }
            >
              {i18n.t("viewExtension")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
