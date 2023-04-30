import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "../reduxSlices/user";
import search from "../reduxSlices/search";
import loading from "../reduxSlices/loading";

const persistConfig = {
  key: "assignment",
  storage
};
let reducers = combineReducers({
  user: user,
  search: search,
  loading: loading
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
