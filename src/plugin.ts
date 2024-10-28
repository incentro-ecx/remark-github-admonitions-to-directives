import type { Blockquote, Parent, Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { DEFAULT_MAPPING } from "./default-mapping.const.js";
import type { Options } from "./options.type.js";
import { parseGithubAlertBlockquote } from "./parse-github-alert-blockquote.js";

export const remarkGithubAdmonitionsToDirectives: Plugin<
  [options?: Options],
  Root
> = (options) => {
  const { mapping = DEFAULT_MAPPING } = options ?? {};

  return (tree) => {
    visit(
      tree,
      "blockquote",
      (node: Blockquote, index?: number, parent?: Parent) => {
        const githubAlert = parseGithubAlertBlockquote(node);

        if (githubAlert === null) return;

        const directive: ContainerDirective = {
          type: "containerDirective",
          name: mapping[githubAlert.type],
          children: githubAlert.children,
        };

        if (parent === undefined || index === undefined) return;
        parent.children[index] = directive;
      },
    );
  };
};
