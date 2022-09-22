import { join } from "node:path";
import { testTermExtractionOperation } from "@giancosta86/jardinero-sdk";
import { expectedTermCatalog, wikiPageCatalog } from "../test/pages";

testTermExtractionOperation({
  wikiPageCatalog,
  wikiPageMapper: wikiPage => wikiPage,
  expectedTermCatalog,
  transformOperationModuleId: join(__dirname, "transformOperation")
});
