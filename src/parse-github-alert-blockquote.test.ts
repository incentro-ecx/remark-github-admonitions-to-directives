import type { Blockquote } from "mdast";
import { describe, expect, it } from "vitest";
import { GithubAlertType } from "./github-alert.type.js";
import { parseGithubAlertBlockquote } from "./parse-github-alert-blockquote.js";

describe("parse-github-alert-blockquote", () => {
  it("should return false if the blockquote has no children", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toBe(false);
  });

  it("should return false if the first chlid of the blockquote is not a paragraph", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "heading",
          depth: 1,
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toBe(false);
  });

  it("should return false if the first child of the paragraph is not a text node", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "strong",
              children: [
                {
                  type: "text",
                  value: "test",
                },
              ],
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toBe(false);
  });

  it("should return false if the first paragraph child doesn't contain a valid alert declaration", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toBe(false);
  });

  it("should return the parsed alert if the blockquote is a valid alert", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[!NOTE]",
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toEqual({
      type: GithubAlertType.NOTE,
      children: [],
    });
  });

  it("should handle an alert body", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[!NOTE]",
            },
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toEqual({
      type: GithubAlertType.NOTE,
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    });
  });

  it("should handle multiple paragraphs", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[!NOTE]",
            },
            {
              type: "text",
              value: "test",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toEqual({
      type: GithubAlertType.NOTE,
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    });
  });

  it("should handle text separated by newlines", () => {
    const blockquote: Blockquote = {
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[!NOTE]\ntest",
            },
          ],
        },
      ],
    };

    const result = parseGithubAlertBlockquote(blockquote);

    expect(result).toEqual({
      type: GithubAlertType.NOTE,
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "test",
            },
          ],
        },
      ],
    });
  });
});
