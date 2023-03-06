import { ref } from "vue";
import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

export const useUserStore = defineStore("user", () => {
  const userLoggedIn = ref(false);

  async function register(values) {
    const userCred = await auth.createUserWithEmailAndPassword(
      values.email,
      values.password
    );

    await usersCollection.doc(userCred.user.uid).set({
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country,
    });

    userCred.user.updateProfile({
      displayName: values.name,
    });

    userLoggedIn.value = true;
  }

  async function authenticate({ email, password }) {
    await auth.signInWithEmailAndPassword(email, password);

    userLoggedIn.value = true;
  }

  async function signOut() {
    await auth.signOut();

    userLoggedIn.value = false;
  }

  return { authenticate, userLoggedIn, register, signOut };
});
