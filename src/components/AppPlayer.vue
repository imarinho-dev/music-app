<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white border-t dark:border-gray-600 dark:bg-gray-700"
  >
    <!-- Track Info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="font-bold song-title">{{ current_song.modified_name }}</span>
      by
      <span class="song-artist">{{ current_song.display_name }}</span>
    </div>
    <div class="flex items-center gap-4 flex-nowrap">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio" id="player-play-btn">
        <Icon
          class="text-4xl dark:text-white"
          :icon="`${
            playing
              ? 'material-symbols:pause-circle-rounded'
              : 'material-symbols:play-circle'
          }`"
        />
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="relative w-full h-2 bg-gray-200 rounded cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { usePlayerStore } from "@/stores/player";
import { Icon } from "@iconify/vue";

const playerStore = usePlayerStore();
const { toggleAudio, updateSeek } = playerStore;

const playing = computed(() => playerStore.playing);
const seek = computed(() => playerStore.seek);
const duration = computed(() => playerStore.duration);
const playerProgress = computed(() => playerStore.playerProgress);
const current_song = computed(() => playerStore.current_song);
</script>
