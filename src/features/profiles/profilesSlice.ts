import { RootState } from "@/app/store";
import { drawOmega } from "@/assets/images/draw_icon";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DefaultProfiles, Profile } from "./Profile";

interface ProfilesStorage {
  all: Record<string, Profile>;
  activedId?: string;
}
const storageProfiles = storage.defineItem<ProfilesStorage>("sync:profiles", {
  fallback: {
    all: {},
  },
});

export interface ProfilesState {
  all: Record<string, Profile>;
  activedId?: string;
}

const initialState: ProfilesState = {
  all: {},
};

export const profilesSlice = createSlice({
  name: "profiles",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProfiles.fulfilled, (state, action) => {
      const { all, activedId } = action.payload;
      const allWithDefaults = { ...DefaultProfiles.all, ...all };
      if (activedId && Object.keys(allWithDefaults).includes(activedId)) {
        state.activedId = activedId;
      } else {
        state.activedId = DefaultProfiles.Default.id;
      }
      state.all = all;
    });
  },
});

export const loadProfiles = createAsyncThunk(
  "profiles/loadProfiles",
  async (_, api) => {
    return new Promise<ProfilesStorage>((resolve) => {
      storageProfiles.getValue().then((storage) => {
        let activedId = storage.activedId ?? DefaultProfiles.Default.id;
        const profilesWithDefaults = {
          ...DefaultProfiles.all,
          ...storage.all,
        };
        let profile = profilesWithDefaults[activedId];
        if (!profile) {
          activedId = DefaultProfiles.Default.id;
          profile = DefaultProfiles.Default;
        }
        resolve({ ...storage, activedId: activedId });
        api.dispatch(enableProfile(profile));
      });
    });
  },
);

export const setProfile = createAsyncThunk(
  "profiles/setProfile",
  async (profile: Profile, api) => {
    return new Promise<void>(() => {
      storageProfiles.getValue().then((storage) => {
        storage.all = { ...storage.all, [profile.id]: profile };
        console.log("setProfile", profile);
        storageProfiles.setValue(storage).then(() => {
          api.dispatch(loadProfiles());
        });
      });
    });
  },
);

export const deleteProfile = createAsyncThunk(
  "profiles/deleteProfile",
  async (id: string, api) => {
    return new Promise<Record<string, Profile>>((resolve) => {
      storageProfiles.getValue().then((storage) => {
        delete storage.all[id];
        if (storage.activedId === id) {
          storage.activedId = undefined; // TODO: reset to system proxy
        }
        storageProfiles.setValue(storage).then(() => {
          api.dispatch(loadProfiles());
        });
      });
    });
  },
);

export const setActiveProfile = createAsyncThunk(
  "profiles/setActiveProfile", // TODO change to activateProfile
  async (id: string, api) => {
    return new Promise<void>(() => {
      const profiles = selectProfiles(api.getState() as RootState);
      const allWithDefaults = { ...DefaultProfiles.all, ...profiles };
      const profile = allWithDefaults[id];
      if (profile) {
        storageProfiles.setValue({ all: profiles, activedId: id }).then(() => {
          api.dispatch(loadProfiles());
        });
      }
    });
  },
);

export const enableProfile = createAsyncThunk(
  "profiles/enableProfile",
  async (profile: Profile, api) => {
    console.log("enableProfile", profile);
    return new Promise<void>((resolve, reject) => {
      const details: chrome.types.ChromeSettingSetDetails = {
        value: profile.config,
        scope: "regular",
      };
      console.log("details", details);
      chrome.proxy.settings.set(details, () => {
        if (chrome.runtime.lastError) {
          console.log("Error setting proxy:", chrome.runtime.lastError);
          reject();
        } else {
          resolve();
          console.log("Profile settings applied:", profile.config);
        }
      });
    }).then(() => {
      api.dispatch(setIcon(profile));
    });
  },
);

export const setIcon = createAsyncThunk(
  "profiles/setIcon",
  async (profile: Profile) => {
    let iconDetails: chrome.browserAction.TabIconDetails = {};
    const imageData: Record<number, ImageData> = {};
    for (const size of [16, 32, 48, 128]) {
      const canvas = new OffscreenCanvas(size, size);
      const drawContext = canvas.getContext("2d");
      if (drawContext) {
        drawContext.scale(size, size);
        drawContext.clearRect(0, 0, size, size);
        drawOmega(drawContext, { outerCircleColor: profile.color });
        imageData[size] = drawContext.getImageData(0, 0, size, size);
      } else {
        console.error("Failed to get 2D drawing context for canvas.");
      }
    }
    iconDetails.imageData = imageData;
    chrome.action.setIcon(iconDetails, () => {
      if (chrome.runtime.lastError) {
        console.error("Error setting icon:", chrome.runtime.lastError);
      }
    });
  },
);

export const selectProfiles = ({ profiles }: RootState) => {
  return profiles.all;
};

export const selectProfile = ({ profiles }: RootState, id: string) => {
  return profiles.all[id];
};

export const selectActivedProfile = ({ profiles }: RootState) => {
  const activedId = profiles.activedId;
  if (activedId) {
    return { ...profiles.all, ...DefaultProfiles.all }[activedId];
  }
  return DefaultProfiles.Default;
};

export default profilesSlice.reducer;
