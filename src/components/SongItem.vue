<template>
  <li
    class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-500"
    :class="`song-id-${song.docID}`"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="block font-bold text-gray-700 dark:text-white composition-name"
        >{{ song.modified_name }}</router-link
      >
      <span class="text-sm text-gray-500 dark:text-gray-100">{{
        song.display_name
      }}</span>
    </div>

    <div class="text-lg text-gray-600">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span
          class="comments flex justify-center items-center dark:text-gray-100 text-gray-600"
          @click="navigate"
        >
          <Icon class="mr-2" icon="fa-solid:comments" />
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script setup>
import { reactive } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps(["song"]);

const { song } = reactive(props);
</script>
