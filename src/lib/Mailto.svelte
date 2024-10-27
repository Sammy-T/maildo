<script>
    import { getContext, onMount } from 'svelte';

    const TYPE_URL = 'type-url';
    const TYPE_DATA = 'type-data';

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedMailto = getContext('selectedMailto');

    let type = '';

    let address = '';
    let cc = '';
    let bcc = '';
    let subject = '';
    let body = '';

    let mailtoUrl = '';

    let copied = false;

    /**
     * Parses the email data from the mailto url.
     */
    function parseUrl() {
        const url = new URL($selectedMailto.href);
        const { searchParams } = url;

        address = url.pathname;

        cc = searchParams.get('cc');
        bcc = searchParams.get('bcc');
        subject = searchParams.get('subject');
        body = searchParams.get('body');
    }

    /**
     * Parses the email data from the anchor element's data attributes.
     */
    function parseData() {
        const { dataset } = $selectedMailto;

        address = (dataset.address && dataset.domain) ? `${dataset.address}@${dataset.domain}` : '';

        cc = (dataset.ccAddress && dataset.ccDomain) ? `${dataset.ccAddress}@${dataset.ccDomain}` : '';
        bcc = (dataset.bccAddress && dataset.bccDomain) ? `${dataset.bccAddress}@${dataset.bccDomain}` : '';

        subject = dataset.subject;
        body = dataset.body;
    }

    /**
     * A helper to get the mailto url.
     */
    function getMailtoUrl() {
        switch(type) {
            case TYPE_URL:
                return $selectedMailto.href;

            case TYPE_DATA:
                const params = new URLSearchParams();
                if(cc) params.set('cc', cc);
                if(bcc) params.set('bcc',bcc);
                if(subject) params.set('subject', subject);
                if(body) params.set('body', body);

                const url = new URL(`mailto:${address}`);
                url.search = params.toString();

                return url.toString();

            default:
                console.error(`Invalid mailto type: ${type}`);
                return '';
        }
    }

    /**
     * @param {Event} event
     */
    function openGmail(event) {
        event.preventDefault();

        const gmailUrl = 'https://mail.google.com/mail/?extsrc=mailto&url=' + encodeURIComponent(mailtoUrl);

        window.open(gmailUrl, '_blank', 'noopener, noreferrer');

        close();
    }

    /**
     * @param {Event} event
     */
    function openOutlook(event) {
        event.preventDefault();

        const params = new URLSearchParams();
        params.set('path', '/mail/action/compose');

        if(address) params.set('to', address);
        if(subject) params.set('subject', subject);
        if(body) params.set('body', body);

        const url = new URL('https://outlook.live.com/owa/');
        url.search = params.toString();

        window.open(url.toString(), '_blank', 'noopener, noreferrer');

        close();
    }

    /**
     * @param {Event} event
     */
    function openYahoo(event) {
        event.preventDefault();

        const params = new URLSearchParams();
        if(address) params.set('to', address);
        if(subject) params.set('subject', subject);
        if(body) params.set('body', body);

        const url = new URL('https://compose.mail.yahoo.com');
        url.search = params.toString();

        window.open(url.toString(), '_blank', 'noopener, noreferrer');

        close();
    }

    /**
     * @param {Event} event
     */
    async function copy(event) {
        event.preventDefault();

        try {
            await navigator.clipboard.writeText(address);

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

        $selectedMailto = null;
    }

    onMount(() => {
        if($selectedMailto.href.startsWith('mailto:')) {
            type = TYPE_URL;
            parseUrl();
        } else {
            type = TYPE_DATA;
            parseData();
        }
        
        mailtoUrl = getMailtoUrl();
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog open onclick={close}>
    <article>
        <h4>{address}</h4>
        <p>
            <small>
                {#if cc}
                    <strong>cc</strong> {cc}<br>
                {/if}

                {#if bcc}
                    <strong>bcc</strong> {bcc}<br>
                {/if}

                {#if subject}
                    <strong>subject</strong> {subject}<br>
                {/if}

                {#if body}
                    <strong>body</strong> {body}<br>
                {/if}
            </small>
        </p>

        <section>
            <a href="#gmail" onclick={openGmail}>
                open in <strong>Gmail</strong>
            </a>
            <a href="#outlook" onclick={openOutlook}>
                open in <strong>Outlook</strong>
            </a>
            <a href="#yahoo" onclick={openYahoo}>
                open in <strong>Yahoo Mail</strong>
            </a>
            <a href={mailtoUrl}>
                <strong>open</strong> default
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
