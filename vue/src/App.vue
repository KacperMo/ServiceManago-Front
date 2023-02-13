<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppAlert from "@/components/AppAlert.vue";
import AppNav from "@/components/AppNav.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div class="flex">
    <div
      class="w-2/12 mr-1 mt-1 p-2 border-t-[2px] border-gray-500 font-bold 2xl:font-extrabold text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
    >
      <RouterLink :to="{ name: 'home' }" class="hover:text-brand logo"
        >ServiceManago</RouterLink
      >
    </div>
    <div class="w-10/12 mt-1 py-2 border-t-[2px] border-gray-500">&mdash;</div>
  </div>
  <div class="flex">
    <nav
      class="w-2/12 mr-1 p-2 border-t-[1px] border-gray-500 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl"
    >
      <AppNav />
    </nav>
    <div class="w-10/12 py-2 border-t-[1px] border-gray-500">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <KeepAlive>
            <Suspense>
              <div>
                <component :is="Component"></component>
              </div>
              <template #fallback>
                <AppAlert>Wczytuję...</AppAlert>
              </template>
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
    </div>
  </div>
  <div class="flex">
    <div class="w-2/12 mr-1 p-2 border-t-[1px] border-gray-500">&mdash;</div>
    <div class="w-10/12 py-2 border-t-[1px] border-gray-500 text-gray-700">
      <footer class="flex text-xs sm:text-xs md:text-sm lg:text-base">
        <AppFooter />
      </footer>
    </div>
  </div>
</template>
