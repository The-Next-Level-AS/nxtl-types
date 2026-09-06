# Shared contracts migration — 0.1.12

NXTL API and domain contracts now live in this package. The `admin`, `admin2`,
and `plugins` repositories import them; their former public type modules retain
compatibility re-exports. Component props, framework adapters, runtime schemas,
inferred validation types, and implementation state remain local.

## Changes

- `src/index.ts`: current transformation and retrieval fields, source-aware
  conversations/evaluations, suggestions, missing error results, and endpoint
  registration. The endpoint registry is checked against `NxtlApiContracts`.
- `src/management.ts`: raw assessment, domain model, and fallback-response
  requests/responses. Admin's normalized assessment representation remains
  explicitly separate from the backend payload.
- `src/admin.ts`: normalized resource contracts, organization access/summary,
  credentials, setup, exports, and usage reporting.
- `src/plugins.ts`: common core/Sanity and plugin endpoint/domain contracts.
  Legacy adapter payloads keep their distinct names and public aliases.

The transformation response now describes `cache_hit` and `data_source` instead
of the obsolete `dead_end`. Retrieval accepts `category` and `episode`;
plugin callers no longer send the ignored `dataSource` field. Plugin
transformation handling accepts the current structured response as well as the
existing legacy direct-map response.

`/reranking` is absent from the current Python backend. Its existing registry
entry and types remain deprecated for legacy plugin compatibility. This migration
does not restore that endpoint or migrate the other legacy plugin operations to
new backend behavior.

## Release order

Version `0.1.12` is prepared locally and has **not been published**. The eight
consumer package manifests and three consumer lockfiles target that release;
normal registry installs require it to be published first.

The ignored `release/` directory contains the prepared npm archive and its pack
metadata. Consumer lock integrity values were calculated from that exact archive.
Publish the prepared archive, then apply/install the dependent repository updates.
If the shared package is changed or repacked with different contents, refresh all
three consumer lock integrity values before release.

Publication is separate from repository commits. Keep the consumer migration
branches out of deployment branches until version `0.1.12` is available on npm;
local checks used the packed archive installed directly into `node_modules`.
Existing unrelated uncommitted repository changes are preserved.

## Verification

- Shared package build, strict typecheck, and compile-time contract tests pass.
  A separate clean consumer installs the archive and checks imports using only
  its shipped declarations.
- Admin SaaS, auth, and payments TypeScript checks pass.
- Admin2 SaaS and NXTL package TypeScript checks pass; 136 relevant tests pass.
  Formatting, lint, and the customization boundary check pass using the installed
  binaries. The documented `pnpm format` invocation was blocked by pnpm attempting
  dependency installation before running the formatter.
- Plugin core and Sanity builds and the Next.js TypeScript check pass. Focused
  retrieval, reranking, and structured/legacy transformation regression cases pass.
- Full plugin suites retain eight unrelated failures: Next.js invalid URL
  expectation, Markdown script-content handling, orchestration cache count, and
  console-method spy; Sanity's three generated-reference expectations and one
  fixed-timestamp expectation. The initial type-only migration was verified to
  emit identical JavaScript for its changed implementation files.
- All eight consumer dependency declarations and the three lockfiles match the
  prepared archive version and integrity. Whitespace checks pass.
