import ReactMarkdown from "react-markdown";
import { normalizePremiosContent } from "@/lib/premios-content";

type PremiosMarkdownProps = {
  content: string;
  className?: string;
};

export function PremiosMarkdown({ content, className = "" }: PremiosMarkdownProps) {
  const { markdown, wasCompactTiers } = normalizePremiosContent(content);

  const rootClass = [
    "premios-markdown",
    wasCompactTiers ? "premios-markdown--tiers" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass.trim()}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="premios-markdown__link"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
