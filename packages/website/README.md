# 🥭 MangoJS Website

The official landing page for **MangoJS** - The AI-First Backend Framework for Node.js.

![MangoJS](https://img.shields.io/badge/MangoJS-AI--First%20Framework-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge)

## 🌐 Live Demo

Visit the website at: [mangojs.dev](https://mangojs.dev) _(coming soon)_

## ✨ Features

- **Stunning Dark Theme** - Modern design with mango-inspired color palette
- **Interactive Animations** - Typing terminal effect, floating particles, cursor glow
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Performance Optimized** - Lightweight, fast-loading static site
- **Accessibility Ready** - Supports reduced motion preferences

## 🚀 Quick Start

### Local Development

```bash
# Using Python's built-in server
python3 -m http.server 8080

# Or using Node.js http-server
npx http-server -p 8080
```

Then open [http://localhost:8080](http://localhost:8080)

### Docker

```bash
# Build and run
docker-compose up -d

# Or build manually
docker build -t mangojs-website .
docker run -d -p 80:80 mangojs-website
```

## 📁 Project Structure

```
mangojs-website/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # All styles (variables, components, responsive)
├── js/
│   └── main.js         # Interactive effects and animations
├── images/             # Static assets
├── Dockerfile          # nginx-alpine based container
├── docker-compose.yml  # Container orchestration
├── nginx.conf          # Optimized nginx configuration
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions CI/CD
```

## 🐳 Docker Configuration

The website runs on **nginx:alpine** for minimal footprint (~5MB).

Features:

- Gzip compression enabled
- Static asset caching (1 year)
- Security headers (XSS, Content-Type sniffing protection)
- Health checks

## 🔄 CI/CD Deployment

The repository includes a GitHub Actions workflow for automatic deployment to a VPS.

### Required GitHub Secrets & Variables

| Type     | Name                | Description                    |
| -------- | ------------------- | ------------------------------ |
| Variable | `VPS_HOST`          | VPS IP address or hostname     |
| Variable | `VPS_USERNAME`      | SSH username                   |
| Variable | `VPS_SSH_PORT`      | SSH port (default: 22)         |
| Secret   | `VPS_SSH_KEY`       | Private SSH key                |
| Secret   | `SLACK_WEBHOOK_URL` | Slack notifications (optional) |

### Deployment Branches

| Branch                 | Environment | Port |
| ---------------------- | ----------- | ---- |
| `main` / `release/app` | Production  | 80   |
| `release/test`         | Test        | 8080 |

### Deploy Manually

```bash
# Push to main for production
git push origin main

# Or trigger manually via GitHub Actions
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --mango-orange: #ff6b35;
  --mango-yellow: #ffa500;
  --mango-gold: #ffb347;
  --bg-primary: #0a0a0f;
  /* ... */
}
```

### Content

Update sections in `index.html`:

- Hero section text and stats
- Feature cards
- Code examples
- Installation commands

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **MangoJS Framework**: [github.com/mangojs/mangojs](https://github.com/mangojs/mangojs)
- **Documentation**: Coming soon
- **NPM Package**: `mangojs-core`

---

Built with ❤️ for developers who love clean code.
