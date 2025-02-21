<script lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
</script>

<script setup lang="ts">
import type { Fruit } from "@/types/fruits";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

useHead({
  title: "Dashboard - Banco Pine",
});

const {
  data: fruits,
  error,
  refresh: reload,
  pending: isLoading,
} = useLazyFetch<Fruit[]>("/api/fruit/all", {
  key: "fruits-list",
});
</script>

<template>
  <div class="container py-8">
    <h1 class="mb-6 text-3xl font-bold">Catálogo de Frutas</h1>

    <div v-if="isLoading" class="flex justify-center my-12">
      <div
        class="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="p-4 rounded-md bg-destructive/10 text-destructive"
    >
      <h3 class="font-medium">Erro ao carregar frutas</h3>
      <p>{{ error.message }}</p>
      <Button @click="reload" variant="outline" class="mt-4"
        >Tentar novamente</Button
      >
    </div>

    <div v-else>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="fruit in fruits" :key="fruit.id" class="overflow-hidden">
          <CardHeader>
            <CardTitle>{{ fruit.name }}</CardTitle>
            <CardDescription>
              Família: {{ fruit.family }} | Gênero: {{ fruit.genus }}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div class="space-y-2">
              <h4 class="font-medium">Informações Nutricionais</h4>
              <ul class="space-y-1">
                <li>🍯 Açúcar: {{ fruit.nutritions.sugar }}g</li>
                <li>🥩 Proteína: {{ fruit.nutritions.protein }}g</li>
                <li>🍞 Carboidratos: {{ fruit.nutritions.carbohydrates }}g</li>
                <li>🧈 Gordura: {{ fruit.nutritions.fat }}g</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter class="w-full">
            <NuxtLink class="w-full" :to="`/${fruit.name.toLowerCase()}`">
              <Button class="w-full" variant="outline">Ver detalhes</Button>
            </NuxtLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>
