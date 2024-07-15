import { h } from "hastscript";
import { rehype } from "rehype";

import rehypeBudoux from "@/index.js";

describe("Basic Processing", () => {
  it("Add wbr elements next to non-text nodes as well", async () => {
    const result = await rehype()
      .use(rehypeBudoux)
      .run(h("p", "こんにちは、", h("a", { href: "/" }, "世界"), "！"));

    expect(result).toEqual(
      h(
        "p",
        "こんに",
        h("wbr"),
        "ちは、",
        h("wbr"),
        h("a", { href: "/" }, "世界"),
        h("wbr"),
        "！",
      ),
    );
  });

  it("No wbr element is added to the end", async () => {
    const result = await rehype()
      .use(rehypeBudoux)
      .run(h("p", "こんにちは、", h("a", { href: "/" }, "世界")));

    expect(result).toEqual(
      h(
        "p",
        "こんに",
        h("wbr"),
        "ちは、",
        h("wbr"),
        h("a", { href: "/" }, "世界"),
      ),
    );
  });

  it("No wbr element is added at the beginning", async () => {
    const result = await rehype()
      .use(rehypeBudoux)
      .run(h("p", h("a", { href: "/" }, "世界"), "、こんにちは！"));

    expect(result).toEqual(
      h(
        "p",
        h("a", { href: "/" }, "世界"),
        h("wbr"),
        "、",
        h("wbr"),
        "こんに",
        h("wbr"),
        "ちは！",
      ),
    );
  });

  it("No wbr element is added to the end", async () => {
    const result = await rehype()
      .use(rehypeBudoux)
      .run(
        h(
          "p",
          "こんにちは、",
          h("a", { href: "/" }, "世"),
          h("a", { href: "/" }, "界"),
          "！",
        ),
      );

    expect(result).toEqual(
      h(
        "p",
        "こんに",
        h("wbr"),
        "ちは、",
        h("wbr"),
        h("a", { href: "/" }, "世"),
        h("a", { href: "/" }, "界"),
        h("wbr"),
        "！",
      ),
    );
  });

  it("The wbr element is properly inserted", async () => {
    const result = await rehype()
      .use(rehypeBudoux)
      .run(h("p", "こんにちは、世界！"));

    expect(result).toEqual(
      h("p", "こんに", h("wbr"), "ちは、", h("wbr"), "世界！"),
    );
  });

  it("nested tree", async () => {
    const result = await rehype()
      .use(rehypeBudoux)
      .run(h(undefined, h("p", "こんにちは、世界！")));

    expect(result).toEqual(
      h(undefined, h("p", "こんに", h("wbr"), "ちは、", h("wbr"), "世界！")),
    );
  });

  it("A single class name is properly assigned", async () => {
    const result = await rehype()
      .use(rehypeBudoux, { className: "budoux-breaked" })
      .run(h("p", "こんにちは、世界！"));

    expect(result).toEqual(
      h(
        "p",
        { className: "budoux-breaked" },
        "こんに",
        h("wbr"),
        "ちは、",
        h("wbr"),
        "世界！",
      ),
    );
  });

  it("Multiple class names are properly assigned", async () => {
    const result = await rehype()
      .use(rehypeBudoux, {
        className: ["budoux", "breaked"],
      })
      .run(h("p", "こんにちは、世界！"));

    expect(result).toEqual(
      h(
        "p",
        { className: ["budoux", "breaked"] },
        "こんに",
        h("wbr"),
        "ちは、",
        h("wbr"),
        "世界！",
      ),
    );
  });

  it("If no wbr element is inserted, no class name is given", async () => {
    const result = await rehype()
      .use(rehypeBudoux, { className: "budoux-breaked" })
      .run(h("p", "abc"));

    expect(result).toEqual(h("p", "abc"));
  });
});
