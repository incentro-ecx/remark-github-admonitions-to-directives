import { remark } from "remark";
import remarkDirective from "remark-directive";
import { describe, expect, it } from "vitest";
import type { AlertTypeMapping } from "./alert-type-mapping.type.js";
import { DEFAULT_MAPPING } from "./default-mapping.const.js";
import { DirectiveName } from "./directive-name.enum.js";
import { GithubAlertType } from "./github-alert.type.js";
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

  it("should convert a tip admonition to a tip directive", async () => {
    const result = await process(`> [!TIP]`);

    expect(result).toMatchInlineSnapshot(`
      ":::tip
      :::
      "
    `);
  });

  it("should convert a important admonition to an info directive", async () => {
    const result = await process(`> [!IMPORTANT]`);

    expect(result).toMatchInlineSnapshot(`
      ":::info
      :::
      "
    `);
  });

  it("should convert a warning admonition to a warning directive", async () => {
    const result = await process(`> [!WARNING]`);

    expect(result).toMatchInlineSnapshot(`
      ":::warning
      :::
      "
    `);
  });

  it("should convert a caution admonition to a danger directive", async () => {
    const result = await process(`> [!CAUTION]`);

    expect(result).toMatchInlineSnapshot(`
      ":::danger
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

  it("should allow customizing the directive mapping via the options", async () => {
    const input = `
> [!NOTE]

> [!TIP]

> [!IMPORTANT]

> [!WARNING]

> [!CAUTION]
    `;

    const mapping: AlertTypeMapping = {
      [GithubAlertType.NOTE]: DirectiveName.DANGER,
      [GithubAlertType.TIP]: DirectiveName.WARNING,
      [GithubAlertType.IMPORTANT]: DirectiveName.TIP,
      [GithubAlertType.WARNING]: DirectiveName.INFO,
      [GithubAlertType.CAUTION]: DirectiveName.NOTE,
    };

    const file = await remark()
      .use(remarkGithubAdmonitionsToDirectives, { mapping })
      .use(remarkDirective)
      .process(input);

    const result = file.toString();

    expect(result).toMatchInlineSnapshot(`
      ":::danger
      :::

      :::warning
      :::

      :::tip
      :::

      :::info
      :::

      :::note
      :::
      "
    `);
  });

  it("should allow customizing the default mapping", async () => {
    const mapping: AlertTypeMapping = {
      ...DEFAULT_MAPPING,
      [GithubAlertType.IMPORTANT]: DirectiveName.WARNING,
    };

    const input = `
> [!IMPORTANT]
> content
`;

    const file = await remark()
      .use(remarkGithubAdmonitionsToDirectives, { mapping })
      .use(remarkDirective)
      .process(input);

    const result = file.toString();

    expect(result).toMatchInlineSnapshot(`
      ":::warning
      content
      :::
      "
    `);
  });
});
