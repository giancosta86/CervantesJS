import { extractPartialTerm, PartialTerm } from "./partialTerm";
import { SpanishTerm } from "../../terms";
import { loadSpanishRegex } from "./regexes";

type PotentialTermMatchInspector = (
  partialTerm: PartialTerm,
  potentialTermMatch: RegExpMatchArray
) => SpanishTerm | null;

const inspectorsByRegex: [RegExp, PotentialTermMatchInspector][] = [];

export function extractTermsFromSpanishBlock(
  pageTitle: string,
  spanishBlock: string
): SpanishTerm[] {
  const partialTerm = extractPartialTerm(pageTitle, spanishBlock);

  const result: SpanishTerm[] = [];

  for (const [potentialTermRegex, inspector] of inspectorsByRegex) {
    for (const potentialTermMatch of spanishBlock.matchAll(
      potentialTermRegex
    )) {
      const spanishTerm = inspector(partialTerm, potentialTermMatch);
      if (spanishTerm) {
        result.push(spanishTerm);
      }
    }
  }

  return result;
}

export function registerInspector(
  regexName: string,
  inspector: PotentialTermMatchInspector,
  flags = ""
): void {
  const regex = loadSpanishRegex(regexName, flags);

  inspectorsByRegex.push([regex, inspector]);
}

export function registerPartialTermOnlyInspector(
  termType: SpanishTerm["type"]
): void {
  registerInspector(
    termType,
    partialTerm =>
      ({
        type: termType,
        entry: partialTerm.entry,
        pronunciation: partialTerm.pronunciation
      } as SpanishTerm)
  );
}
