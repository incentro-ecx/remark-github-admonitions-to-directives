import { remark } from "remark";
import remarkDirective from "remark-directive";
import { describe, expect, it } from "vitest";
import { remarkGithubAdmonitionsToDirectives } from "./plugin.js";

async function process(input: string): Promise<string> {
  const file = await remark()
    .use(remarkGithubAdmonitionsToDirectives)
    .use(remarkDirective)
    .process(input);

  return file.toString();
}

describe("remark-github-admonitions-to-directives", () => {
  it("should be usable as a remark plugin", async () => {
    const result = await process("# test");

    expect(result).toMatchInlineSnapshot(`
      "# test
      "
    `);
  });

  it("should convert a note admonition to a note directive", async () => {
    const result = await process(`> [!NOTE]`);

    expect(result).toMatchInlineSnapshot(`
      ":::note
      :::
      "
    `);
  });

  it("should handle nested content", async () => {
    const result = await process(`> [!NOTE]
> test
> > nested blockquote`);

    expect(result).toMatchInlineSnapshot(`
      ":::note
      test

      > nested blockquote
      :::
      "
    `);
  });
});
