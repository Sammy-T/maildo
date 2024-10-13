<script>
    import { getContext, onMount } from 'svelte';

    const selectedMailto = getContext('selectedMailto');

    let address = '';
    let cc = '';
    let bcc = '';
    let subject = '';
    let body = '';

    function parseUrl() {
        const url = new URL($selectedMailto.href);
        const { searchParams } = url;

        address = url.pathname;

        cc = searchParams.get('cc');
        bcc = searchParams.get('bcc');
        subject = searchParams.get('subject');
        body = searchParams.get('body');
    }

    function cancel() {
        $selectedMailto = null;
    }

    onMount(() => {
        if($selectedMailto.href.startsWith('mailto:')) {
            parseUrl();
        } else {
            //// TODO: parse data attr
        }
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog open on:click|self={cancel}>
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
            <a href="#gmail">open in Gmail</a>
            <a href="#outlook">open in Outlook</a>
            <a href="#yahoo">open in Yahoo Mail</a>
            <a href="#default">open default</a>
            <a href="#copy">copy</a>
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
