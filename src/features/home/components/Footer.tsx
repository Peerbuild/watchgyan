import Logo from '@/components/Logo';
import FeatherIcon from 'feather-icons-react';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-lg space-y-6 p-6 text-center">
      <Logo />
      <p>
        Note: The program doesn&apos;t guarantee success, it is up to students
        to implement and assess to attain desired results.
      </p>
      <div className="flex justify-center gap-5 text-primary">
        <FeatherIcon icon="mail" size={20} />
        <FeatherIcon icon="phone" size={20} />
      </div>
      <p className="text-md">© Copyright 2025 · All rights reserved</p>
    </footer>
  );
}
