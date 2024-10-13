<script>
    import Maildo from './lib/Maildo.svelte';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';

    /** @type {import('svelte/store').Writable<Element>}*/
    const selectedMailto = writable(null);
    setContext('selectedMailto', selectedMailto);
    
    onMount(() => {
        const mailtos = document.querySelectorAll('a[href^="mailto:"]');
        
        mailtos.forEach((mailto) => {
            mailto.addEventListener('click', (event) => {
                event.preventDefault();
                $selectedMailto = mailto;
            });
        });
    });
</script>

{#if $selectedMailto}
    <Maildo />
{/if}
