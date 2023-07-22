# Astro Out Proxy

Astro Out Proxy is a JavaScript library that enhances the user experience by providing a warning prompt before they leave the website upon clicking an external link. This feature helps prevent accidental navigation away from the current page and gives users the opportunity to confirm their action.

# Demo url: https://astro-out-proxy.vercel.app/

## Why?

In some cases (E-commerce, government, banking apps) you want or are obliged to warn the user before they leave your site. And astro-out-proxy helps you do that.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Warns users before they navigate to an external website from your application.
- Customizable warning message to suit your application's needs.
- Lightweight and easy to integrate into any project.

## Installation

You can install `astro-out-proxy` with astro-add or manually

### Via astro-add

```bash
pnpm astro add astro-out-proxy
```

### Manually

```bash
pnpm add astro-out-proxy
```

And then in your `astro.config.mjs` add the basic config:

```js
import { defineConfig } from "astro/config";
import outProxy from "astro-out-proxy";

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [outProxy()],
});

```

## Usage

### Create the proxy route

**IMPORTANT** as of now only `pages/out.astro` is supported, hang on tight for updates!

Create `pages/out.astro` with the code below. The library comes with a simple design out of the box. If you want to use your own styles you can do that by wrapping it with the `<OutPage />` component and setting the `customUi` attribute. Make sure to add the id `leaveButton` to your leave button to use the script that fills out the href for it. Or you can create your own logic!

```astro
---
import OutPage from "astro-out-proxy/components/OutPage";
---

<!-- Default UI -->
<OutPage />

<!-- Custom UI - you must add the customUi parameter for this to work!-->
<OutPage customUi>
  <a id="leaveButton">Leave</a>
</OutPage>
```

### Build-time
If you installed via astro-add or added the integration in the astro config file manually, the build step is already configured. The integration will automatically change re-write the links for you.

### Development
To use the package during development you will have to add the `OutLinkDevModeComponent` to your project. Make sure to place it in a place so that it is on every page - preferably in the head - as in `demo/src/layouts/BaseLayout.astro`

```astro
---
import OutLinkDevModeComponent from "astro-out-proxy/components/OutLinkDevModeComponent";
---

<html lang="en">
  <head>
    <OutLinkDevModeComponent />
 ...
```

## Options

### Integration options

With the integration options you can control the behaviour of the integration during build-time.

**IMPORTANT** more options are on the way

- `safeAttribute`: The external links with this attribute won't be routed through the proxy. Default value: `data-safe`

```js
// astro.config.mjs

export default defineConfig({
  integrations: [outProxy({
    safeAttribute: "data-noproxy"
  })],
})
```

## Contributing

Contributions to Astro Out Proxy are welcome! If you find any issues or want to suggest improvements, please open an issue or submit a pull request on the project's GitHub repository.

## License

Astro Out Proxy is licensed under the MIT License. Feel free to use, modify, and distribute the library as per the terms of the license.
