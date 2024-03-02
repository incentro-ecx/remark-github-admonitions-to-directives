import type { Blockquote, Parent } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { mapGithubAlertTypeToDirectiveName } from "./map-github-alert-type-to-directive-name.js";
import { parseGithubAlertBlockquote } from "./parse-github-alert-blockquote.js";

export const remarkGithubAdmonitionsToDirectives: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      "blockquote",
      (node: Blockquote, index: number, parent: Parent) => {
        const githubAlert = parseGithubAlertBlockquote(node);

        if (githubAlert === false) return;

        const directive: ContainerDirective = {
          type: "containerDirective",
          name: mapGithubAlertTypeToDirectiveName(githubAlert.type),
          children: githubAlert.children,
        };

        parent.children[index] = directive;
      },
    );
  };
};
