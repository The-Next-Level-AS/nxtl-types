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
} from "@nxtl/nxtl-types";

// Exercise the published entry point, not a source-file shortcut.
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
    suggestions: ["What are your opening hours?"],
    inference_id: null,
    token_usage: 0,
} satisfies SuggestionsResponse;

const cachedTransformation = {
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

void [
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
];
