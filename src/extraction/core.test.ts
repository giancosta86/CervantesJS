import { extractTerms } from "./core";
import { expectedTermsByPageTitle, loadTestPage } from "./testPages";
import { toJsonSet } from "./_shared.test";

describe("Term extraction", () => {
  it.each([...expectedTermsByPageTitle.entries()])(
    "should extract terms from page '%s'",
    async (title, expectedTerms) => {
      const page = await loadTestPage(title);
      const actualTerms = extractTerms(page);

      expect(toJsonSet(actualTerms)).toEqual(toJsonSet(expectedTerms));
    }
  );

  it("should ignore metadata pages having ':' in the title", async () => {
    const originalPage = await loadTestPage("vino");
    const actualPage = { ...originalPage, title: "Test: Metadata page" };

    const actualTerms = extractTerms(actualPage);

    expect(actualTerms.length).toBe(0);
  });
});
