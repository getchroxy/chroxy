import { store } from "@/app/store";
import { loadProfiles } from "@/features/profiles/profilesSlice";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  browser.runtime.onInstalled.addListener(({ reason }) => {
    store.dispatch(loadProfiles());
    switch (reason) {
      case browser.runtime.OnInstalledReason.INSTALL:
        console.log("Extension installed for the first time!");
        break;
      case browser.runtime.OnInstalledReason.UPDATE:
        console.log("Extension updated!");
        break;
      case browser.runtime.OnInstalledReason.CHROME_UPDATE:
        console.log("Chrome updated!");
        break;
      case browser.runtime.OnInstalledReason.SHARED_MODULE_UPDATE:
        console.log("Shared module updated!");
        break;
      default: // Do nothing
        break;
    }
    console.log("Extension installed!");
    // browser.runtime.openOptionsPage();
  });

  browser.runtime.onStartup.addListener(() => {
    console.log("Extension started!");
    store.dispatch(loadProfiles());
  });
});
