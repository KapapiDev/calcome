import { AboutContent } from "@/components/content/about-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "소개",
  description:
    "CalCome의 계산 도구, 콘텐츠 책임, 공개 개발 기록과 검증·수정 기준을 안내합니다.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent locale="ko" />;
}
