<script>
    import { getContext, onMount } from 'svelte';

    const TYPE_URL = 'type-url';
    const TYPE_DATA = 'type-data';

    /** @type {import('svelte/store').Writable<HTMLAnchorElement>} */
    const selectedMailto = getContext('selectedMailto');

    let address = '';
    let cc = '';
    let bcc = '';
    let subject = '';
    let body = '';

    let type = '';

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

    function openGmail() {
        const mailtoUrl = getMailtoUrl();

        const gmailUrl = 'https://mail.google.com/mail/?extsrc=mailto&url=' + encodeURIComponent(mailtoUrl);

        window.open(gmailUrl, '_blank', 'noopener, noreferrer');

        close();
    }

    function openOutlook() {
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

    function openYahoo() {
        const params = new URLSearchParams();
        if(address) params.set('to', address);
        if(subject) params.set('subject', subject);
        if(body) params.set('body', body);

        const url = new URL('https://compose.mail.yahoo.com');
        url.search = params.toString();

        window.open(url.toString(), '_blank', 'noopener, noreferrer');

        close();
    }

    function openDefault() {
        const mailtoUrl = getMailtoUrl();

        window.open(mailtoUrl.toString());

        close();
    }
 
    function close() {
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
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog open on:click|self={close}>
    <article>
        <h6>{address}</h6>
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
            <a href="#gmail" on:click|preventDefault={openGmail}>open in Gmail</a>
            <a href="#outlook" on:click|preventDefault={openOutlook}>open in Outlook</a>
            <a href="#yahoo" on:click|preventDefault={openYahoo}>open in Yahoo Mail</a>
            <a href="#default" on:click|preventDefault={openDefault}>open default</a>
            <a href="#copy" on:click|preventDefault>copy</a>
        </section>

        <footer>
            <small><a href="#github">maildo</a></small>
        </footer>
    </article>
</dialog>

<style>
    article {
        width: unset;
        border-radius: calc(var(--pico-border-radius) * 2);
    }

    h6, p {
        text-align: center;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--pico-spacing) * 0.5);
        padding: calc(var(--pico-block-spacing-vertical) * 0.25) calc(var(--pico-block-spacing-horizontal) * 1.5);
    }

    footer {
        text-align: center;
    }
</style>
