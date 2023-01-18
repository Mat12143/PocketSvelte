<script lang="ts">
  import { onDestroy, onMount } from "svelte";

    import { pocketBase } from "../pocketbase";
    import { currentUser } from "../pocketbase";

    let todos = [];

    let unsubscribe: () => void;

    onMount(async () => {

        const results = await pocketBase.collection('todos').getList(1, 30, {
            sort: 'created',
            user: $currentUser,
            expand: 'user',
        })

        todos = results.items;

        unsubscribe = await pocketBase.collection('todos').subscribe("*", (newChanges) => {

            if (newChanges.action == 'create') {

                todos = [...todos, newChanges.record];
            }
            else if (newChanges.action == 'delete') {
                todos = todos.filter((item) => item.id != newChanges.record.id);
            }   
        })
    })


    onDestroy(() => unsubscribe());

</script>

{#each todos as todo}

    <h3>{todo.text}</h3>
    <p>Created at {todo.created}</p>

{/each}