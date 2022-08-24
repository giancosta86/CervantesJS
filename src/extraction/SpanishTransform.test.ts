import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { FlattenTransform } from "@giancosta86/flatten-transform";
import { SpanishTerm } from "../terms";
import { SpanishTransform } from "./SpanishTransform";
import { toJsonSet } from "./_shared.test";
import { getAllPagesAndTerms } from "./testPages";

describe("The Spanish extraction transform", () => {
  it("should extract the terms from all the test pages", async () => {
    const [pages, expectedTerms] = await getAllPagesAndTerms();

    const extractedTerms: SpanishTerm[] = [];

    await pipeline(
      Readable.from(pages),
      new SpanishTransform(),
      new FlattenTransform().on("data", term => extractedTerms.push(term))
    );

    expect(toJsonSet(extractedTerms)).toEqual(toJsonSet(expectedTerms));
  });
});
