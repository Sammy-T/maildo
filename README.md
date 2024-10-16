# maildo

Mailto link modals built in [Svelte](https://svelte.dev/) and inspired by [mailgo](https://github.com/manzinello/mailgo).

I created this project to recreate the functionality I enjoyed from the original Mailgo project after it was deprecated.

<img src="https://github.com/user-attachments/assets/f5748db0-0924-405e-8f38-d2d1d3977ace" width="50%"><img src="https://github.com/user-attachments/assets/14e4b62f-3603-49d1-90fb-7ec7aa472a43" width="50%">

## Getting Started

### Installation

```bash
npm i maildo
```

then import the CSS and JS.

```js
import 'maildo/dist/index.css';
import 'maildo/dist/index';
```

> [!NOTE]
> This example assumes the use of a build system that allows importing css in js. But you should adapt importing of the css and js to your project's build system.

### Usage

Maildo will automatically be enabled for `mailto:` and `tel:` links unless the anchor tag includes the `no-maildo` class.

```html
<a href="mailto:hello@example.com">
  Email Me
</a>

<a href="tel:(555)555-5555">
  Call Me
</a>

<!-- Exclude from maildo and use the default browser behavior -->
<a class="no-maildo" href="mailto:hello@example.com">
  Email Me
</a>

<!-- Exclude from maildo and use the default browser behavior -->
<a class="no-maildo" href="tel:(555)555-5555">
  Call Me
</a>
```

#### Data Attributes

As an alternative to including the email address or phone number directly in the `mailto:` or `tel:` link, you can include the corresponding data attributes.

##### Href method

```html
<!-- The modal will display the email as hello@example.com -->
<a href="#maildo" data-address="hello" data-domain="example.com">
  Email Me
</a>
```

##### Class method

```html
<!-- The modal will display the email as hello@example.com -->
<a class="maildo" href="" data-address="hello" data-domain="example.com">
  Email Me
</a>
```

##### Mailto Attributes

| name | description |
| --- | --- |
| data-address | The username of the recipient's email address. |
| data-domain | The domain of the recipient's email address. |
| data-cc-address | The username of the CCed email address. |
| data-cc-domain | The domain of the CCed email address. |
| data-bcc-address | The username of the BCCed email address. |
| data-bcc-domain | The domain of the BCCed email address. |
| data-subject | The subject of the email. |
| data-body | The body of the email. |

##### Tel Attributes

| name | description |
| --- | --- |
| data-tel | The recipient's phone number. |

## Development

### Install [pnpm](https://pnpm.io/)

```bash
npm install -g pnpm
```

### Install packages

```bash
pnpm install
```

### Run the dev server

```bash
pnpm run dev
```

Then navigate to `http://localhost:5173/` in your browser to view the dev site.

### Build output files

```bash
pnpm run build
```

Built files will be output to the `dist/` directory.
