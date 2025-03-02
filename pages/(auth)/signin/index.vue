<script lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthCookie } from "@/utils/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { loginSchema } from "./schemas";
</script>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

useHead({
  title: "Entrar - Pine",
});

const router = useRouter();
const { setAuthCookie } = useAuthCookie();

const form = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAuthCookie("dummy-token");
    await router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
});
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#44151A] via-[#70242B] to-[#AE780A]"
  >
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle
          class="flex items-center justify-center gap-2 text-2xl font-extrabold text-center"
        >
          Bem-vindo ao Pine
          <img src="/logo.svg" alt="Logo" class="w-8 h-8" />
        </CardTitle>
        <CardDescription class="text-center">
          Digite seu e-mail para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex items-center justify-between">
            <Button variant="link" class="px-0"> Esqueceu sua senha? </Button>
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="form.isSubmitting.value"
          >
            {{ form.isSubmitting.value ? "Entrando..." : "Entrar" }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
