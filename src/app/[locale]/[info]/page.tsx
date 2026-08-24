import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InfoPage } from "@/components/layout/info-page";

const englishPages = {
  about: { title: "About CalCome", description: "Learn how CalCome builds clear, practical financial calculators.", sections: [["Clear calculations", "We aim to make inputs, assumptions, and results easy to understand. Only published and verified calculators are presented as available tools."], ["Results are estimates", "Results are informational estimates based on your inputs and the assumptions shown on each calculator. They are not financial, investment, tax, or legal advice."], ["Operating principles", "CalCome prioritizes accessibility, performance, clear explanations, and reproducible calculations."]] },
  privacy: { title: "Privacy Policy", description: "How CalCome handles information when you use the site.", sections: [["Calculator inputs", "Calculator inputs are processed to provide results. Do not enter sensitive personal information unless a calculator explicitly requires it."], ["Service data", "Basic technical and analytics data may be processed to operate, secure, and improve the service."], ["Your choices", "Browser and device controls can be used to manage cookies, local storage, and similar technologies where applicable."]] },
  terms: { title: "Terms of Use", description: "Terms that apply when using CalCome calculators and content.", sections: [["Informational service", "CalCome provides calculators and explanatory content for general information. Results are estimates, not professional advice or guarantees."], ["Use responsibly", "Check important decisions against official sources, product terms, and qualified professionals when appropriate."], ["Service changes", "Calculators, assumptions, and site features may be updated as products, rules, and available information change."]] },
  contact: { title: "Contact", description: "Contact CalCome about calculator issues, corrections, or service feedback.", sections: [["Report an issue", "When reporting a calculator issue, include the calculator name, the values you entered, the result you expected, and the result you received."], ["Corrections", "For policy or rate corrections, include the official source and effective date when possible."], ["General feedback", "Feedback about clarity, accessibility, mobile usability, or missing calculator topics helps us improve CalCome."]] },
} as const;

type InfoKey = keyof typeof englishPages;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; info: string }> }): Promise<Metadata> {
  const { locale, info } = await params;
  if (locale !== "en" || !(info in englishPages)) return {};
  const page = englishPages[info as InfoKey];
  const path = `/en/${info}`;
  return { title: page.title, description: page.description, alternates: { canonical: path, languages: { ko: `/${info}`, en: path, "x-default": `/${info}` } } };
}

export default async function LocalizedInfoPage({ params }: { params: Promise<{ locale: string; info: string }> }) {
  const { locale, info } = await params;
  if (locale !== "en" || !(info in englishPages)) notFound();
  const page = englishPages[info as InfoKey];
  return <InfoPage eyebrow={info.toUpperCase()} title={page.title} description={page.description}>{page.sections.map(([heading, body]) => <section key={heading}><h2 className="text-2xl font-semibold tracking-tight">{heading}</h2><p className="mt-4 leading-8 text-muted-foreground">{body}</p></section>)}</InfoPage>;
}
