import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Renders assistant replies from the backend (which come back as Markdown:
// links, bold, lists, bare emails/URLs) into styled HTML. remark-gfm autolinks
// bare emails/URLs so the CTA contact info is always clickable. Styling lives in
// the `.chat-markdown` rules in index.css. Raw HTML is not rendered (XSS-safe).
export default function ChatMarkdown({ text }: { text: string }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
