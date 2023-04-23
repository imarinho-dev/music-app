<template>
  <!-- Header -->
  <header id="header" class="bg-white dark:bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link
        class="mr-4 text-xl font-bold text-gray-700 uppercase dark:text-white"
        :to="{ name: 'home' }"
        active-class="no-active"
        >Web Music</router-link
      >
      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link
              :to="{ name: 'about' }"
              class="px-2 text-gray-700 dark:text-white"
              >About</router-link
            >
          </li>
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-gray-700 dark:text-white"
              href="#"
              @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link
                :to="{ name: 'manage' }"
                class="px-2 text-gray-700 dark:text-white"
                >Manage</router-link
              >
            </li>
            <li>
              <a
                class="px-2 text-gray-700 dark:text-white"
                href="#"
                @click.prevent="signOut"
                >Logout</a
              >
            </li>
          </template>
        </ul>
        <ul class="flex ml-auto space-x-4">
          <li>
            <button @click="toggleDark()">
              <Icon
                class="text-2xl hover:text-yellow-400"
                :class="`${isDark ? 'text-white' : 'text-gray-700'}`"
                :icon="`${isDark ? 'mdi:weather-sunny' : 'mdi:moon-and-stars'}`"
              />
            </button>
          </li>
          <li>
            <a
              class="text-gray-700 dark:text-white"
              href="#"
              @click.prevent="changeLocale"
            >
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
import { useDark, useToggle } from "@vueuse/core";
import { Icon } from "@iconify/vue";

const isDark = useDark();

const toggleDark = useToggle(isDark);

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
