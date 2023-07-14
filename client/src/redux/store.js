import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import channelSlice from "./slice/channelSlice";
import videoSlice from "./slice/videoSlice";
import infinityLoadSlice from "./slice/infinityLoadSlice";
import subsrciptionSlice from "./slice/subsrciptionSlice";
import videoFavouriteSlice from "./slice/videoFavouriteSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoSlice,
    channel: channelSlice,
    infinity: infinityLoadSlice,
    sub: subsrciptionSlice,
    favourite: videoFavouriteSlice,
  },
});
