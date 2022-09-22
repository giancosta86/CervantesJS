import { Readable, Transform } from "node:stream";
import bz2 from "unbzip2-stream";
import fetch from "node-fetch";
import { LinguisticPlugin } from "@giancosta86/jardinero-sdk";
import { addBatchListener } from "@giancosta86/stream-utils";
import { SqliteWritableBuilder } from "@giancosta86/sqlite-writable";
import { isInProduction } from "@giancosta86/typed-env";
import { FlattenTransform } from "@giancosta86/flatten-transform";
import { WikiTransform } from "@giancosta86/wiki-transform";
import { SpanishTransform } from "./extraction";
import { SPANISH_SQLITE_SCHEMA, createSpanishWritableBuilder } from "./sqlite";

const OFFICIAL_WIKI_URL =
  "https://dumps.wikimedia.org/" +
  "eswiktionary/latest/" +
  "eswiktionary-latest-pages-articles.xml.bz2";

const LOCAL_WIKI_URL =
  "http://localhost:8000/eswiktionary-latest-pages-articles.xml.bz2";

const wiktionaryUrl = isInProduction(true) ? OFFICIAL_WIKI_URL : LOCAL_WIKI_URL;

const PAGE_BATCH_SIZE = 1492;

export class SpanishPlugin extends LinguisticPlugin {
  getId(): string {
    return "info.gianlucacosta.cervantes";
  }

  getName(): string {
    return "CervantesJS";
  }

  getSqliteSchema(): string {
    return SPANISH_SQLITE_SCHEMA;
  }

  async createSourceStreams(): Promise<readonly Readable[]> {
    const response = await fetch(wiktionaryUrl);
    if (!response.ok || !response.body) {
      throw new Error("Error when opening the HTTP(S) URL");
    }

    return [response.body as Readable, bz2()];
  }

  createExtractionTransforms(): readonly Transform[] {
    const wikiTransform = addBatchListener({
      source: new WikiTransform(),
      event: "data",
      eventBatchSize: PAGE_BATCH_SIZE,
      batchListener: processedPages =>
        this.pipelineOutput.sendProcessedPagesNotification(processedPages)
    });

    return [wikiTransform, new SpanishTransform(), new FlattenTransform()];
  }

  createSqliteWritableBuilder(): SqliteWritableBuilder {
    return createSpanishWritableBuilder();
  }

  override getStartupQuery(): string {
    return `SELECT '-tad nouns' AS 'Noun type', COUNT(*) AS Quantity
FROM nouns
WHERE entry LIKE '%tad'
UNION ALL
SELECT '-dad nouns' AS 'Noun type', COUNT(*) AS Quantity
FROM nouns
WHERE entry LIKE '%dad'`;
  }
}
