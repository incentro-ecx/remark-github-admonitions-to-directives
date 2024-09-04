import { GithubAlertType } from "./github-alert.type.js";

export function mapGithubAlertTypeToDirectiveName(
  type: GithubAlertType,
): string {
  switch (type) {
    case GithubAlertType.NOTE:
      return "note";

    case GithubAlertType.TIP:
      return "tip";

    case GithubAlertType.WARNING:
      return "warning";

    case GithubAlertType.IMPORTANT:
      return "info";

    case GithubAlertType.CAUTION:
      return "danger";
  }
}
