import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pocketBase = new PocketBase("http://127.0.0.1:8090");

export const currentUser = writable(pocketBase.authStore.model);

pocketBase.authStore.onChange((newUserStatus) => {
  console.log(newUserStatus);
  currentUser.set(pocketBase.authStore.model);
});
