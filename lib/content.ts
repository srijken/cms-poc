import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentData {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  content: string | any; // Can be markdown string or TinaCMS rich-text object
  [key: string]: any;
}

export function getContentBySlug(type: 'pages' | 'posts', slug: string): ContentData | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, type, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Try to parse content as JSON for TinaCMS rich-text, fallback to string
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      parsedContent = content; // Keep as markdown string
    }
    
    return {
      slug: realSlug,
      content: parsedContent,
      ...data,
    } as ContentData;
  } catch (error) {
    console.error(`Error reading ${type}/${slug}:`, error);
    return null;
  }
}

export function getAllContent(type: 'pages' | 'posts'): ContentData[] {
  try {
    const contentDir = path.join(contentDirectory, type);
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    const content = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const slug = file.replace(/\.md$/, '');
        return getContentBySlug(type, slug);
      })
      .filter((item): item is ContentData => item !== null);
    
    // Sort posts by date (newest first)
    if (type === 'posts') {
      content.sort((a, b) => {
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        return dateB.getTime() - dateA.getTime();
      });
    }
    
    return content;
  } catch (error) {
    console.error(`Error reading ${type} directory:`, error);
    return [];
  }
}

export function getAllSlugs(type: 'pages' | 'posts'): string[] {
  try {
    const contentDir = path.join(contentDirectory, type);
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error(`Error reading ${type} directory:`, error);
    return [];
  }
}