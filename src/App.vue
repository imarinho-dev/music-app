<template>
  <app-header />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <app-player />
  <app-auth />
</template>
<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppPlayer from "@/components/AppPlayer.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { auth } from "./includes/firebase";
import { onBeforeMount } from "vue";

const userStore = useUserStore();

const { userLoggedIn } = storeToRefs(userStore);

onBeforeMount(async () => {
  if (await auth.currentUser) {
    userLoggedIn.value = true;
  }
});
</script>
<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
