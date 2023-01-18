<script lang="ts">
  import Login from "./lib/Login.svelte";
  import TodosDisplayer from "./lib/TodosDisplayer.svelte";
  import { currentUser } from "./pocketbase";


</script>

<main>
  <Login/>
  {#if $currentUser}
    <TodosDisplayer/>
  {/if}
  </main>