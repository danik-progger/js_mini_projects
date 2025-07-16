<script>
    let todos = $state([]);
    let inputVal = $state("");

    function onSubmit() {
        if (!inputVal) return;
        todos = [...todos, inputVal];
        inputVal = "";
    }
</script>

<input
    name="todo"
    placeholder="Enter item"
    required
    bind:value={inputVal}
/>
<button onclick={onSubmit}>Add</button>
<ul data-testId="ul">
    {#each todos as todo, i }
        <li key={i}>{todo}</li>
    {/each}
</ul>