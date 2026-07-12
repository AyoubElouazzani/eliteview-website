# EliteView IPTV Website

EliteView IPTV is a modern and responsive website created to present legal IPTV and digital streaming subscription services.

The website is designed to provide visitors with clear information about available plans, supported devices, service features, frequently asked questions, and customer support.

> Important: EliteView IPTV should only distribute television channels and digital content for which it has the required licenses and permissions.

## Features

* Modern and responsive design
* Mobile, tablet, and desktop compatibility
* Subscription plan presentation
* Supported-device information
* Frequently asked questions section
* WhatsApp or contact support integration
* Fast website performance
* Secure HTTPS connection
* Automatic deployment through GitHub and Netlify

## Technologies Used

Depending on the project configuration, the website may use:

* HTML5
* CSS3
* JavaScript
* React
* Vite
* Next.js
* Netlify
* GitHub

Remove any technology from this list that is not used in the project.

## Project Structure

A basic HTML project may have the following structure:

```text
eliteview-website/
├── index.html
├── style.css
├── script.js
├── images/
└── README.md
```

A React or Vite project may have the following structure:

```text
eliteview-website/
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md
```

## Running the Website Locally

### HTML, CSS and JavaScript

Download or clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/eliteview-website.git
```

Open the project folder:

```bash
cd eliteview-website
```

Open `index.html` in your browser.

### React or Vite

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/eliteview-website.git
```

Open the project folder:

```bash
cd eliteview-website
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed in the terminal, usually:

```text
http://localhost:5173
```

## Deployment

The website is deployed using Netlify.

Deployment workflow:

```text
Website code → GitHub repository → Netlify → Hostinger domain
```

Every time new changes are pushed to the main GitHub branch, Netlify automatically rebuilds and publishes the website.

To publish an update:

```bash
git add .
git commit -m "Update website"
git push
```

## Domain Configuration

The domain is registered and managed through Hostinger.

The domain DNS records point to Netlify, where the website is hosted.

Example configuration:

```text
A Record
Host: @
Value: 75.2.60.5
```

```text
CNAME Record
Host: www
Value: YOUR-NETLIFY-SITE.netlify.app
```

Always use the exact DNS values displayed in the Netlify domain settings.

## SSL Certificate

Netlify automatically provides and renews a free SSL certificate through Let’s Encrypt.

The website should be accessible securely through:

```text
https://YOUR-DOMAIN.com
```

## Environment Variables

Do not upload private information directly to GitHub.

Sensitive data may include:

* API keys
* Payment credentials
* Database passwords
* Email passwords
* Private service credentials

Store sensitive information in a `.env` file:

```text
API_KEY=your_private_key
```

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
node_modules
dist
.next
```

Environment variables required in production should also be added inside the Netlify project settings.

## Contact

For questions or customer support, contact EliteView IPTV through the official contact methods displayed on the website.

## Legal Notice

This project is intended for lawful streaming and IPTV services only.

The website owner is responsible for ensuring that all advertised channels, videos, trademarks, logos, images, and other digital content are properly licensed or authorized.

This project must not be used to distribute copyrighted content without permission.

## License

All rights reserved.

The EliteView IPTV name, website design, source code, branding, and content may not be copied, redistributed, or resold without authorization.

© 2026 EliteView IPTV.
