import { Readable } from "node:stream";
import { WikiPage } from "@giancosta86/wiki-transform";
import { testTermExtractionTransformsOnMergedPages } from "@giancosta86/jardinero-sdk";
import { SpanishTerm } from "../terms";
import { SpanishTransform } from "./SpanishTransform";
import { expectedTermCatalog, wikiPageCatalog } from "../test/pages";

testTermExtractionTransformsOnMergedPages<WikiPage, SpanishTerm>({
  wikiPageCatalog,
  wikiPageMapper: wikiPage => wikiPage,
  pagesToReadableMapper: pages => Readable.from(pages),
  expectedTermCatalog,
  createExtractionTransforms: () => new SpanishTransform()
});
