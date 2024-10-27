<script>
    import { getContext, onMount } from 'svelte';

    const phoneUrlRe = /^(tel:)|^(callto:)/;

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedCallto = getContext('selectedCallto');

    let phoneNum = $state('');

    let copied = $state(false);

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

    /**
     * @param {Event} event
     */
    function openWhatsapp(event) {
        event.preventDefault();
        
        // Remove non-digits and leading zeroes
        // https://faq.whatsapp.com/5913398998672934/
        const whatsappTel = phoneNum.replaceAll(/\D/g, '').replace(/^0+/, '');
        
        const whatsappUrl = `https://wa.me/${whatsappTel}`;
        
        window.open(whatsappUrl, '_blank', 'noopener, noreferrer');

        close();
    }

    /**
     * @param {Event} event
     */
    function openSkype(event) {
        event.preventDefault();

        const skypeUrl = `skype:${encodeURIComponent(phoneNum)}`;
        
        window.open(skypeUrl, '_blank', 'noopener, noreferrer');

        close();
    }

    /**
     * @param {Event} event
     */
    async function copy(event) {
        event.preventDefault();

        try {
            await navigator.clipboard.writeText(phoneNum);

            copied = true;

            setTimeout(close, 1500);
        } catch(error) {
            console.error('Unable to copy to clipboard.', error);
        }
    }

    /**
     * @param {Event} event
     */
    function close(event = null) {
        if(event && event.currentTarget !== event.target) return;

        $selectedCallto = null;
    }

    onMount(() => {
        if(phoneUrlRe.test($selectedCallto.href)) {
            parseUrl();
        } else {
            parseData();
        }
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog open onclick={close}>
    <article>
        <h4>{phoneNum}</h4>

        <section>
            <a href="#whatsapp" onclick={openWhatsapp}>
                open in <strong>WhatsApp</strong>
            </a>
            <a href="#skype" onclick={openSkype}>
                open in <strong>Skype</strong>
            </a>
            <a href={`tel:${phoneNum}`}>
                <strong>call</strong> as default
            </a>
            <a href={`sms:${phoneNum}`}>
                <strong>text</strong> as default
            </a>
            <a href="#copy" onclick={copy}>
                <strong>{copied ? 'copied' : 'copy'}</strong>
            </a>
        </section>

        <footer>
            <small><a href="https://github.com/Sammy-T/maildo" target="_blank">maildo</a></small>
        </footer>
    </article>
</dialog>
