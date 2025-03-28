import { JSONContent } from 'novel';
import { useEffect, useState } from 'react';

export default function useHighlightHeading({
  content,
}: {
  content?: string | JSONContent;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const obeserver = new IntersectionObserver(handleObserver, {
      rootMargin: '0% 0% 0% 0px',
    });

    const editorContent = document.querySelector('.BlogContent');
    const elements = editorContent?.querySelectorAll('h1');

    elements?.forEach((elem) => {
      obeserver.observe(elem);
    });

    return () => obeserver.disconnect();
  }, [content]);

  return { activeId };
}
