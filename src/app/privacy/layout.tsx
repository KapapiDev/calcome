import { SiteChrome } from "@/components/layout/site-chrome";

// Korean root route: locale is a literal, so this stays statically renderable.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="ko">{children}</SiteChrome>;
}
