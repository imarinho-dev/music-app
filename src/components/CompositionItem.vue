<template>
  <div
    class="p-3 mb-4 border border-gray-200 rounded dark:border-gray-400 dark:hover:bg-gray-500"
  >
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        @click.prevent="deleteSong"
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded"
      >
        <Icon class="text-xl" icon="pepicons-pop:times" />
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded"
      >
        <Icon class="text-xl" icon="ph:pencil-line-duotone" />
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="p-4 mb-4 font-bold text-center text-white"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="modified_name" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="genre" class="text-red-600" />
        </div>
        <button
          :disabled="in_submission"
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 mr-3"
        >
          Submit
        </button>
        <button
          :disabled="in_submission"
          @click.prevent="showForm = false"
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { songsCollection, storage } from "@/includes/firebase";
import { Icon } from "@iconify/vue";

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
  updateSong: {
    type: Function,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  removeSong: {
    type: Function,
    required: true,
  },
  updateUnsavedFlag: {
    type: Function,
  },
});

const { song, updateSong, index, removeSong, updateUnsavedFlag } =
  reactive(props);

const showForm = ref(false);
const in_submission = ref(false);
const show_alert = ref(false);
const alert_variant = ref("bg-blue-500");
const alert_message = ref("Please wait! Updating song info.");

const schema = {
  modified_name: "required",
  genre: "alpha_spaces",
};

const edit = async (values) => {
  in_submission.value = true;
  show_alert.value = true;
  alert_variant.value = "bg-blue-500";
  alert_message.value = "Please wait! Updating song info.";

  try {
    await songsCollection.doc(song.docID).update(values);
  } catch (error) {
    in_submission.value = false;
    alert_variant.value = "bg-red-500";
    alert_message.value = "Something went wrong! Try again later.";
    return;
  }

  updateSong(index, values);
  updateUnsavedFlag(false);

  in_submission.value = false;
  alert_variant.value = "bg-green-500";
  alert_message.value = "Success!";
};

const deleteSong = async () => {
  const storageRef = storage.ref();
  const songRef = storageRef.child(`songs/${song.original_name}`);

  await songRef.delete();

  await songsCollection.doc(song.docID).delete();

  removeSong(index);
};
</script>
