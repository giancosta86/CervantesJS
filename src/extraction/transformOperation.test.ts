import { WikiPage } from "@giancosta86/wiki-transform";
import { ChunkInput } from "@giancosta86/worker-transform";
import transformOperation from "./transformOperation";
import { expectedTermsByPageTitle, loadTestPage } from "./testPages";
import { toJsonSet } from "./_shared.test";

describe("The transform operation", () => {
  it.each([...expectedTermsByPageTitle.entries()])(
    "should extract terms from page '%s'",
    async (title, expectedTerms) => {
      const page = await loadTestPage(title);

      const chunkInput: ChunkInput<WikiPage> = {
        value: page,
        encoding: "utf8"
      };

      const chunkOutput = transformOperation(chunkInput);

      const terms = chunkOutput.value;

      expect(toJsonSet(terms)).toEqual(toJsonSet(expectedTerms));
    }
  );
});
