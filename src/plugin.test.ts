import { Readable } from "node:stream";
import { testPluginExtractionTransformsOnMergedPages } from "@giancosta86/jardinero-sdk";
import { wrapXmlIterable } from "@giancosta86/stream-utils";
import { wikiPageToXml } from "@giancosta86/wiki-transform";
import { SpanishPlugin } from "./plugin";
import { wikiPageCatalog, expectedTermCatalog } from "./test/pages";

testPluginExtractionTransformsOnMergedPages({
  wikiPageCatalog,

  wikiPageMapper: wikiPageToXml,

  pluginClass: SpanishPlugin,

  expectedTermCatalog: expectedTermCatalog,

  pagesToReadableMapper: pages =>
    Readable.from(wrapXmlIterable(pages), { objectMode: false })
});
