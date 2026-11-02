import { EditorialPolicyPage } from "@/components/content/editorial-policy-page";
import { editorialPolicy } from "@/content/editorial-policy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: editorialPolicy.ko.title,
  description: editorialPolicy.ko.description,
  path: "/editorial-policy",
});

export default function Page() {
  return <EditorialPolicyPage locale="ko" />;
}
