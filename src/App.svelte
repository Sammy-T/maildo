<script>
    import Maildo from './lib/Maildo.svelte';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedMailto = writable(null);
    setContext('selectedMailto', selectedMailto);
    
    onMount(() => {
        const mailtos = document.querySelectorAll('a[href^="mailto:"], a[href="#maildo"]');
        
        mailtos.forEach((mailto) => {
            mailto.addEventListener('click', (event) => {
                event.preventDefault();

                // @ts-ignore
                $selectedMailto = mailto;
            });
        });
    });
</script>

{#if $selectedMailto}
    <Maildo />
{/if}
