import type { AlertTypeMapping } from "./alert-type-mapping.type.js";
import { DirectiveName } from "./directive-name.enum.js";
import { GithubAlertType } from "./github-alert.type.js";

export const DEFAULT_MAPPING: AlertTypeMapping = {
  [GithubAlertType.NOTE]: DirectiveName.NOTE,
  [GithubAlertType.TIP]: DirectiveName.TIP,
  [GithubAlertType.WARNING]: DirectiveName.WARNING,
  [GithubAlertType.IMPORTANT]: DirectiveName.INFO,
  [GithubAlertType.CAUTION]: DirectiveName.DANGER,
};
