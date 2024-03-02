import type { BlockContent, DefinitionContent } from "mdast";

export enum GithubAlertType {
  NOTE = "NOTE",
  TIP = "TIP",
  IMPORTANT = "IMPORTANT",
  WARNING = "WARNING",
  CAUTION = "CAUTION",
}

export const GITHUB_ALERT_TYPES = [
  GithubAlertType.NOTE,
  GithubAlertType.TIP,
  GithubAlertType.IMPORTANT,
  GithubAlertType.WARNING,
  GithubAlertType.CAUTION,
];

export type GithubAlert = {
  type: GithubAlertType;
  children: (BlockContent | DefinitionContent)[];
};
