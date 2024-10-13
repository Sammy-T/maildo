<script>
    import { onMount } from 'svelte';
    import Maildo from './lib/Maildo.svelte';
    
    onMount(() => {
        const mailtos = document.querySelectorAll('a[href^="mailto:"]');
        console.log(mailtos);
    });
</script>

<Maildo />
