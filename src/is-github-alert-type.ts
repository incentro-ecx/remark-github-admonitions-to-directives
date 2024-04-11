import {GITHUB_ALERT_TYPES, type GithubAlertType} from "./github-alert.type.js";

export function isGithubAlertType(type: unknown): type is GithubAlertType {
  return GITHUB_ALERT_TYPES.includes(type as GithubAlertType);
}