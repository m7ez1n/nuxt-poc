import { useCookie } from "#app";
import { computed } from "vue";

const AUTH_COOKIE_NAME = "auth_token";

export function useAuthCookie() {
  const authCookie = useCookie(AUTH_COOKIE_NAME, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  const isAuthenticated = computed(() => !!authCookie.value);

  const setAuthCookie = (token: string) => {
    authCookie.value = token;
  };

  const removeAuthCookie = () => {
    authCookie.value = null;
  };

  const getAuthCookie = () => {
    return authCookie.value;
  };

  return {
    setAuthCookie,
    removeAuthCookie,
    getAuthCookie,
    isAuthenticated,
  };
}
