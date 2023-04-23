<template>
  <section class="container mx-auto mt-6 text-gray-700 dark:text-white">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-file :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="relative flex flex-col bg-white border border-gray-200 rounded dark:bg-gray-600 dark:border-gray-500"
        >
          <div
            class="flex items-center justify-between px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-gray-400"
          >
            <span class="card-title">My Songs</span>

            <Icon class="text-2xl text-green-400" icon="bi:disc-fill" />
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { songsCollection, auth } from "@/includes/firebase";
import UploadFile from "@/components/UploadFile.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { Icon } from "@iconify/vue";

const songs = reactive([]);
const unsavedFlag = ref(false);

onMounted(async () => {
  const snapshot = await songsCollection
    .where("uid", "==", auth.currentUser.uid)
    .get();

  snapshot.forEach(addSong);
});

onBeforeRouteLeave((to, from, next) => {
  if (!unsavedFlag.value) {
    next();
  } else {
    const leave = confirm(
      "You have unsaved changes. Are you sure you want to leave?"
    );
    next(leave);
  }
});

const updateSong = (i, values) => {
  songs[i].modified_name = values.modified_name;
  songs[i].genre = values.genre;
};

const removeSong = (i) => {
  songs.splice(i, 1);
};

const addSong = (document) => {
  const song = {
    ...document.data(),
    docID: document.id,
  };

  songs.push(song);
};

const updateUnsavedFlag = (value) => {
  unsavedFlag.value = value;
};
</script>
