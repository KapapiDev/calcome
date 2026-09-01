type DirectoryLocale = "ko" | "en";

type DirectoryReturnContext = {
  locale: DirectoryLocale;
  scrollY: number;
};

const DIRECTORY_RETURN_CONTEXT_STORAGE_KEY =
  "calcome:calculator-directory-return-context";

function getSessionStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function saveDirectoryReturnContext(locale: DirectoryLocale) {
  const storage = getSessionStorage();
  if (!storage || typeof window === "undefined") return;

  const context: DirectoryReturnContext = {
    locale,
    scrollY: Math.max(0, Math.round(window.scrollY)),
  };

  try {
    storage.setItem(
      DIRECTORY_RETURN_CONTEXT_STORAGE_KEY,
      JSON.stringify(context),
    );
  } catch {
    // Directory navigation remains usable when browser storage is unavailable.
  }
}

export function consumeDirectoryReturnContext(locale: DirectoryLocale) {
  const storage = getSessionStorage();
  if (!storage) return null;

  let rawContext: string | null = null;
  try {
    rawContext = storage.getItem(DIRECTORY_RETURN_CONTEXT_STORAGE_KEY);
    storage.removeItem(DIRECTORY_RETURN_CONTEXT_STORAGE_KEY);
  } catch {
    return null;
  }

  if (!rawContext) return null;

  try {
    const context = JSON.parse(rawContext) as Partial<DirectoryReturnContext>;
    if (
      context.locale !== locale ||
      typeof context.scrollY !== "number" ||
      !Number.isFinite(context.scrollY) ||
      context.scrollY < 0
    ) {
      return null;
    }

    return Math.round(context.scrollY);
  } catch {
    return null;
  }
}
