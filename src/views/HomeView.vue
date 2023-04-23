<template>
  <main class="">
    <!-- Introduction -->
    <section class="relative py-20 mb-8 text-center text-white">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg bg-[url('assets/img/user-header.png')] dark:bg-[url('assets/img/header.png')]"
      ></div>
      <div class="container mx-auto">
        <div class="main-header-content">
          <h1 class="mb-5 text-5xl font-bold">
            {{ $t("home.listen") }}
          </h1>
          <p class="w-full mx-auto md:w-8/12">
            The Web Music is a cloud-based music storage platform that allows
            users to upload their music and access it anywhere, anytime,
            directly from the internet. With the ability to access a personal
            music library from anywhere with an internet connection, the Web
            Music is the perfect choice for music lovers on the go.
          </p>
        </div>
      </div>

      <img
        class="relative block w-auto max-w-full mx-auto mt-5 -mb-20"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->

    <section class="container mx-auto">
      <div
        class="relative flex flex-col bg-white border border-gray-200 rounded dark:border-gray-400 dark:bg-gray-600"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-gray-400"
          v-icon.right.yellow="'headphones-alt'"
        >
          <span class="text-gray-700 dark:text-white card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>

        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
<script setup>
import { onBeforeUnmount, reactive, ref, onBeforeMount } from "vue";
import { songsCollection } from "@/includes/firebase";
import SongItem from "@/components/SongItem.vue";

const songs = reactive([]);
const maxPerPage = 5;
const pendingRequest = ref(false);

onBeforeMount(async () => {
  getSongs();

  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

  if (bottomOfWindow) {
    getSongs();
  }
};

const getSongs = async () => {
  if (pendingRequest.value) {
    return;
  }

  pendingRequest.value = true;

  let snapshots;

  if (songs.length) {
    const lastDoc = await songsCollection
      .doc(songs[songs.length - 1].docID)
      .get();
    snapshots = await songsCollection
      .orderBy("modified_name")
      .startAfter(lastDoc)
      .limit(maxPerPage)
      .get();
  } else {
    snapshots = await songsCollection
      .orderBy("modified_name")
      .limit(maxPerPage)
      .get();
  }

  snapshots.forEach((document) => {
    songs.push({
      docID: document.id,
      ...document.data(),
    });
  });

  pendingRequest.value = false;
};
</script>
