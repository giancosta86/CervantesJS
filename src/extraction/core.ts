import { TermExtractorOptions } from "@giancosta86/jardinero-sdk";
import { WikiPage } from "@giancosta86/wiki-transform";
import { SpanishTerm } from "../terms";
import { extractTermsFromSpanishBlock } from "./inspectors";

const languageHeaderBeginningRegex = /^\s*==\s*\{\{lengua\|/m;

export function extractTerms(
  page: WikiPage,
  options?: TermExtractorOptions
): SpanishTerm[] {
  const logger = options?.logger;

  if (page.title.includes(":")) {
    logger?.info(
      `Skipping page '${page.title}', as its title contains metainfo characters`
    );
    return [];
  }

  const languageBlocks = page.text.split(languageHeaderBeginningRegex);

  const result = [];

  for (const block of languageBlocks) {
    const isSpanishBlock = block.startsWith("es");

    if (!isSpanishBlock) {
      continue;
    }

    const blockTerms = extractTermsFromSpanishBlock(page.title, block);

    result.push(...blockTerms);
  }

  return result;
}
