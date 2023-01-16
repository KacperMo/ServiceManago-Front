<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppNav from "@/components/AppNav.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div class="flex">
    <div class="w-1/5 mr-1 p-2 font-bold">
      <RouterLink :to="{ name: 'home' }" class="logo">ServiceManago</RouterLink>
    </div>
    <div class="w-4/5 py-2">&mdash;</div>
  </div>
  <div class="flex">
    <AppNav />
    <div class="w-4/5 py-2 border-t-[1px] border-black">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <div>
                  <component :is="Component"></component>
                </div>
                <template #fallback>Wczytuję...</template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </div>
  </div>
  <AppFooter />
</template>
