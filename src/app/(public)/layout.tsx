import { PublicHeader } from '@/components/Header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
