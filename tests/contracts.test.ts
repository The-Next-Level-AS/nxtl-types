import { NXTL_ENDPOINTS } from "@nxtl/nxtl-types";
import type {
    ConversationRequest,
    AssessmentItem,
    CrudArtifactsResult,
    CrudSyncEntryResult,
    EndpointName,
    RequestOf,
    ResultOf,
    SuggestionsResponse,
    TransformationResponse,
    IntentResolutionAssessmentFeedItem,
    PluginBridgeUserJourney,
    PluginUserJourney,
    PluginSyncUserJourneysResponse,
    UserJourneyRecord,
} from "@nxtl/nxtl-types";

// Exercise the published entry point, not a source-file shortcut.
const episodeRequest = {
    organizationId: "organization",
} satisfies RequestOf<"episode">;

const episodeResult = {
    status: 200,
    body: { episode: "0193a2f0-0000-7000-8000-000000000001" },
} satisfies ResultOf<"episode">;

const conversation = {
    projectId: "project",
    history: "USER: Hello",
    episode: "episode",
    message: "Hello",
    entryIds: [],
    pattern: "support",
    dataSource: "simulated",
} satisfies ConversationRequest;

const retrieval = {
    query: ["opening hours"],
    category: "support",
    episode: conversation.episode,
} satisfies RequestOf<"crudRetrieveEntries">;

const suggestions = {
    episode: episodeResult.body.episode,
    suggestions: ["What are your opening hours?"],
    inference_id: null,
    token_usage: 0,
} satisfies SuggestionsResponse;

const cachedTransformation = {
    episode: episodeResult.body.episode,
    rewritten_content: [],
    entry_ids: [],
    cache_hit: true,
    data_source: "real",
    start_timestamp: 0,
    token_usage: 0,
    personalization_context: {
        context: { general: "support" },
        tone_of_voice: "helpful",
        entries_content: "",
    },
} satisfies TransformationResponse;

const invalidArtifactQuery = {
    status: 400,
    body: { error: "Invalid date range" },
} satisfies CrudArtifactsResult;

const invalidSync = {
    status: 400,
    body: { error: "Invalid entry" },
} satisfies CrudSyncEntryResult;

const suggestionResult = {
    status: 200,
    body: suggestions,
} satisfies ResultOf<"suggestions">;

// Removed/invalid fields must not silently reappear in copied consumer models.
const invalidConversation: ConversationRequest = {
    ...conversation,
    // @ts-expect-error NXTL accepts only real or simulated data sources.
    dataSource: "test",
};
const invalidTransformation: TransformationResponse = {
    ...cachedTransformation,
    // @ts-expect-error dead_end is not a transformation response field.
    dead_end: false,
};

const endpointNames: Record<EndpointName, unknown> = NXTL_ENDPOINTS;
const assessment = {
    episodeId: "episode",
    createdAt: null,
    updatedAt: null,
    latestRunAt: null,
    dataSource: "real",
    ready: true,
    reconciled: false,
    status: "success",
    reason: "ready",
    reasoning: null,
    readinessInferenceId: null,
    route: null,
    alignment: { entries: true, userJourney: true, matrix: true },
    dialogue: [],
    evalScores: {
        dialogue: { score: 1, presentComponents: 1, totalComponents: 1 },
    },
    evalReasoning: [],
    artifactPath: "/welcome",
} satisfies AssessmentItem;

// Admin normalization is a distinct contract; raw scores can omit formula.
const normalizedAssessment: IntentResolutionAssessmentFeedItem = {
    ...assessment,
    artifact: { path: assessment.artifactPath },
    evalScores: {
        dialogue: { ...assessment.evalScores.dialogue, formula: null },
    },
};
const domainModel = {
    domainModel: "Support",
    userId: "user",
} satisfies RequestOf<"crudDomainModel">;
const missingAssessment = {
    status: 404,
    body: { error: "Episode not found" },
} satisfies ResultOf<"crudAssessment">;

// Core catalog records distinguish labels, persona tone, and child user needs.
const persona = {
    name: "uj1",
    title: "Existing customer",
    parent: null,
    description: null,
    toneOfVoice: "Clear and reassuring",
} satisfies UserJourneyRecord;

