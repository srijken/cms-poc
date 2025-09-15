---
title: "Getting Started with the CMS"
description: "Learn how to use the local TinaCMS editor"
date: "2024-01-15T10:00:00.000Z"
---

# Getting Started with the CMS

This guide will help you understand how to use the local **TinaCMS** editor to manage your content.

## Local Development

1. Start the development server with TinaCMS:
   ```bash
   npm run tinacms
   ```

2. Navigate to your site at `http://localhost:3000`

3. Access the TinaCMS editor by adding `/admin` to any page URL

## Content Management

The CMS allows you to:

- **Edit Pages**: Modify existing pages like Home and About
- **Create Posts**: Add new blog posts with rich content
- **Upload Media**: Add images and other assets
- **Preview Changes**: See changes in real-time

## File Structure

Content is stored in markdown files:

- Pages: `content/pages/`
- Posts: `content/posts/`
- Media: `public/uploads/`

All changes are saved directly to your local file system, making it easy to version control your content alongside your code.