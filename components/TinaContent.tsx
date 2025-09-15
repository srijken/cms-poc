import ImageCarousel from './blocks/ImageCarousel';
import Quote from './blocks/Quote';

interface TinaContentProps {
  content: any; // TinaCMS rich-text content with templates
}

export default function TinaContent({ content }: TinaContentProps) {
  if (!content) {
    return null;
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

  // Handle template blocks
  if (item._template || item.type) {
    const template = item._template || item.type;
    
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
        console.warn(`Unknown content type: ${item.type}`);
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