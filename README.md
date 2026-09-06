# nxtl-types

The shared TypeScript source for NXTL API request/response contracts and domain
models used by the admin applications and plugins.

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
} from "@nxtl/nxtl-types";

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

## Contract ownership

Define NXTL wire contracts and shared domain models here, then import them with
`import type` in consuming repositories. Existing public plugin modules may
re-export these types for compatibility. Keep component props, framework
adapters, inferred validation types, and application state in their own packages.

The Python backend remains the authority for endpoint behavior. When it changes,
update the corresponding request, response, result union, and `NXTL_ENDPOINTS`
entry together. Consumer-specific normalized models must be named separately
from raw API responses.

## Verify and release

```bash
npm ci
npm run typecheck
npm test
npm pack
```

Packing rebuilds declarations and JavaScript so the artifact includes every
exported module. Publish the shared package before installing consumer changes
that require the new version. Validate consumers against the same packed artifact
before release; keep repository manifests on the published package name instead
of machine-specific paths.
