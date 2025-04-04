import { configureStore } from '@reduxjs/toolkit';
import onboardingSlice from '../features/signup_onboarding/onboarding.slice';
import userSlice from '../features/user/user.slice';
import uiSlice from '../features/ui/ui.slice';
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    onboarding: onboardingSlice,
    user: userSlice,
    ui: uiSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
