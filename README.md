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

## Core user journeys (0.2.0)

Journey CRUD contracts now represent the Core catalog. Every record contains
`name` (the stable journey ID), `title`, `parent`, `description`, and
`toneOfVoice`. The request's `organizationId`/`projectId` supplies tenant scope.
Persona roots have `parent: null`, `description: null`, and their stored tone.
Children have a persona ID in `parent`, their exact user need in `description`,
and `toneOfVoice: null` to inherit the persona's tone. The childless `uj0`
fallback keeps `description: "placeholder"`.

`UserJourneyInput` requires a complete record for upsert. PATCH fields are
optional; explicit `null` clears a nullable field, while omission preserves it.
The backend validates the resulting catalog, including root-only parents and
nonempty child needs. Omitted records in a batch upsert are not deleted.
`userNeeds` and `businessGoals` are no longer catalog fields. Runtime and
historical evaluation payloads may retain their separately adapted shapes.

Plugin journey and bridge types share the same catalog fields; CMS `_key` and
optional bridge metadata are adapter-only. Legacy lowercase `toneofvoice` and
`projectid` are deprecated input aliases and must be normalized before syncing.

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
