import {
  GITHUB_ALERT_TYPES,
  type GithubAlertType,
} from "./github-alert.type.js";

const GITHUB_ALERT_DECLARATION_REGEX = /^\s*\[\!(?<type>\w+)\]\s*$/;

/**
 * Function that checks if a given string is a Github alert declaration and
 * returns the parsed alert type if it is.
 *
 * A GitHub alert declaration is a string that is structured like this:
 *
 * `[!TYPE]`
 */
export function parseGithubAlertDeclaration(
  text: string,
): false | GithubAlertType {
  const match = text.match(GITHUB_ALERT_DECLARATION_REGEX);

  if (match === null) return false;

  const type = match.groups?.type;

  if (type === undefined) return false;
  if (!GITHUB_ALERT_TYPES.includes(type as GithubAlertType)) return false;

  return type as GithubAlertType;
}
