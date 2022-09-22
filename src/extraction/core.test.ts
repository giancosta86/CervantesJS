import { testTermExtractor } from "@giancosta86/jardinero-sdk";
import { WikiPage } from "@giancosta86/wiki-transform";
import { expectedTermCatalog, wikiPageCatalog } from "../test/pages";
import { extractTerms } from "./core";
import { SpanishTerm } from "../terms";

testTermExtractor<WikiPage, SpanishTerm>({
  wikiPageCatalog,
  wikiPageMapper: wikiPage => wikiPage,
  termExtractor: extractTerms,
  expectedTermCatalog
});

describe("Term extraction", () => {
  it("should ignore metadata pages having ':' in the title", async () => {
    const originalPage = await wikiPageCatalog.loadPage("vino");
    const actualPage = { ...originalPage, title: "Test: Metadata page" };

    const actualTerms = extractTerms(actualPage);

    expect(actualTerms.length).toBe(0);
  });
});
