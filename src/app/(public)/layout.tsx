import { PublicHeader } from "@/components/Header";
import LenisScroll from "@/components/LenisScroll";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisScroll>
      <GoogleAnalytics gaId="G-8V574HGLM5" />
      <div>
        <PublicHeader />
        {children}
      </div>
    </LenisScroll>
  );
}
