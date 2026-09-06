/**
 * Platform-neutral NXTL plugin contracts.
 *
 * These adapter payloads preserve the public plugin APIs, including legacy
 * response formats. They are separate from the current NXTL endpoint contracts
 * exported by index.ts and must not be substituted for current wire contracts.
 * Sync status models also represent the in-process plugin domain; their Dates
 * and Errors are serialized by the framework when sent over HTTP.
 */
import type { EntrySyncInput, MessageResponse } from "./index.js";

/** CMS content accepted by the plugin adapter before normalization to EntrySyncInput. */
export interface PluginContentPayload extends Omit<EntrySyncInput, "content"> {
    slug?: string;
    content: unknown;
    metadata?: Record<string, unknown>;
    publishedAt?: string;
    updatedAt?: string;
    language?: string;
    tags?: string[];
    nxtlRef?: string;
}

export type PluginSyncResponse = MessageResponse;

/**
 * Transformation request
 */
export interface PluginTransformRequest {
    /** Content to transform */
    content: unknown;

    /** Source format (e.g., 'portable-text', 'html', 'markdown') */
    sourceFormat: string;

    /** Target format (e.g., 'html', 'markdown', 'plain-text') */
    targetFormat: string;

    /** Episode identifier to associate with the transformation */
    episode?: string;

    /** Transformation options */
    options?: {
        /** Include NXTL references in output */
        includeNxtlRefs?: boolean;

        /** Preserve semantic structure */
        preserveSemantics?: boolean;

        /** Custom transformations */
        customRules?: Record<string, unknown>;
    };
}

/**
 * Transformation response
 */
export interface PluginTransformResponse {
    /** Success status */
    success: boolean;

    /** Transformed content */
    content: unknown;

    /** Output format */
    format: string;

    /** Transformation metadata */
    metadata?: {
        /** Processing time in ms */
        processingTime?: number;

        /** Number of elements processed */
        elementsProcessed?: number;

        /** Warnings or notices */
        warnings?: string[];
    };
}

/**
 * Matrix sync request
 *
 * Syncs a document as a reusable content template (matrix) to the NXTL API.
 * Matrices are special content pieces that can be applied to other content
 * programmatically.
 */
export interface PluginMatrixSyncRequest {
    /** Content path/URL (e.g., '/articles/my-template') */
    path: string;

    /** Content structure with stable refs (HTML string or Portable Text) */
    structure: string | unknown;

    /** Optional content ID for reference */
    contentId?: string;
}

export type PluginMatrixSyncResponse = MessageResponse;

/**
 * User journey lookup response
 */
export interface PluginUserJourneyResponse {
    /** Success status */
    success: boolean;

    /** Campaign identifier */
    campaign: string;

    /** Journey stages */
    stages: Array<{
        /** Stage name */
        name: string;

        /** Stage order */
        order: number;

        /** Recommended content for this stage */
        content: Array<{
            /** Content ID */
            id: string;

            /** Content type */
            type: string;

            /** Content title */
            title: string;

            /** Relevance score */
            relevance: number;
        }>;
    }>;

    /** Journey metadata */
    metadata?: {
        /** Total journey length */
        totalStages?: number;

        /** Estimated duration */
        estimatedDuration?: string;
    };
}

/**
 * Vector search request
 */
export interface PluginVectorSearchRequest {
    /** Content to search for similar items */
    content: string;

    /** Maximum number of results */
    topK?: number;

    /** Minimum similarity threshold (0-1) */
    minSimilarity?: number;

    /** Filter by content types */
    contentTypes?: string[];

    /** Filter by tags */
    tags?: string[];
}

/**
 * Vector search response
 */
export interface PluginVectorSearchResponse {
    /** Success status */
    success: boolean;

    /** Search results */
    results: Array<{
        /** Content ID */
        id: string;

        /** Content type */
        type: string;

        /** Content title */
        title: string;

        /** Similarity score (0-1) */
        similarity: number;

        /** Content excerpt */
        excerpt?: string;
    }>;

