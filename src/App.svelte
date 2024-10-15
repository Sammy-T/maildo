<script>
    import Mailto from './lib/Mailto.svelte';
    import Callto from './lib/Callto.svelte';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';

    const MAILTO_SELECTORS = 'a[href^="mailto:"]:not(.no-maildo), a[href="#maildo"][data-address], a.maildo[data-address]';
    const CALLTO_SELECTORS = 'a[href^="tel:"]:not(.no-maildo), a[href^="callto:"]:not(.no-maildo), a[href="#maildo"][data-tel], a.maildo[data-tel]';

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedMailto = writable(null);
    setContext('selectedMailto', selectedMailto);

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedCallto = writable(null);
    setContext('selectedCallto', selectedCallto);
    
    onMount(() => {
        const mailtos = document.querySelectorAll(MAILTO_SELECTORS);
        const calltos = document.querySelectorAll(CALLTO_SELECTORS);
        
        mailtos.forEach((mailto) => {
            mailto.addEventListener('click', (event) => {
                event.preventDefault();

                // @ts-ignore
                $selectedMailto = mailto;
            });
        });

        calltos.forEach((callto) => {
            callto.addEventListener('click', (event) => {
                event.preventDefault();

                // @ts-ignore
                $selectedCallto = callto;
            });
        });
    });
</script>

{#if $selectedMailto}
    <Mailto />
{/if}

{#if $selectedCallto}
    <Callto />
{/if}
