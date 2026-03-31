# nxtl-types

TypeScript request/response contracts for every NXTL API endpoint.

## Install

```bash
npm install @nxtl/nxtl-types
```

## Build

```bash
npm run build
```

## Usage

```ts
import type {
  ConversationRequest,
  ConversationResult,
  RequestOf,
  ResultOf,
} from "@the-next-level-as/nxtl-types";

const request: ConversationRequest = {
  projectId: "abc12345",
  history: "USER: Hi",
  episode: "ep-1",
  message: "Hello",
  entryIds: ["entry-1"],
};

type TransformRequest = RequestOf<"transformation">;
type TransformResult = ResultOf<"transformation">;
```
