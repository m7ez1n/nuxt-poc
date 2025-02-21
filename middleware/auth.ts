import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthCookie } from "@/utils/auth";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthCookie();

  if (!isAuthenticated.value && to.path !== "/signin") {
    return navigateTo("/signin");
  }

  if (isAuthenticated.value && to.path === "/signin") return navigateTo("/");
});
