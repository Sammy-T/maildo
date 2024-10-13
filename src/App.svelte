<script>
    import Maildo from './lib/Maildo.svelte';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';

    const MAILTO_SELECTORS = 'a[href^="mailto:"]:not(.no-maildo), a[href="#maildo"], a.maildo';

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedMailto = writable(null);
    setContext('selectedMailto', selectedMailto);
    
    onMount(() => {
        const mailtos = document.querySelectorAll(MAILTO_SELECTORS);
        
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
