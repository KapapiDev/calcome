import Link from "next/link";
import { InfoPage } from "@/components/layout/info-page";
import {
  developmentRepository,
  editorialPolicy,
  editorialPolicyReviewedOn,
} from "@/content/editorial-policy";

const linkClass =
  "inline-flex min-h-11 items-center text-primary underline underline-offset-4";

export function EditorialPolicyPage({ locale }: { locale: "ko" | "en" }) {
  const copy = editorialPolicy[locale];
  return (
    <InfoPage
      eyebrow="EDITORIAL"
      title={copy.title}
      description={copy.description}
    >
      <p className="text-sm text-muted-foreground">
        {copy.byline}
        <time dateTime={editorialPolicyReviewedOn}>
          {editorialPolicyReviewedOn}
        </time>
      </p>
      {copy.sections.map(([heading, body]) => (
        <section key={heading}>
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{body}</p>
        </section>
      ))}
      <a className={linkClass} href={developmentRepository}>
        {copy.repositoryLabel}
      </a>
      <section id="updates" className="scroll-mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          {copy.updatesTitle}
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          {copy.updatesIntro}
        </p>
        <ol className="mt-6 space-y-6">
          {copy.changes.map((change) => (
            <li key={change.title} className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                <time dateTime={change.date}>{change.date}</time>
              </p>
              <h3 className="mt-2 text-lg font-semibold">{change.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {change.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6">
                <Link className={linkClass} href={change.href}>
                  {change.label}
                </Link>
                <a className={linkClass} href={change.source}>
                  {copy.sourceLabel}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Link
        className={linkClass}
        href={locale === "ko" ? "/contact" : "/en/contact"}
      >
        {copy.reporting}
      </Link>
    </InfoPage>
  );
}
