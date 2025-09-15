import React from 'react';

interface QuoteProps {
  content: any; // TinaCMS rich-text content
  author?: string;
  role?: string;
  source?: string;
}

export default function Quote({ content, author, role, source }: QuoteProps) {
  return (
    <div className="my-8">
      <blockquote className="relative bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        {/* Quote Icon */}
        <div className="absolute top-4 left-4 text-blue-500 opacity-20">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        {/* Quote Content */}
        <div className="ml-4">
          <div className="text-lg text-gray-800 leading-relaxed">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              // If content is rich-text from TinaCMS, render as HTML or use TinaMarkdown
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>

          {/* Attribution */}
          {(author || role || source) && (
            <footer className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-right">
                {author && (
                  <cite className="block text-gray-900 font-semibold not-italic">
                    — {author}
                  </cite>
                )}
                {role && (
                  <div className="text-sm text-gray-600 mt-1">
                    {role}
                  </div>
                )}
                {source && (
                  <div className="text-sm text-gray-500 mt-1">
                    {source}
                  </div>
                )}
              </div>
            </footer>
          )}
        </div>
      </blockquote>
    </div>
  );
}