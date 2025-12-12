import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
});
//when user logged in, on refresh, normally the store gets initial state : isAuthenticated false, user:null
//  so, on refresh, the api end point load user is hit, load user will initalize app with user information
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
}
initializeApp();