    /** Search metadata */
    metadata?: {
        /** Processing time in ms */
        processingTime?: number;

        /** Total matches found */
        totalMatches?: number;

        /** Model used for search */
        model?: string;
    };
}

/**
 * User Journey definition
 */
export interface PluginUserJourney {
    /** Unique journey name (e.g., 'enterprise-demo', 'first-time-visitor') */
    name: string;

    /** Description of the user scenario for vector search context */
    description: string;

    /** Tone of voice for content presentation */
    toneofvoice?: string;

    /** NXTL project ID - required when syncing to API */
    projectid?: string;

    /** Sanity internal key - required for array items, not sent to API */
    _key?: string;
}

/**
 * Sync user journeys request
 */
export interface PluginSyncUserJourneysRequest {
    /** Array of user journeys to sync */
    userJourneys: PluginUserJourney[];
}

/**
 * Sync user journeys response
 */
export interface PluginSyncUserJourneysResponse {
    /** Success status */
    success: boolean;

    /** Number of journeys synced */
    count: number;

    /** Sync timestamp */
    syncedAt: string;

    /** Optional message */
    message?: string;
}

/**
 * Get all user journeys response
 * API returns array directly, not wrapped in object
 */
export type PluginGetUserJourneysResponse = PluginUserJourney[];

/**
 * Generic API error response
 */
export interface PluginAPIErrorResponse {
    /** Error indicator */
    success: false;

    /** Error message */
    message: string;

    /** Error code */
    code?: string;

    /** Additional error details */
    details?: unknown;

    /** Retry after (for rate limiting) */
    retryAfter?: number;
}

// ============================================================================
// Sources API - Entry Retrieval and Reranking
// ============================================================================

/**
 * Entry from NXTL API retrieveEntries endpoint
 */
export interface PluginNxtlEntry {
    /** Entry ID */
    id: string | number;

    /** Additional entry data returned by API */
    [key: string]: unknown;
}

/**
 * Reranked entry from reranking endpoint with relevance score
 */
export interface PluginRerankedEntry {
    /** Entry ID */
    id: string | number;

    /** Relevance score (higher = more relevant) */
    score?: number;

    /** Additional entry data */
    [key: string]: unknown;
}

/**
 * Response from /reranking endpoint
 */
export interface PluginRerankingResponse {
    /** Filtered and reranked entries */
    filtered_entries: PluginRerankedEntry[];

    /** Additional response data */
    [key: string]: unknown;
}

/**
 * Options for fetching and reranking sources
 */
export interface PluginFetchSourcesOptions {
    /** User journey query/description */
    query: string | string[];

    /** Type of content to retrieve (e.g., 'article', 'lawyer') */
    dataSource?: string;

    /** Number of results to return (default: 3) */
    limit?: number;
}

/**
 * Content query parameters from dreamcatcher
 */
export interface PluginBridgeContentQuery {
    /** Content type/schema (e.g., 'article', 'page') */
    type?: string;
    /** Document ID */
    id?: string;
    /** Slug/path */
    slug?: string;
    /** Additional query filters */
    filters?: Record<string, unknown>;
}

/**
 * Transformation request body from dreamcatcher
 */
export interface PluginBridgeTransformationRequest {
    /** Content to transform */
    content: unknown;
    /** Campaign identifier */
    campaign?: string | null;
    /** Content type (for context) */
    contentType?: string;
    /** Transformation options */
    options?: {
        /** Preserve original structure */
        preserveStructure?: boolean;
        /** Include transformation metadata */
        includeMetadata?: boolean;
    };
}

/**
 * Conversation request body from dreamcatcher
 */
export interface PluginBridgeConversationRequest {
    /** User message */
    message: string;
    /** Conversation history */
    history?: Array<{ role: "user" | "assistant"; content: string }>;
    /** Context for conversation */
    context?: {
        /** Campaign identifier */
        campaign?: string | null;
        /** Current content being viewed */
        content?: unknown;
        /** User journey ID */
        journeyId?: string;
    };
}

