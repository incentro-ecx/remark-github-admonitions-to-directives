import type { Blockquote, Paragraph, Text } from "mdast";
import type { GithubAlert } from "./github-alert.type.js";
import { parseGithubAlertDeclaration } from "./is-github-alert-declaration.js";

/**
 * Function that checks if a given blockquote is a GitHub alert and returns the
 * parsed alert if it is.
 */
export function parseGithubAlertBlockquote(
  node: Blockquote,
): false | GithubAlert {
  const [firstChild, ...blockQuoteChildren] = node.children;

  if (firstChild === undefined) return false;
  if (firstChild.type !== "paragraph") return false;

  const [firstParagraphChild, ...paragraphChildren] = firstChild.children;

  if (firstParagraphChild === undefined) return false;
  if (firstParagraphChild.type !== "text") return false;

  const [possibleTypeDeclaration, ...textNodes] =
    firstParagraphChild.value.split("\n");

  if (possibleTypeDeclaration === undefined) return false;

  const type = parseGithubAlertDeclaration(possibleTypeDeclaration);

  if (type === false) return false;

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
