<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="name">Name</label>
      <vee-field
        id="name"
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600 pl-3" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="email">Email</label>
      <vee-field
        id="email"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600 pl-3" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label for="age" class="inline-block mb-2">Age</label>
      <vee-field
        id="age"
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600 pl-3" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label for="password" class="inline-block mb-2">Password</label>
      <vee-field
        :bails="false"
        id="password"
        name="password"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label for="confirm_password" class="inline-block mb-2"
        >Confirm Password</label
      >
      <vee-field
        id="confirm_password"
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600 pl-3" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label for="country" class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        id="country"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600 pl-3" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        value="1"
        id="tos"
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t
        scope="global"
        keypath="register.accept"
        tag="label"
        for="tos"
        class="block"
        ><a href="#">{{ $t("register.tos") }}</a></i18n-t
      >
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";

const { register: createUser } = useUserStore();

const modalStore = useModalStore();

const { isOpen: modalVisibility } = storeToRefs(modalStore);

const userData = reactive({
  country: "USA",
});

const schema = {
  name: "required|min:3|max:100|alpha_spaces",
  email: "required|min:3|max:100|email",
  age: "required|min_value:18|max_value:100",
  password: "required|min:9|max:100|excluded:password",
  confirm_password: "password_mismatch:@password",
  country: "required|country_excluded:Antarctica",
  tos: "tos",
};

const reg_in_submission = ref(false);
const reg_show_alert = ref(false);
const reg_alert_variant = ref("bg-blue-500");
const reg_alert_msg = ref("Please wait! Your account is being created.");

const register = async (values) => {
  reg_show_alert.value = true;
  reg_in_submission.value = true;
  reg_alert_variant.value = "bg-blue-500";
  reg_alert_msg.value = "Please wait! Your account is being created.";

  try {
    await createUser(values);
  } catch (error) {
    reg_in_submission.value = false;
    reg_alert_variant.value = "bg-red-500";
    reg_alert_msg.value =
      "An unexpected error occurred. Please try again later.";
    return;
  }

  reg_alert_variant.value = "bg-green-500";
  reg_alert_msg.value = "Success! Your account has been created.";

  setTimeout(() => (modalVisibility.value = false), 2000);

  // window.location.reload();
};
</script>
