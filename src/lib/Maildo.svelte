<dialog open>
    <article>
        <h6>hello@example.com</h6>

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

    h6 {
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
