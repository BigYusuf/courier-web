import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slice/auth/authSlice";
import orderReducer from "./slice/orders/orderSlice";
// import eventsReducer from "./slice/events";
import ThemeReducer from "./slice/theme";
// import userReducer from "./slice/user";
import sidebarReducer from "./slice/sidebar";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["apiProductSlice"],
};
export const rootReducers = combineReducers({
  [api.reducerPath]: api.reducer,
  order: orderReducer,
  auth: authReducer,
  theme: ThemeReducer,
  sidebar: sidebarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
  devTools: true, //set to false for production
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
