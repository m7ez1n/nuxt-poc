<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const router = useRouter();
const { removeAuthCookie } = useAuthCookie();

const handleLogout = () => {
  removeAuthCookie();
  router.push("/signin");
};
</script>

<script lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthCookie } from "@/utils/auth";
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0">
      <CardTitle class="text-3xl">Welcome to the Dashboard</CardTitle>
      <Button @click="handleLogout" variant="destructive"> Logout </Button>
    </CardHeader>
    <CardContent>
      <p class="text-muted-foreground">
        This is a protected page. You can only see this if you're logged in.
      </p>
    </CardContent>
  </Card>
</template>