/**
 * Conversation response from NXTL backend
 */
export interface PluginBridgeConversationResponse {
    /** Assistant's response */
    message: string;
    /** Updated conversation history */
    history?: Array<{ role: "user" | "assistant"; content: string }>;
    /** Additional metadata */
    metadata?: Record<string, unknown>;
}

/**
 * Transposition request body from dreamcatcher
 */
export interface PluginBridgeTranspositionRequest {
    /** Signal type (e.g., 'engagement', 'conversion') */
    signalType: string;
    /** Signal data */
    data: Record<string, unknown>;
    /** Campaign identifier */
    campaign?: string | null;
    /** User journey ID */
    journeyId?: string;
}

/**
 * Transposition response from NXTL backend
 */
export interface PluginBridgeTranspositionResponse {
    /** Processing status */
    status: "success" | "error";
    /** Response data */
    data?: unknown;
    /** Error message if status is 'error' */
    error?: string;
}

/**
 * CRUD entries request for fetching content list
 */
export interface PluginBridgeEntriesRequest {
    /** Content type to fetch */
    type: string;
    /** Filters to apply */
    filters?: Record<string, unknown>;
    /** Sorting options */
    sort?: {
        field: string;
        order: "asc" | "desc";
    };
    /** Pagination */
    pagination?: {
        limit: number;
        offset: number;
    };
}

/**
 * User journey metadata
 */
export interface PluginBridgeUserJourney {
    /** Journey ID */
    id: string;
    /** Journey name */
    name: string;
    /** Journey description */
    description?: string;
    /** Campaign associations */
    campaigns?: string[];
    /** Creation timestamp */
    createdAt: string;
    /** Last updated timestamp */
    updatedAt: string;
}

/**
 * Matrix configuration metadata
 */
export interface PluginBridgeMatrixConfig {
    /** Matrix ID */
    id: string;
    /** Matrix name */
    name: string;
    /** Matrix description */
    description?: string;
    /** Matrix dimensions */
    dimensions?: string[];
    /** Associated campaigns */
    campaigns?: string[];
    /** Creation timestamp */
    createdAt: string;
    /** Last updated timestamp */
    updatedAt: string;
}

/**
 * Standard API error response
 */
export interface PluginBridgeApiErrorResponse {
    /** Error flag */
    error: true;
    /** Error message */
    message: string;
    /** Error code (optional) */
    code?: string;
    /** Status code */
    statusCode: number;
    /** Additional error details */
    details?: unknown;
}

/**
 * Standard API success response
 */
export interface PluginBridgeApiSuccessResponse<T = unknown> {
    /** Success flag */
    success: true;
    /** Response data */
    data: T;
    /** Response metadata */
    metadata?: {
        /** Request timestamp */
        timestamp?: string;
        /** Campaign used (if any) */
        campaign?: string | null;
        /** Processing time in ms */
        processingTime?: number;
    };
}

/**
 * Generic API response (success or error)
 */
export type PluginBridgeApiResponse<T = unknown> =
    | PluginBridgeApiSuccessResponse<T>
    | PluginBridgeApiErrorResponse;

/**
 * Content Renderer Types
 *
 * CMS-agnostic interfaces for rendering content with optional transformations.
 * Used by framework integrations to remain platform-agnostic.
 *
 * @packageDocumentation
 */

/**
 * Content block structure (framework-agnostic)
 */
export interface PluginContentBlock {
    /** Unique key for the block */
    key: string;
    /** Block type (e.g., 'block') */
    type: string;
    /** Block style (e.g., 'normal', 'h1', 'h2') */
    style: string;
    /** Text content */
    text: string;
    /** NXTL reference ID (if applicable) */
    nxtlRef?: string;
}

/**
 * Rendered content result
 */
export interface PluginRenderedContent {
    /** Content blocks (framework-agnostic) */
    content: PluginContentBlock[];
    /** Metadata about the content */
    metadata?: {
        /** Content title */
        title?: string;
        /** Content type */
        type?: string;
        /** Document ID */
        id?: string;
        /** Any additional metadata */
        [key: string]: unknown;
    };
}

