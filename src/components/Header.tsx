import { playflairDisplay } from '@/lib/fonts';
import FeatherIcon from 'feather-icons-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const navlinks = [
  {
    name: 'About',
    link: '#about',
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

const Header = () => {
  return (
    <header className="flex items-center justify-between px-12 py-10">
      <h1 className={`${playflairDisplay.className} text-xl font-medium`}>
        WatchGyan
      </h1>
      <nav>
        <ul className="flex gap-8">
          {navlinks.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className="font-medium uppercase text-foreground/60 transition-colors hover:text-foreground"
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

export default Header;
