---
title: "Blocks Test"
description: "Testing TinaCMS blocks functionality"
---

{
  "type": "root",
  "children": [
    {
      "type": "h1",
      "children": [
        {
          "type": "text",
          "text": "Blocks Test Page"
        }
      ]
    },
    {
      "type": "p",
      "children": [
        {
          "type": "text",
          "text": "This page demonstrates the Image Carousel and Quote blocks working."
        }
      ]
    },
    {
      "_template": "imageCarousel",
      "title": "Sample Carousel",
      "images": [
        {
          "src": "https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Image+1",
          "alt": "Sample image 1",
          "caption": "This is the first image in our carousel"
        },
        {
          "src": "https://via.placeholder.com/800x400/10B981/FFFFFF?text=Image+2",
          "alt": "Sample image 2", 
          "caption": "This is the second image in our carousel"
        },
        {
          "src": "https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Image+3",
          "alt": "Sample image 3",
          "caption": "This is the third image in our carousel"
        }
      ]
    },
    {
      "_template": "quote",
      "content": "The best way to predict the future is to create it.",
      "author": "Peter Drucker",
      "role": "Management Consultant",
      "source": "Innovation and Entrepreneurship"
    },
    {
      "type": "h2",
      "children": [
        {
          "type": "text",
          "text": "Another Quote Example"
        }
      ]
    },
    {
      "_template": "quote",
      "content": "Design is not just what it looks like and feels like. Design is how it works.",
      "author": "Steve Jobs",
      "role": "Co-founder of Apple",
      "source": "New York Times, 2003"
    }
  ]
}