/**
 * Matrix Provider Types
 *
 * CMS-agnostic interfaces for matrix content discovery and retrieval.
 * Used by framework integrations (Next.js, Nuxt, etc.) to remain platform-agnostic.
 *
 * @packageDocumentation
 */

/**
 * Matrix content structure from CMS
 *
 * Represents the content blocks that will be transformed.
 * The structure is CMS-agnostic - implementations map their CMS structure to this format.
 */
export interface PluginMatrixContent {
    /** Content blocks array */
    content: any[];
    /** Additional metadata from CMS (optional) */
    metadata?: Record<string, unknown>;
}

/**
 * Result from NXTL transformation request
 */
export interface PluginTransformationResult {
    /** Transformations by stable ref */
    transformations: Record<string, string>;
    /** Additional metadata from NXTL */
    metadata?: Record<string, unknown>;
}

/**
 * Individual health check result
 */
export interface PluginHealthCheckResult {
    name: string;
    status: "ok" | "error";
    message?: string;
}

/**
 * Overall health status
 */
export type PluginHealthStatus = "ok" | "degraded" | "error";

/**
 * Health check response
 */
export interface PluginHealthCheckResponse {
    status: PluginHealthStatus;
    timestamp: string;
    uptime?: number;
    version?: string;
    checks?: PluginHealthCheckResult[];
}

export interface PluginRegistrationResponse {
    success: boolean;
    serverId?: string;
    message?: string;
    tokenRotated?: boolean;
    error?: string;
}

/**
 * Sync provider types for pluggable batch sync architecture
 *
 * @packageDocumentation
 */

/**
 * Options for triggering a batch sync operation
 */
export interface PluginBatchSyncOptions {
    /**
     * Sanity dataset to sync from (e.g., 'production', 'staging')
     */
    dataset: string;

    /**
     * Optional document types to sync (e.g., ['article', 'lawyer'])
     * If not specified, all configured types will be synced
     */
    types?: string[];

    /**
     * Force re-sync of all documents, even if they haven't changed
     * @default false
     */
    forceSync?: boolean;

    /**
     * Page size for batch processing
     * @default 100
     */
    pageSize?: number;
}

/**
 * Status of a sync operation
 */
export type PluginSyncStatus = "pending" | "running" | "completed" | "failed";

/**
 * Result returned when triggering a batch sync
 */
export interface PluginSyncResult {
    /**
     * Unique identifier for this sync job
     */
    jobId: string;

    /**
     * Current status of the sync operation
     */
    status: PluginSyncStatus;

    /**
     * Number of documents successfully synced (if completed immediately)
     */
    synced?: number;

    /**
     * Number of documents that failed to sync (if completed immediately)
     */
    failed?: number;

    /**
     * Error details if sync failed
     */
    errors?: Error[];

    /**
     * Human-readable message about the sync operation
     */
    message?: string;
}

/**
 * Progress information for a sync operation
 */
export interface PluginSyncProgress {
    /**
     * Total number of documents to sync
     */
    total: number;

    /**
     * Number of documents successfully synced
     */
    completed: number;

    /**
     * Number of documents that failed to sync
     */
    failed: number;

    /**
     * Current document being processed (optional)
     */
    current?: string;
}

/**
 * Detailed status of a sync operation
 */
export interface PluginSyncStatusDetail {
    /**
     * Unique identifier for this sync job
     */
    jobId: string;

    /**
     * Current status of the sync operation
     */
    status: PluginSyncStatus;

    /**
     * Progress information (if available)
     */
    progress?: PluginSyncProgress;

    /**
     * When the sync operation started
     */
    startedAt?: Date;

    /**
     * When the sync operation completed or failed
     */
    completedAt?: Date;

    /**
     * Error details if sync failed
     */
    error?: Error;

    /**
     * Human-readable message about the sync operation
     */
    message?: string;
}
