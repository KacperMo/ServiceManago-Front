<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="flex">
    <div class="w-1/5 mr-1 p-2 font-bold">
      <RouterLink :to="{ name: 'home' }" class="logo">ServiceManago</RouterLink>
    </div>
    <div class="w-4/5 py-2">&mdash;</div>
  </div>
  <div class="flex">
    <div class="w-1/5 mr-1 p-2 border-t-[1px] border-black">
      <div>
        <RouterLink :to="{ name: 'home' }">Strona główna</RouterLink>
      </div>
      <div>
        <RouterLink :to="{ name: 'about' }">O nas</RouterLink>
      </div>
      <div>
        <RouterLink :to="{ name: 'companies.index' }">Firmy</RouterLink>
      </div>
    </div>
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
  <footer class="flex font-light text-sm">
    <div class="w-1/5 mr-1 py-2 border-t-[1px] border-black">&mdash;</div>
    <div class="w-4/5 py-2 border-t-[1px] border-black">
      Route name: {{ $router.currentRoute.value.name }} &bull; Route path:
      {{ $router.currentRoute.value.path }} &bull; Route params:
      {{ $router.currentRoute.value.params }}
      <template v-if="$router.currentRoute.value.meta.isLoggedIn"
        >&bull; User is logged in</template
      >
    </div>
  </footer>
</template>
