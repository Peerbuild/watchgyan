'use client';
import { usePathname } from 'next/navigation';
import FeatherIcon from 'feather-icons-react';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import EditorHeader from '@/features/blog/components/Header';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const navlinks = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Youtube',
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
    <header
      className={
        'absolute top-0 z-50 flex w-full items-center justify-between px-6 py-8 transition-all duration-500 lg:px-12 lg:py-10'
      }
    >
      <Logo />
      <nav className="hidden lg:block">
        <ul className="flex gap-8">
          {navlinks.map((link) => {
            const isActive = path === link.link;
            return (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className={cn(
                    'text-caps2 font-medium uppercase text-muted-foreground transition-colors hover:text-foreground',
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
      <div className="hidden items-center gap-10 text-muted-foreground lg:flex">
        <Button variant={'ghost'} size={'icon'}>
          <FeatherIcon icon="mail" />
        </Button>
      </div>
      <div className="lg:hidden">
        <Button variant={'ghost'} size={'icon'}>
          <FeatherIcon icon="menu" />
        </Button>
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
