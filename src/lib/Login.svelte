<script lang="ts">
  import { writable } from "svelte/store";


    import { currentUser, pocketBase } from "../pocketbase";

    let username:string, password:string;

    const errorMessage = writable(null);

    async function logIn() {

        try {
            await pocketBase.collection('users').authWithPassword(username, password);
            errorMessage.set(null);

            username = '', password = '';

        } catch (error) {
            errorMessage.set(error);
        }
    }

    async function signup() {

        if (password.length <= 8) return alert("The password must be atleast 8 characters long!");

        const newUserData = {
            username,
            password,
            "passwordConfirm": password,
        };

        await pocketBase.collection('users').create(newUserData)
        .then(async () => {
            errorMessage.set(null);
            await logIn()
        })
        .catch((error) => {
            errorMessage.set(error);
        });

    }

    async function signOut() {
        pocketBase.authStore.clear();
    }

</script>

{#if $currentUser}

    <h1>Logged in as {$currentUser.username}</h1>

    <button on:click={signOut}>Logout</button>

{:else}

    <h1>Login or Signup</h1>
    <input type="text" placeholder="Username" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>

    <button on:click={signup}>Signup</button>
    <button on:click={logIn}>Login</button>
{/if}

{#if $errorMessage != null}

    <h3 style="color: white">Error: {$errorMessage}</h3>

{/if}