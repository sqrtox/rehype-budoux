import { h } from "hastscript";
import { rehype } from "rehype";

import rehypeBudouX from "@/index.js";

describe("Basic Processing", () => {
  it("The wbr element is properly inserted", async () => {
    const result = await rehype()
      .use(rehypeBudouX)
      .run(h("p", "こんにちは、世界！"));

    expect(result).toEqual(h("p",
      "こんに",
      h("wbr"),
      "ちは、",
      h("wbr"),
      "世界！"
    ));
  });

  it("nested tree", async () => {
    const result = await rehype()
      .use(rehypeBudouX)
      .run(h(undefined,
        h("p", "こんにちは、世界！")
      ));

    expect(result).toEqual(h(undefined,
      h("p",
        "こんに",
        h("wbr"),
        "ちは、",
        h("wbr"),
        "世界！"
      )
    ));
  });

  it("A single class name is properly assigned", async () => {
    const result = await rehype()
      .use(rehypeBudouX, { className: "budoux-breaked" })
      .run(h("p", "こんにちは、世界！"));

    expect(result).toEqual(h("p",
      { className: "budoux-breaked" },
      "こんに",
      h("wbr"),
      "ちは、",
      h("wbr"),
      "世界！"
    ));
  });

  it("Multiple class names are properly assigned", async () => {
    const result = await rehype()
      .use(rehypeBudouX, {
        className: ["budoux", "breaked"]
      })
      .run(h("p", "こんにちは、世界！"));

    expect(result).toEqual(h("p",
      { className: ["budoux", "breaked"] },
      "こんに",
      h("wbr"),
      "ちは、",
      h("wbr"),
      "世界！"
    ));
  });

  it("If no wbr element is inserted, no class name is given", async () => {
    const result = await rehype()
      .use(rehypeBudouX, { className: "budoux-breaked" })
      .run(h("p", "abc"));

    expect(result).toEqual(h("p",
      "abc"
    ));
  });
});
