<script>
    import { getContext, onMount } from 'svelte';

    const TYPE_URL = 'type-url';
    const TYPE_DATA = 'type-data';

    const phoneUrlRe = /^(tel:)|(callto:)/;

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedCallto = getContext('selectedCallto');

    let type = '';

    let phoneNum = '';

    let copied = false;

    /**
     * Parses the phone number data from the tel or callto url.
     */
    function parseUrl() {
        phoneNum = $selectedCallto.href.replace(phoneUrlRe, '');
    }

    /**
     * Parses the phone number data from the anchor element's data attributes.
     */
    function parseData() {
        const { dataset } = $selectedCallto;

        phoneNum = dataset.tel;
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(phoneNum);

            copied = true;

            setTimeout(close, 1500);
        } catch(error) {
            console.error('Unable to copy to clipboard.', error);
        }
    }

    function close() {
        $selectedCallto = null;
    }

    onMount(() => {
        if(phoneUrlRe.test($selectedCallto.href)) {
            type = TYPE_URL;
            parseUrl();
        } else {
            type = TYPE_DATA;
            parseData();
        }
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog open on:click|self={close}>
    <article>
        <h4>1234567890</h4>

        <section>
            <a href="#whatsapp" on:click|preventDefault>
                open in <strong>WhatsApp</strong>
            </a>
            <a href="#skype" on:click|preventDefault>
                open in <strong>Skype</strong>
            </a>
            <a href="#default" on:click|preventDefault>
                <strong>call</strong> as default
            </a>
            <a href="#sms" on:click|preventDefault>
                <strong>text</strong> as default
            </a>
            <a href="#copy" on:click|preventDefault={copy}>
                <strong>{copied ? 'copied' : 'copy'}</strong>
            </a>
        </section>

        <footer>
            <small><a href="https://github.com/Sammy-T/maildo" target="_blank">maildo</a></small>
        </footer>
    </article>
</dialog>
