import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
