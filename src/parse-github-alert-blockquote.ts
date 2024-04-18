import type { Blockquote, Paragraph, Text } from "mdast";
import type { GithubAlert } from "./github-alert.type.js";
import { parseGithubAlertDeclaration } from "./parse-github-alert-declaration.js";

/**
 * Function that checks if a given blockquote is a GitHub alert and returns the
 * parsed alert if it is.
 */
export function parseGithubAlertBlockquote(
  node: Blockquote,
): GithubAlert | null {
  const [firstChild, ...blockQuoteChildren] = node.children;

  if (firstChild?.type !== "paragraph") return null;

  const [firstParagraphChild, ...paragraphChildren] = firstChild.children;

  if (firstParagraphChild?.type !== "text") return null;

  const [possibleTypeDeclaration, ...textNodes] =
    firstParagraphChild.value.split("\n");

  if (possibleTypeDeclaration === undefined) return null;

  const type = parseGithubAlertDeclaration(possibleTypeDeclaration);

  if (type === null) return null;

  const textNodeChildren: Text[] =
    textNodes.length > 0 ? [{ type: "text", value: textNodes.join("\n") }] : [];

  const hasParagraphChildren =
    textNodeChildren.length > 0 || paragraphChildren.length > 0;

  const alertParagraphChildren: Paragraph[] = hasParagraphChildren
    ? [
        {
          type: "paragraph",
          children: [...textNodeChildren, ...paragraphChildren],
        },
      ]
    : [];

  return {
    type,
    children: [...alertParagraphChildren, ...blockQuoteChildren],
  };
}
