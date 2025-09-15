# CMS POC

A headless CMS proof-of-concept built with Next.js and TinaCMS, featuring minimal JavaScript, strict Content Security Policy, and local-only content management.

## Features

- 🚀 **Static Generation**: Minimal JavaScript footprint with Next.js static export
- 🔒 **Strict CSP**: Content Security Policy preventing unauthorized script execution
- 📝 **Local CMS**: TinaCMS running fully local without external API dependencies
- 🌐 **GitHub Pages**: Automated deployment to GitHub Pages
- ⚡ **Performance**: Optimized for fast loading and minimal client-side processing

## Development

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cms-poc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server with TinaCMS:
   ```bash
   npm run tinacms
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using the CMS

- Access the TinaCMS editor by visiting any page and adding `/admin` to the URL
- Edit pages in `content/pages/`
- Create posts in `content/posts/`
- Upload media to `public/uploads/`

### Building for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## Architecture

### Tech Stack

- **Next.js**: React framework with static site generation
- **TinaCMS**: Git-based headless CMS
- **TypeScript**: Type-safe development
- **GitHub Pages**: Static site hosting

### Content Management

Content is stored as Markdown files with frontmatter:

- **Pages**: `content/pages/*.md`
- **Posts**: `content/posts/*.md`
- **Media**: `public/uploads/`

### Security

The application implements a strict Content Security Policy:

- No inline scripts in production
- Restricted resource loading
- XSS protection
- CSRF protection

### Performance

- Static HTML generation
- Minimal JavaScript bundle
- Optimized images and assets
- CDN-friendly caching

## Deployment

The site automatically deploys to GitHub Pages on push to the main branch. The deployment workflow:

1. Builds the Next.js application
2. Generates static HTML files
3. Uploads to GitHub Pages
4. Configures custom domain (if applicable)

## Project Structure

```
cms-poc/
├── .github/workflows/    # GitHub Actions workflows
├── components/           # React components
├── content/             # Markdown content files
│   ├── pages/          # Website pages
│   └── posts/          # Blog posts
├── lib/                # Utility functions
├── pages/              # Next.js pages
├── public/             # Static assets
├── tina/               # TinaCMS configuration
└── out/                # Generated static site
```

## License

This project is licensed under the ISC License.