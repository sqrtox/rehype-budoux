# rehype-budoux

## About

rehype plugin to insert wbr using BudouX.

## Installation

```bash
npm install rehype-budoux
yarn add rehype-budoux
pnpm install rehype-budoux
bun add rehype-budoux
```

## Usage

```ts
import { rehype } from "rehype";
import rehypeBudouX from "rehype-budoux";

const result = await rehype()
  .data("settings", {
    fragment: true
  })
  .use(rehypeBudouX, {
    className: "budoux-breaked"
  })
  .process("<p>こんにちは、世界！</p>");

// -> <p class="budoux-breaked">こんに<wbr>ちは、<wbr>世界！</p>
console.log(result.toString());
```

## API

### `Options`

Configuration (TypeScript type).

### Fields

- `className`?: `string` | `string[]` - Class name to be attached to the element into which the wbr element is inserted
