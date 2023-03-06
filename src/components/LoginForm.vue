<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label for="login_email" class="inline-block mb-2">Email</label>
      <vee-field
        id="login_email"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600 pl-3" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label for="login_password" class="inline-block mb-2">Password</label>
      <vee-field
        id="login_password"
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600 pl-3" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="login_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { authenticate } = userStore;

const modalStore = useModalStore();

const { isOpen: modalVisibility } = storeToRefs(modalStore);

const loginSchema = {
  email: "required|email",
  password: "required|min:9|max:100",
};

const login_in_submission = ref(false);
const login_show_alert = ref(false);
const login_alert_variant = ref("bg-blue-500");
const login_alert_msg = ref("Please wait! We are logging you in.");

const login = async (values) => {
  login_in_submission.value = true;
  login_show_alert.value = true;
  login_alert_variant.value = "bg-blue-500";
  login_alert_msg.value = "Please wait! We are logging you in.";

  try {
    await authenticate(values);
  } catch (error) {
    login_in_submission.value = false;
    login_alert_variant.value = "bg-red-500";
    login_alert_msg.value = "Invalid login details.";
    return;
  }

  login_alert_variant.value = "bg-green-500";
  login_alert_msg.value = "Success! You are now logged in.";

  setTimeout(() => (modalVisibility.value = false), 2000);

  // window.location.reload();
};
</script>
