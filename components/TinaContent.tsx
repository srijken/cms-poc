import React from 'react';
import ImageCarousel from './blocks/ImageCarousel';
import Quote from './blocks/Quote';

interface TinaContentProps {
  content: any; // TinaCMS rich-text content with templates or markdown string
}

export default function TinaContent({ content }: TinaContentProps) {
  if (!content) {
    return null;
  }

  // Handle legacy markdown content
  if (typeof content === 'string') {
    return (
      <div className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(content) }}
        />
      </div>
    );
  }

  // Handle TinaCMS rich-text structure
  if (content.children && Array.isArray(content.children)) {
    return (
      <div className="prose prose-lg max-w-none">
        {content.children.map((item: any, index: number) => renderContent(item, index))}
      </div>
    );
  }

  // Handle simple content
  return <div className="prose prose-lg max-w-none">{renderContent(content, 0)}</div>;
}

function renderContent(item: any, index: number): React.ReactNode {
  if (!item) return null;

  // Handle template blocks (custom blocks)
  if (item._template) {
    const template = item._template;
    
    switch (template) {
      case 'imageCarousel':
        return (
          <ImageCarousel
            key={index}
            title={item.title}
            images={item.images || []}
          />
        );
      
      case 'quote':
        return (
          <Quote
            key={index}
            content={item.content}
            author={item.author}
            role={item.role}
            source={item.source}
          />
        );
      
      default:
        console.warn(`Unknown template: ${template}`);
        return null;
    }
  }

  // Handle standard rich-text elements
  if (item.type) {
    switch (item.type) {
      case 'p':
      case 'paragraph':
        return (
          <p key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </p>
        );
      
      case 'h1':
        return (
          <h1 key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </h1>
        );
      
      case 'h2':
        return (
          <h2 key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </h2>
        );
      
      case 'h3':
        return (
          <h3 key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </h3>
        );
      
      case 'ul':
        return (
          <ul key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </ul>
        );
      
      case 'ol':
        return (
          <ol key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </ol>
        );
      
      case 'li':
        return (
          <li key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </li>
        );
      
      case 'strong':
        return (
          <strong key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </strong>
        );
      
      case 'em':
        return (
          <em key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </em>
        );
      
      case 'code':
        return (
          <code key={index}>
            {item.children?.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )}
          </code>
        );
      
      case 'text':
        return item.text || '';
      
      default:
        // Don't warn for standard HTML elements, just render them generically
        if (item.children && Array.isArray(item.children)) {
          const Tag = item.type as keyof JSX.IntrinsicElements;
          return React.createElement(Tag, { key: index }, 
            item.children.map((child: any, childIndex: number) => 
              renderContent(child, childIndex)
            )
          );
        }
        return null;
    }
  }

  // Handle children array
  if (item.children && Array.isArray(item.children)) {
    return item.children.map((child: any, childIndex: number) => 
      renderContent(child, childIndex)
    );
  }

  // Handle text content
  if (typeof item === 'string') {
    return item;
  }

  // Handle text property
  if (item.text) {
    return item.text;
  }

  return null;
}

// Simple markdown to HTML converter for basic formatting (legacy support)
function convertMarkdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Code blocks
    .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|p|l])(.+)$/gm, '<p>$1</p>')
    // Clean up
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1');
}