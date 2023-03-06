<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        active-class="no-active"
        >Music</router-link
      >
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link :to="{ name: 'about' }" class="px-2 text-white"
              >About</router-link
            >
          </li>
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link :to="{ name: 'manage' }" class="px-2 text-white"
                >Manage</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut"
                >Logout</a
              >
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocal }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const modalStore = useModalStore();

const i18n = useI18n();

const { locale } = i18n;

let { isOpen } = storeToRefs(modalStore);

const { userLoggedIn } = storeToRefs(useUserStore());

const { signOut: loggedOut } = useUserStore();

const router = useRouter();
const route = useRoute();

const toggleAuthModal = () => {
  isOpen.value = !isOpen.value;
};

const signOut = () => {
  loggedOut();

  if (route.meta.requiresAuth) {
    router.push({ name: "home" });
  }
};

const changeLocale = () => {
  locale.value = locale.value === "pt-br" ? "en" : "pt-br";
};

const currentLocal = computed(() =>
  locale.value === "en" ? "Portuguese" : "English"
);
</script>
