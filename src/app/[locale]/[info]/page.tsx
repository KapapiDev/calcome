import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import GuidesPage from "@/app/guides/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import { InfoPage } from "@/components/layout/info-page";

const englishPages = {
  about: {
    title: "About CalCome",
    description:
      "Learn how CalCome builds clear, practical financial calculators.",
    sections: [
      [
        "Clear calculations",
        "We aim to make inputs, assumptions, and results easy to understand. Only published and verified calculators are presented as available tools.",
      ],
      [
        "Results are estimates",
        "Results are informational estimates based on your inputs and the assumptions shown on each calculator. They are not financial, investment, tax, or legal advice.",
      ],
      [
        "Operating principles",
        "CalCome prioritizes accessibility, performance, clear explanations, and reproducible calculations.",
      ],
    ],
  },
  guides: {
    title: "How to Use Calculator Results for Decisions",
    description:
      "A practical CalCome guide to comparing, stress-testing, and verifying calculator results before making a financial decision.",
    sections: [
      [
        "1. Write the decision as one question",
        "Start with the decision, not the calculation. Define what the result needs to answer, such as whether a monthly payment is affordable, which option has the lower total cost, or how long a goal may take. A clear question keeps irrelevant numbers out of the comparison.",
      ],
      [
        "2. Separate facts, assumptions, and variables",
        "Distinguish values you can verify today from estimates and values that may change. For influential assumptions such as rates or future returns, compare conservative, baseline, and optimistic scenarios instead of relying on one forecast.",
      ],
      [
        "3. Test how sensitive the result is",
        "Change one important input at a time and watch how much the result moves. If a small input change causes a large output change, the calculation is more useful for identifying a sensitive variable than for producing a precise forecast.",
      ],
      [
        "4. Check costs, rules, and product terms separately",
        "Fees, taxes, eligibility rules, effective dates, and product-specific terms can change the real outcome. Before an important decision, review the calculator assumptions and verification date, then confirm policy-sensitive conditions with current official sources and actual product terms.",
      ],
      [
        "5. Turn the number into an action threshold",
        "Translate the result into a rule you can use, such as a maximum monthly payment, minimum emergency reserve, or acceptable loss range. This turns a calculator output from an isolated number into a decision aid.",
      ],
      [
        "Before and after you calculate",
        "Ask whether your decision question is clear, which inputs are facts versus assumptions, whether you tested alternative scenarios, what costs or conditions are excluded, whether policy-sensitive inputs were checked against current official sources, and what action threshold follows from the result. CalCome results are informational estimates, not financial, investment, tax, or legal advice.",
      ],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How CalCome handles information when you use the site.",
    sections: [
      [
        "Calculator inputs",
        "Calculator inputs are processed to provide results. Do not enter sensitive personal information unless a calculator explicitly requires it.",
      ],
      [
        "Service data",
        "Basic technical and analytics data may be processed to operate, secure, and improve the service.",
      ],
      [
        "Your choices",
        "Browser and device controls can be used to manage cookies, local storage, and similar technologies where applicable.",
      ],
    ],
  },
  terms: {
    title: "Terms of Use",
    description: "Terms that apply when using CalCome calculators and content.",
    sections: [
      [
        "Informational service",
        "CalCome provides calculators and explanatory content for general information. Results are estimates, not professional advice or guarantees.",
      ],
      [
        "Use responsibly",
        "Check important decisions against official sources, product terms, and qualified professionals when appropriate.",
      ],
      [
        "Service changes",
        "Calculators, assumptions, and site features may be updated as products, rules, and available information change.",
      ],
    ],
  },
  contact: {
    title: "Contact",
    description:
      "Contact CalCome about calculator issues, corrections, or service feedback.",
    sections: [
      [
        "Report an issue",
        "When reporting a calculator issue, include the calculator name, the values you entered, the result you expected, and the result you received.",
      ],
      [
        "Corrections",
        "For policy or rate corrections, include the official source and effective date when possible.",
      ],
      [
        "General feedback",
        "Feedback about clarity, accessibility, mobile usability, or missing calculator topics helps us improve CalCome.",
      ],
    ],
  },
} as const;

type InfoKey = keyof typeof englishPages;

const koreanPages: Record<InfoKey, React.ComponentType> = {
  about: AboutPage,
  guides: GuidesPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  contact: ContactPage,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; info: string }>;
}): Promise<Metadata> {
  const { locale, info } = await params;
  if (!(info in englishPages)) return {};
  if (locale === "ko") {
    return {
      alternates: {
        canonical: `/${info}`,
        languages: {
          ko: `/${info}`,
          en: `/en/${info}`,
          "x-default": `/${info}`,
        },
      },
    };
  }
  if (locale !== "en") return {};
  const page = englishPages[info as InfoKey];
  const path = `/en/${info}`;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
      languages: { ko: `/${info}`, en: path, "x-default": `/${info}` },
    },
  };
}

export default async function LocalizedInfoPage({
  params,
}: {
  params: Promise<{ locale: string; info: string }>;
}) {
  const { locale, info } = await params;
  if (!(info in englishPages) || (locale !== "ko" && locale !== "en")) {
    notFound();
  }
  if (locale === "ko") {
    const KoreanPage = koreanPages[info as InfoKey];
    return <KoreanPage />;
  }
  const page = englishPages[info as InfoKey];
  return (
    <InfoPage
      eyebrow={info.toUpperCase()}
      title={page.title}
      description={page.description}
    >
      {page.sections.map(([heading, body]) => (
        <section key={heading}>
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{body}</p>
        </section>
      ))}
    </InfoPage>
  );
}
