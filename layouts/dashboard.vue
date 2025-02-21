<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-vue-next";

const router = useRouter();
const { removeAuthCookie } = useAuthCookie();

const handleLogout = () => {
  removeAuthCookie();
  router.push("/signin");
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="border-b">
      <div class="container flex items-center justify-between h-16 px-4">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" class="w-8 h-8" />
          <span class="font-semibold">Banco Pine</span>
        </NuxtLink>

        <Button variant="ghost" size="sm" @click="handleLogout">
          <span class="sr-only">Sair</span>
          <span class="flex items-center gap-2">
            Sair
            <LogOutIcon class="w-8 h-8" />
          </span>
        </Button>
      </div>
    </header>

    <main
      class="flex-1 space-y-4 p-8 pt-6 bg-gradient-to-t from-red-500/5 to-background via-background via-25%"
    >
      <slot />
    </main>
  </div>
</template>