const need = {
    name: "uj1_1",
    title: "Understand an invoice",
    parent: persona.name,
    description: "I need help understanding the charges on my invoice.",
    toneOfVoice: null,
} satisfies UserJourneyRecord;

const fallback = {
    name: "uj0",
    title: "General visitor",
    parent: null,
    description: "placeholder",
    toneOfVoice: "Neutral and helpful",
} satisfies UserJourneyRecord;

const journeyCatalog = {
    organizationId: "organization",
    userJourneys: [persona, need, fallback],
} satisfies RequestOf<"crudUserJourneysSet">;

const journeyResponse = {
    status: 200,
    body: { ...persona, children: [need] },
} satisfies ResultOf<"crudUserJourneyGet">;

const nullableJourneyPatch = {
    projectId: "organization",
    name: persona.name,
    description: null,
    parent: null,
} satisfies RequestOf<"crudUserJourneyPatch">;

const invalidJourneyCatalog = {
    status: 400,
    body: { error: "uj0 cannot have children" },
} satisfies ResultOf<"crudUserJourneysSet">;

const invalidJourneyDeletion = {
    status: 400,
    body: { error: "Delete a persona's children before deleting the persona" },
} satisfies ResultOf<"crudDeleteUserJourney">;

const invalidJourneyRead = {
    status: 400,
    body: { error: "A journey name is required" },
} satisfies ResultOf<"crudUserJourneyGet">;

const invalidJourneyCatalogRead = {
    status: 400,
    body: { error: "An organization is required" },
} satisfies ResultOf<"crudUserJourneysGet">;

const failedJourneyCommit = {
    status: 500,
    body: { error: "MariaDB commit could not be confirmed; Core content was restored" },
} satisfies ResultOf<"crudUserJourneysSet">;

const journeyDeletion = {
    organizationId: "organization",
    userId: "editor",
    name: need.name,
} satisfies RequestOf<"crudDeleteUserJourney">;

const pluginJourney = {
    ...need,
    _key: "cms-item",
} satisfies PluginUserJourney;

// Bridge clients consume the same catalog shape without fabricated timestamps.
const bridgeJourney = { ...persona } satisfies PluginBridgeUserJourney;
const pluginJourneySync = { message: "Success" } satisfies PluginSyncUserJourneysResponse;

const legacyRevision = {
    status: 200,
    body: {
        revisionId: 1,
        source: "userJourneys",
        createdAt: "2026-10-01T10:00:00",
        canRollback: false,
        snapshot: { userJourneys: [{ name: "uj1", userNeeds: "Old need" }] },
    },
} satisfies ResultOf<"crudRevision">;

const invalidLegacyJourney: UserJourneyRecord = {
    ...need,
    // @ts-expect-error Child needs belong in description, not a duplicated field.
    userNeeds: "Duplicated user need",
};

const invalidJourneyPatch: RequestOf<"crudUserJourneyPatch"> = {
    name: persona.name,
    // @ts-expect-error Business goals are not part of the Core catalog contract.
    businessGoals: "Sell a product",
};

// @ts-expect-error All records need a meaningful title, including persona roots.
const untitledJourney: UserJourneyRecord = {
    name: "uj2",
    parent: null,
    description: null,
    toneOfVoice: "Helpful",
};

void [
    episodeRequest,
    episodeResult,
    retrieval,
    invalidArtifactQuery,
    invalidSync,
    suggestionResult,
    invalidConversation,
    invalidTransformation,
    endpointNames,
    normalizedAssessment,
    domainModel,
    missingAssessment,
    journeyCatalog,
    journeyResponse,
    nullableJourneyPatch,
    invalidJourneyCatalog,
    invalidJourneyDeletion,
    invalidJourneyRead,
    invalidJourneyCatalogRead,
    failedJourneyCommit,
    journeyDeletion,
    pluginJourney,
    bridgeJourney,
    pluginJourneySync,
    legacyRevision,
    invalidLegacyJourney,
    invalidJourneyPatch,
    untitledJourney,
];
