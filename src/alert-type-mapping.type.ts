import type { DirectiveName } from "./directive-name.enum.js";
import type { GithubAlertType } from "./github-alert.type.js";

export type AlertTypeMapping = Record<GithubAlertType, DirectiveName | string>;
