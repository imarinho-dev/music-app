<template>
  <div
    class="relative flex flex-col bg-white border border-gray-200 rounded dark:border-gray-400 dark:text-white dark:bg-gray-600"
  >
    <div
      class="flex items-center justify-between px-6 pt-6 pb-5 font-bold border-b border-gray-200"
    >
      <span class="card-title">Upload</span>

      <Icon class="text-4xl text-green-400" icon="ic:sharp-cloud-upload" />
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 bg-white border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragOver = false"
        @dragover.prevent.stop="is_dragOver = true"
        @dragenter.prevent.stop="is_dragOver = true"
        @dragleave.prevent.stop="is_dragOver = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="text-sm font-bold" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: `${upload.current_progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from "vue";
import { storage, auth, songsCollection } from "@/includes/firebase";
import { Icon } from "@iconify/vue";

const is_dragOver = ref(false);
const uploads = reactive([]);

const props = defineProps({
  addSong: {
    type: Function,
  },
});

const { addSong } = reactive(props);

const upload = ($event) => {
  is_dragOver.value = false;

  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files];

  files.forEach((file) => {
    if (file.type !== "audio/mpeg") {
      return;
    }

    if (!navigator.onLine) {
      uploads.push({
        task: {},
        current_progress: 100,
        name: file.name,
        variant: "bg-red-400",
        icon: "fas fa-times",
        text_class: "text-red-400",
      });
      return;
    }

    const storageRef = storage.ref();
    const songsRef = storageRef.child(`songs/${file.name}`);
    const task = songsRef.put(file);

    const uploadIndex =
      uploads.push({
        task,
        current_progress: 0,
        name: file.name,
        variant: "bg-blue-400",
        icon: "fas fa-spinner fa-spin",
        text_class: "",
      }) - 1;

    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploads[uploadIndex].current_progress = progress;
      },
      (error) => {
        uploads[uploadIndex].variant = "bg-red-400";
        uploads[uploadIndex].icon = "fas fa-times";
        uploads[uploadIndex].text_class = "text-red-400";
        console.log(error);
      },
      async () => {
        const song = {
          uid: auth.currentUser.uid,
          display_name: auth.currentUser.displayName,
          original_name: task.snapshot.ref.name,
          modified_name: task.snapshot.ref.name,
          genre: "",
          comment_count: 0,
        };

        song.url = await task.snapshot.ref.getDownloadURL();

        const songRef = await songsCollection.add(song);
        const songSnapshot = await songRef.get();

        addSong(songSnapshot);

        uploads[uploadIndex].variant = "bg-green-400";
        uploads[uploadIndex].icon = "fas fa-check";
        uploads[uploadIndex].text_class = "text-green-400";
      }
    );
  });

  console.log(files);
};

onBeforeUnmount(() => {
  uploads.forEach((upload) => {
    upload.task.cancel();
  });
});
</script>
