import { loadDefaultJapaneseParser } from "budoux/dist/index.js";
import { isElement } from "hast-util-is-element";

import type { HTMLProcessingParser } from "budoux";
import type { Parent, RootContent } from "hast";
import type { Plugin } from "unified";

export type Options = {
  className?: string[] | string;
};

let parser: HTMLProcessingParser;

const processChildren = (parent: Parent, options: Options = {}): void => {
  const children: RootContent[] = [];
  let wbrInserted = false;
  const pushWbr = (): void => {
    wbrInserted = true;
    children.push({
      type: "element",
      tagName: "wbr",
      properties: {},
      children: [],
    });
  };

  for (const child of parent.children) {
    if (child.type === "text") {
      if (!parser) {
        parser = loadDefaultJapaneseParser();
      }

      if (children.length > 0) {
        pushWbr();
      }

      for (const [index, value] of parser.parse(child.value).entries()) {
        if (index > 0) {
          pushWbr();
        }

        children.push({
          type: "text",
          value,
        });
      }
    } else {
      if ("children" in child) {
        processChildren(child, options);
      }

      if (children.at(-1)?.type === "text") {
        pushWbr();
      }

      children.push(child);
    }
  }

  if (wbrInserted && isElement(parent) && options.className !== undefined) {
    parent.properties.className ??= [];

    if (Array.isArray(parent.properties.className)) {
      if (Array.isArray(options.className)) {
        parent.properties.className.push(...options.className);
      } else {
        parent.properties.className.push(options.className);
      }
    }
  }

  parent.children = children;
};

const rehypeBudoux: Plugin<[Options?], Parent> = (options) => (node) => {
  processChildren(node, options);
};

export default rehypeBudoux;
