import { join } from "node:path";
import { WorkerTransform } from "@giancosta86/worker-transform";
import { WikiPage } from "@giancosta86/wiki-transform";
import { SpanishTerm } from "../terms";

export class SpanishTransform extends WorkerTransform<WikiPage, SpanishTerm[]> {
  constructor() {
    super(join(__dirname, "transformOperation"));
  }
}
