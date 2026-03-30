export type HttpMethod = "GET" | "POST" | "DELETE";
export type AuthScheme = "apiKey" | "bearer" | "none";
export type ServerErrorResponse = string;
export interface UnauthorizedResponse {
    error: string;
}
export interface ErrorResponse {
    error: string;
}
export interface MessageResponse {
    message: string;
}
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export interface JsonObject {
    [key: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {
}
export interface BaseProjectRequest {
    projectId: string;
}
export interface Artifact {
    formula: string;
    content: string;
    hash: string;
    [key: string]: unknown;
}
export interface Entry {
    id: string;
    summary?: string | null;
    full: string;
    [key: string]: unknown;
}
export interface RetrievedEntry extends Entry {
    vec_sim: number;
}
export interface Matrix {
    path: string;
    summary?: string | null;
    response?: string | null;
    [key: string]: unknown;
}
export interface UserJourneyRecord {
    userjourneypk?: number | null;
    projectid?: string | null;
    name: string;
    parent?: string | null;
    description?: string | null;
    toneofvoice?: string | null;
    userneeds?: string | null;
    businessgoals?: string | null;
    [key: string]: unknown;
}
export interface ConversationRequest extends BaseProjectRequest {
    history: string;
    episode: string;
    message: string;
    entryIds: string[];
    suggestions?: string[];
    startTimestamp?: number;
    tokenUsage?: number;
    forceUserJourney?: string;
}
export type ConversationStream = string;
export interface ConversationSuccessHeaders {
    "Cache-Control": string;
    Connection: string;
}
export type ConversationControlTag = "MESSAGE" | "HANDOFF";
export interface ConversationControlFrame {
    type: "control";
    tag: ConversationControlTag;
    url: string;
    raw: string;
}
export interface ConversationTokenFrame {
    type: "token";
    token: string;
    raw: string;
}
export interface ConversationDoneFrame {
    type: "done";
    raw: "[DONE]";
}
export type ConversationFrame = ConversationControlFrame | ConversationTokenFrame | ConversationDoneFrame;
export type ConversationResult = {
    status: 200;
    body: ConversationStream;
    headers: ConversationSuccessHeaders;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface RerankingEntryInput {
    id: string;
    summary: string | null;
    full: string;
    vec_sim: number;
    [key: string]: unknown;
}
export interface RerankingRequest extends BaseProjectRequest {
    entries: RerankingEntryInput[];
    statements: string[];
    episode?: string;
    results?: number;
}
export interface RerankedEntry {
    id: string;
    full: string;
    [key: string]: unknown;
}
export interface RerankingResponse {
    filtered_entries: RerankedEntry[];
}
export type RerankingResult = {
    status: 200;
    body: RerankingResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface TransformationRequest extends BaseProjectRequest {
    structure: string;
    userJourney: string;
    language: string;
    entryIds?: string[];
    episode?: string;
    history?: string;
}
export interface RewrittenContentItem {
    key: string;
    value: string;
}
export interface PersonalizationContextValue {
    general: string;
    specific?: string;
}
export interface PersonalizationContext {
    context: PersonalizationContextValue;
    tone_of_voice: string;
    entries_content: string;
}
export interface TransformationResponse {
    rewritten_content: RewrittenContentItem[];
    episode?: string;
    entry_ids: string[];
    dead_end: boolean;
    start_timestamp: number;
    token_usage: number;
    personalization_context: PersonalizationContext;
}
export interface TransformationErrorResponse {
    error: string;
}
export interface TransformationSuccessHeaders {
    "X-Usage-PR": string | number;
}
export type TransformationResult = {
    status: 200;
    body: TransformationResponse;
    headers: TransformationSuccessHeaders;
} | {
    status: 400;
    body: TransformationErrorResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface GetProjectRequest extends BaseProjectRequest {
}
export type CrudArtifactsResult = {
    status: 200;
    body: Artifact[];
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface DeleteEntryRequest extends BaseProjectRequest {
    id: string;
}
export type CrudDeleteEntryResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface DeleteMatrixRequest extends BaseProjectRequest {
    path: string;
}
export type CrudDeleteMatrixResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface DeleteUserJourneyRequest extends BaseProjectRequest {
    name: string;
}
export type CrudDeleteUserJourneyResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export type CrudEntriesResult = {
    status: 200;
    body: Entry[];
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export type CrudMatricesResult = {
    status: 200;
    body: Matrix[];
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface RetrieveEntriesRequest extends BaseProjectRequest {
    dataSource: string;
    query: string[];
    results?: number;
}
export type CrudRetrieveEntriesResult = {
    status: 200;
    body: RetrievedEntry[];
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface SetArtifactRequest extends BaseProjectRequest {
    formula: string;
    content: string;
    hash?: string | null;
}
export type CrudSetArtifactResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface SetMatrixRequest extends BaseProjectRequest {
    path: string;
    structure: JsonObject | JsonArray | string;
}
export interface SetMatrixResponse {
    message: "Success" | "Matrix is locked";
}
export type CrudSetMatrixResult = {
    status: 200;
    body: SetMatrixResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export type EntrySyncContent = JsonObject | JsonArray | string;
export interface EntrySyncInput {
    id: string;
    category: string;
    title: string;
    content: EntrySyncContent;
    [key: string]: unknown;
}
export interface SyncEntriesRequest extends BaseProjectRequest {
    entries: EntrySyncInput[];
    language?: string;
    subsiteId?: string;
}
export type CrudSyncEntriesResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface SyncEntryRequest extends BaseProjectRequest {
    entry: EntrySyncInput;
    language?: string;
    subsiteId?: string;
}
export type CrudSyncEntryResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface GlobalToneOfVoiceRequest extends BaseProjectRequest {
    toneOfVoice: string;
}
export type CrudGlobalToneOfVoiceResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface UserJourneysGetRequest extends BaseProjectRequest {
    forceUserJourney?: string;
}
export type CrudUserJourneysGetResult = {
    status: 200;
    body: UserJourneyRecord[];
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface UserJourneyInput {
    name: string;
    parent?: string | null;
    description: string;
    toneOfVoice: string;
    userNeeds?: string | null;
    businessGoals?: string | null;
}
export interface SetUserJourneysRequest extends BaseProjectRequest {
    userJourneys: UserJourneyInput[];
}
export type CrudUserJourneysSetResult = {
    status: 200;
    body: MessageResponse;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface UsageResponse {
    usage: number;
}
export type CrudUsageResult = {
    status: 200;
    body: UsageResponse | null;
} | {
    status: 401;
    body: UnauthorizedResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface CredentialsRequest {
    userId: string;
    regenerate?: boolean;
}
export interface CredentialsResponse {
    projectId: string;
    apiKey: string | null;
    regenerated: boolean;
    message?: string;
}
export type CrudCredentialsResult = {
    status: 200;
    body: CredentialsResponse;
} | {
    status: 401;
    body: ErrorResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export interface ChatCompletionsMessageInput {
    [key: string]: unknown;
}
export interface ChatCompletionsRequest {
    model: string;
    messages: ChatCompletionsMessageInput[];
    [key: string]: unknown;
}
export interface ChatCompletionAssistantMessage {
    role: "assistant";
    content: string;
}
export interface ChatCompletionChoice {
    index: number;
    finish_reason: "stop";
    message: ChatCompletionAssistantMessage;
}
export interface ChatCompletionUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
export interface ChatCompletionsResponse {
    id: string;
    object: "chat.completion";
    created: number;
    model: string;
    choices: ChatCompletionChoice[];
    usage: ChatCompletionUsage;
}
export type ProxyChatCompletionsResult = {
    status: 200;
    body: ChatCompletionsResponse;
} | {
    status: 400;
    body: ErrorResponse;
} | {
    status: 500;
    body: ServerErrorResponse;
};
export declare const NXTL_ENDPOINTS: {
    readonly conversation: {
        readonly method: "POST";
        readonly path: "/conversation";
        readonly auth: "apiKey";
    };
    readonly reranking: {
        readonly method: "POST";
        readonly path: "/reranking";
        readonly auth: "apiKey";
    };
    readonly transformation: {
        readonly method: "POST";
        readonly path: "/transformation";
        readonly auth: "apiKey";
    };
    readonly crudArtifacts: {
        readonly method: "GET";
        readonly path: "/crud/artifacts";
        readonly auth: "apiKey";
    };
    readonly crudDeleteEntry: {
        readonly method: "DELETE";
        readonly path: "/crud/deleteEntry";
        readonly auth: "apiKey";
    };
    readonly crudDeleteMatrix: {
        readonly method: "DELETE";
        readonly path: "/crud/deleteMatrix";
        readonly auth: "apiKey";
    };
    readonly crudDeleteUserJourney: {
        readonly method: "DELETE";
        readonly path: "/crud/deleteUserJourney";
        readonly auth: "apiKey";
    };
    readonly crudEntries: {
        readonly method: "GET";
        readonly path: "/crud/entries";
        readonly auth: "apiKey";
    };
    readonly crudMatrices: {
        readonly method: "GET";
        readonly path: "/crud/matrices";
        readonly auth: "apiKey";
    };
    readonly crudRetrieveEntries: {
        readonly method: "POST";
        readonly path: "/crud/retrieveEntries";
        readonly auth: "apiKey";
    };
    readonly crudSetArtifact: {
        readonly method: "POST";
        readonly path: "/crud/setArtifact";
        readonly auth: "apiKey";
    };
    readonly crudSetMatrix: {
        readonly method: "POST";
        readonly path: "/crud/setMatrix";
        readonly auth: "apiKey";
    };
    readonly crudSyncEntries: {
        readonly method: "POST";
        readonly path: "/crud/syncEntries";
        readonly auth: "apiKey";
    };
    readonly crudSyncEntry: {
        readonly method: "POST";
        readonly path: "/crud/syncEntry";
        readonly auth: "apiKey";
    };
    readonly crudGlobalToneOfVoice: {
        readonly method: "POST";
        readonly path: "/crud/globalToneOfVoice";
        readonly auth: "apiKey";
    };
    readonly crudUserJourneysGet: {
        readonly method: "GET";
        readonly path: "/crud/userJourneys";
        readonly auth: "apiKey";
    };
    readonly crudUserJourneysSet: {
        readonly method: "POST";
        readonly path: "/crud/userJourneys";
        readonly auth: "apiKey";
    };
    readonly crudUsage: {
        readonly method: "GET";
        readonly path: "/crud/usage";
        readonly auth: "apiKey";
    };
    readonly crudCredentials: {
        readonly method: "POST";
        readonly path: "/crud/credentials";
        readonly auth: "bearer";
    };
    readonly proxyChatCompletions: {
        readonly method: "POST";
        readonly path: "/v1/chat/completions";
        readonly auth: "none";
    };
};
export interface EndpointContract<Request, Result> {
    request: Request;
    result: Result;
}
export interface NxtlApiContracts {
    conversation: EndpointContract<ConversationRequest, ConversationResult>;
    reranking: EndpointContract<RerankingRequest, RerankingResult>;
    transformation: EndpointContract<TransformationRequest, TransformationResult>;
    crudArtifacts: EndpointContract<GetProjectRequest, CrudArtifactsResult>;
    crudDeleteEntry: EndpointContract<DeleteEntryRequest, CrudDeleteEntryResult>;
    crudDeleteMatrix: EndpointContract<DeleteMatrixRequest, CrudDeleteMatrixResult>;
    crudDeleteUserJourney: EndpointContract<DeleteUserJourneyRequest, CrudDeleteUserJourneyResult>;
    crudEntries: EndpointContract<GetProjectRequest, CrudEntriesResult>;
    crudMatrices: EndpointContract<GetProjectRequest, CrudMatricesResult>;
    crudRetrieveEntries: EndpointContract<RetrieveEntriesRequest, CrudRetrieveEntriesResult>;
    crudSetArtifact: EndpointContract<SetArtifactRequest, CrudSetArtifactResult>;
    crudSetMatrix: EndpointContract<SetMatrixRequest, CrudSetMatrixResult>;
    crudSyncEntries: EndpointContract<SyncEntriesRequest, CrudSyncEntriesResult>;
    crudSyncEntry: EndpointContract<SyncEntryRequest, CrudSyncEntryResult>;
    crudGlobalToneOfVoice: EndpointContract<GlobalToneOfVoiceRequest, CrudGlobalToneOfVoiceResult>;
    crudUserJourneysGet: EndpointContract<UserJourneysGetRequest, CrudUserJourneysGetResult>;
    crudUserJourneysSet: EndpointContract<SetUserJourneysRequest, CrudUserJourneysSetResult>;
    crudUsage: EndpointContract<GetProjectRequest, CrudUsageResult>;
    crudCredentials: EndpointContract<CredentialsRequest, CrudCredentialsResult>;
    proxyChatCompletions: EndpointContract<ChatCompletionsRequest, ProxyChatCompletionsResult>;
}
export type EndpointName = keyof NxtlApiContracts;
export type RequestOf<T extends EndpointName> = NxtlApiContracts[T]["request"];
export type ResultOf<T extends EndpointName> = NxtlApiContracts[T]["result"];
//# sourceMappingURL=index.d.ts.map