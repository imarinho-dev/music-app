import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { Howl } from "howler";
import helper from "@/includes/helper";

export const usePlayerStore = defineStore("player", () => {
  const current_song = ref({});
  const sound = ref({});
  const seek = ref("00:00");
  const duration = ref("00:00");
  const playerProgress = ref("0%");

  const playing = computed(() => {
    if (sound.value.playing) {
      return sound.value.playing();
    }

    return false;
  });

  const newSong = async (song) => {
    if (sound.value instanceof Howl) {
      sound.value.unload();
    }

    current_song.value = song;

    sound.value = new Howl({
      src: [song.url],
      html5: true,
    });

    sound.value.play();

    sound.value.on("play", () => {
      requestAnimationFrame(progress);
    });
  };

  const toggleAudio = async () => {
    if (!sound.value.playing) {
      return;
    }

    if (sound.value.playing()) {
      sound.value.pause();
    } else {
      sound.value.play();
    }
  };

  const progress = () => {
    seek.value = helper.formatTime(sound.value.seek());
    duration.value = helper.formatTime(sound.value.duration());

    playerProgress.value = `${
      (sound.value.seek() / sound.value.duration()) * 100
    }%`;

    if (sound.value.playing()) {
      requestAnimationFrame(progress);
    }
  };

  const updateSeek = (event) => {
    if (!sound.value.playing) {
      return;
    }

    const { x, width } = event.currentTarget.getBoundingClientRect();

    const clickX = event.clientX - x;
    const percentage = clickX / width;
    const seconds = sound.value.duration() * percentage;

    sound.value.seek(seconds);
    sound.value.once("seek", progress);
  };

  return {
    current_song,
    newSong,
    toggleAudio,
    playing,
    seek,
    duration,
    playerProgress,
    updateSeek,
  };
});

// export const usePlayerStore = defineStore("player", {
//   state: () => ({
//     current_song: {},
//     sound: {},
//     seek: "00:00",
//     duration: "00:00",
//     playerProgress: "0%",
//   }),
//   actions: {
//     async newSong(song) {
//       if (this.sound instanceof Howl) {
//         this.sound.unload();
//       }

//       this.current_song = song;

//       this.sound = new Howl({
//         src: [song.url],
//         html5: true,
//       });

//       this.sound.play();

//       this.sound.on("play", () => {
//         requestAnimationFrame(this.progress);
//       });
//     },
//     async toggleAudio() {
//       if (!this.sound.playing) {
//         return;
//       }

//       if (this.sound.playing()) {
//         this.sound.pause();
//       } else {
//         this.sound.play();
//       }
//     },
//     progress() {
//       this.seek = helper.formatTime(this.sound.seek());
//       this.duration = helper.formatTime(this.sound.duration());
//       this.playerProgress = `${
//         (this.sound.seek() / this.sound.duration()) * 100
//       }%`;

//       if (this.sound.playing()) {
//         requestAnimationFrame(this.progress);
//       }
//     },
//     updateSeek(event) {
//       if (!this.sound.playing) {
//         return;
//       }

//       const { x, width } = event.currentTarget.getBoundingClientRect();

//       const clickX = event.clientX - x;
//       const percentage = clickX / width;
//       const seconds = this.sound.duration() * percentage;

//       this.sound.seek(seconds);
//       this.sound.once("seek", this.progress);
//     },
//   },
//   getters: {
//     playing: (state) => {
//       if (state.sound.playing) {
//         return state.sound.playing();
//       }

//       return false;
//     },
//   },
// });
