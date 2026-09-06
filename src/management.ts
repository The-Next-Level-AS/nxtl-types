import type {
    BaseProjectRequest,
    DataSource,
    ErrorResponse,
    EvalIndex,
    MessageResponse,
    OptionalUserRequest,
    ServerErrorResponse,
    UnauthorizedResponse,
} from "./index.js";

export interface AssessmentFilterRequest extends BaseProjectRequest {
    startDate?: string;
    endDate?: string;
    dataSource?: DataSource;
}

export interface AssessmentsRequest extends AssessmentFilterRequest {
    page?: number;
    pageSize?: number;
}

export interface AssessmentRequest extends AssessmentFilterRequest {
    episodeId: string;
}

export interface PatchAssessmentRequest extends BaseProjectRequest {
    episodeId: string;
    reconciled: boolean;
}

export interface AssessmentFilters {
    startAt: string | null;
    endBefore: string | null;
    dataSource: DataSource | null;
}

export interface AssessmentRoute {
    entryIds: string[];
    userJourneyId: string | null;
    matrixId: string | null;
}

export interface AssessmentAlignment {
    entries: boolean;
    userJourney: boolean;
    matrix: boolean;
}

export type AssessmentStatus = "success" | "outlier";
export type AssessmentDialogueUserInputMode = "clicked" | "typed";

export interface AssessmentDialogueMessage {
    role: "assistant" | "user";
    content: string;
    inputMode?: AssessmentDialogueUserInputMode;
    suggestions?: string[];
}

export interface AssessmentEvalScore {
    score: number;
    presentComponents: number;
    totalComponents: number;
    formula?: string;
}

export interface AssessmentEvalReasoning {
    index: EvalIndex;
    text: string;
}

/** Readiness assessment as returned by the NXTL API. */
export interface AssessmentItem {
    episodeId: string;
    createdAt: string | null;
    updatedAt: string | null;
    latestRunAt: string | null;
    dataSource: DataSource;
    ready: boolean;
    reconciled: boolean;
    status: AssessmentStatus;
    reason: string;
    reasoning: string | null;
    readinessInferenceId: string | null;
    route: AssessmentRoute | null;
    alignment: AssessmentAlignment;
    dialogue: AssessmentDialogueMessage[];
    evalScores: Partial<Record<EvalIndex, AssessmentEvalScore>>;
    evalReasoning: AssessmentEvalReasoning[];
    artifactPath: string | null;
}

export interface AssessmentsResponse {
    organizationId: string;
    table: "assessment";
    filters: AssessmentFilters;
    page: number;
    pageSize: number;
    total: number;
    items: AssessmentItem[];
}

export interface AssessmentResponse extends AssessmentItem {
    organizationId: string;
    table: "assessment";
    filters: AssessmentFilters;
}

export interface PatchAssessmentResponse {
    message: "Success";
    episodeId: string;
    reconciled: boolean;
}

export type CrudAssessmentsResult =
    | { status: 200; body: AssessmentsResponse }
    | { status: 400; body: ErrorResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 500; body: ServerErrorResponse };

export type CrudAssessmentResult =
    | { status: 200; body: AssessmentResponse }
    | { status: 400; body: ErrorResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 404; body: ErrorResponse }
    | { status: 500; body: ServerErrorResponse };

export type CrudAssessmentPatchResult =
    | { status: 200; body: PatchAssessmentResponse }
    | { status: 400; body: ErrorResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 404; body: ErrorResponse }
    | { status: 500; body: ServerErrorResponse };

export interface DomainModelRequest
    extends BaseProjectRequest,
        OptionalUserRequest {
    domainModel: string;
}

export interface DomainModelResponse {
    domainModel: string;
}

export type CrudDomainModelGetResult =
    | { status: 200; body: DomainModelResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 500; body: ServerErrorResponse };

export type CrudDomainModelResult =
    | { status: 200; body: MessageResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 500; body: ServerErrorResponse };

export interface FallbackResponseRequest
    extends BaseProjectRequest,
        OptionalUserRequest {
    fallbackResponse: string;
}

export interface FallbackResponseResponse {
    fallbackResponse: string;
}

export type CrudFallbackResponseGetResult =
    | { status: 200; body: FallbackResponseResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 500; body: ServerErrorResponse };

export type CrudFallbackResponseResult =
    | { status: 200; body: MessageResponse }
    | { status: 401; body: UnauthorizedResponse }
    | { status: 500; body: ServerErrorResponse };
