import { SiteChrome } from "@/components/layout/site-chrome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="ko">{children}</SiteChrome>;
}
