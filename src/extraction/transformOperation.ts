import { WikiPage } from "@giancosta86/wiki-transform";
import { ChunkInput, ChunkOutput } from "@giancosta86/worker-transform";
import { extractTerms } from "./core";
import { SpanishTerm } from "../terms";

function extractTermsInThread({
  value: page
}: ChunkInput<WikiPage>): ChunkOutput<SpanishTerm[]> {
  return { value: extractTerms(page) };
}

export = extractTermsInThread;
