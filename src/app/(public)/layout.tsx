import { PublicHeader } from "@/components/Header";
import LenisScroll from "@/components/LenisScroll";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisScroll>
      <div>
        <PublicHeader />
        {children}
      </div>
    </LenisScroll>
  );
}
