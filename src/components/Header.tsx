'use client';
import { usePathname } from 'next/navigation';
import FeatherIcon from 'feather-icons-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import EditorHeader from '@/features/blog/components/Header';
import { cn } from '@/lib/utils';

const navlinks = [
  {
    name: 'About',
    link: '/',
  },
  {
    name: 'Journey',
    link: '#journey',
  },
  {
    name: 'Newsletter',
    link: '#newsletter',
  },
  {
    name: 'blog',
    link: '/blog',
  },
  {
    name: 'Community',
    link: '/community',
  },
];

export const PublicHeader = () => {
  const path = usePathname();

  return (
    <header className="flex items-center justify-between px-12 py-10">
      <h1 className="font-serif text-xl font-medium">WatchGyan</h1>
      <nav>
        <ul className="flex gap-8">
          {navlinks.map((link) => {
            const isActive = path === link.link;
            return (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className={cn(
                    'font-medium uppercase text-foreground/60 transition-colors hover:text-foreground',
                    isActive && 'text-foreground',
                  )}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex gap-8">
        <Button variant={'ghost'} size={'icon'}>
          <FeatherIcon icon="search" />
        </Button>
        <Button className="uppercase">Get in touch</Button>
      </div>
    </header>
  );
};

export const AdminHeader = () => {
  const path = usePathname();

  const isEditorPage = path.startsWith('/admin/blog/write');

  if (isEditorPage) {
    return <EditorHeader />;
  }

  return <div>Header</div>;
};
