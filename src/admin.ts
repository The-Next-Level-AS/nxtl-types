import type {
    AssessmentFilters,
    AssessmentRoute,
    AssessmentAlignment,
    AssessmentStatus,
    AssessmentEvalReasoning,
    AssessmentEvalScore,
    AssessmentDialogueMessage,
    AssessmentDialogueUserInputMode,
    AssessmentItem,
} from "./management.js";
/** Shared NXTL Admin API and organization domain contracts. */
import type {
    ActivatedPluginRecord,
    Artifact,
    ArtifactStatisticsResponse,
    CitationsResponse,
    DataSource,
    Entry,
    EvalIndex,
    EvalsResponse,
    EvalsSeriesPoint,
    Matrix,
    RevisionResponse,
    SetMatrixSecondPassRequest,
    UserJourneyRecord,
} from "./index.js";

export type NxtlAssessmentDataSource = DataSource;
export type IntentResolutionEvalIndex = EvalIndex;

export interface IntentResolutionAssessmentFeedRequest {
    dataSource?: NxtlAssessmentDataSource;
    endDate?: string;
    id?: string;
    organizationId?: string;
    page?: number;
    pageSize?: number;
    startDate?: string;
}

export interface IntentResolutionAssessmentReconciliationRequest {
    episodeId: string;
    reconciled: boolean;
}

export type IntentResolutionAssessmentFilters = AssessmentFilters;

export type IntentResolutionDialogueUserInputMode =
    AssessmentDialogueUserInputMode;

export interface IntentResolutionDialogueMessage
    extends AssessmentDialogueMessage {
    artifact?: IntentResolutionArtifact;
}

export interface IntentResolutionArtifact {
    path: string;
    route?: IntentResolutionReadinessRoute | null;
}

export type IntentResolutionReadinessAlignment = AssessmentAlignment;

export type IntentResolutionReadinessRoute = AssessmentRoute;

export type IntentResolutionStatus = AssessmentStatus;

export interface IntentResolutionEvalScore
    extends Omit<AssessmentEvalScore, "formula"> {
    formula: string | null;
}

export type IntentResolutionEvalReasoning = AssessmentEvalReasoning;

/** Assessment after Admin resolves artifact paths and normalizes score formulas. */
export interface IntentResolutionAssessmentFeedItem
    extends Omit<AssessmentItem, "artifactPath" | "dialogue" | "evalScores"> {
    artifact: IntentResolutionArtifact | null;
    dialogue: IntentResolutionDialogueMessage[];
    evalScores: Partial<
        Record<IntentResolutionEvalIndex, IntentResolutionEvalScore>
    >;
}

export interface IntentResolutionAssessmentFeedResponse {
    filters: IntentResolutionAssessmentFilters;
    items: IntentResolutionAssessmentFeedItem[];
    organizationId: string;
    page: number;
    pageSize: number;
    total: number;
}

export interface NxtlCredentialFields {
    nxtlOrganizationId: string;
}

export interface NxtlCredentialsApiResponse extends NxtlCredentialFields {
    apiKey: string;
}

export interface NxtlCredentialsStatus {
    hasCredentials: boolean;
    credentials: NxtlCredentialFields | null;
}

export interface RotateNxtlCredentialsResult {
    regenerated: boolean;
    credentials: NxtlCredentialsApiResponse;
}

export interface ArtifactTooltipMaps {
    entries: Record<string, string>;
    matrices: Record<string, string>;
    userJourneys: Record<string, string>;
}

export interface ArtifactsPageDataResponse {
    artifacts: Artifact[];
    tooltips: ArtifactTooltipMaps;
}

export interface ArtifactCampaignDistributionRequest {
    endDate: string;
    organizationId?: string;
    startDate?: string;
}

export interface ArtifactCampaignDistributionPoint {
    campaign: string;
    hits: number;
}

export interface ArtifactCampaignDistributionRange {
    endDate: string;
    formulaCount: number;
    pointCount: number;
    startDate?: string;
}

export interface ArtifactCampaignDistributionResponse {
    range: ArtifactCampaignDistributionRange;
    series: ArtifactCampaignDistributionPoint[];
}

export interface ArtifactEntriesDistributionRequest {
    endDate: string;
    organizationId?: string;
    startDate?: string;
}

export interface ArtifactEntriesDistributionPoint {
    entry: string;
    hits: number;
}

export interface ArtifactEntriesDistributionRange {
    endDate: string;
    formulaCount: number;
    pointCount: number;
    startDate?: string;
}

export interface ArtifactEntriesDistributionResponse {
    range: ArtifactEntriesDistributionRange;
    series: ArtifactEntriesDistributionPoint[];
}

export type NxtlEvalDataSource = DataSource;
export type NxtlEvalsSeriesPoint = EvalsSeriesPoint;

/** Admin normalizes absent simulated evaluation series to an empty array. */
export interface NxtlEvalsResponse extends EvalsResponse {
    simulatedSeries: EvalsSeriesPoint[];
}

export type OrganizationType = "partner" | "standard";
export type OrganizationAccessSource = "explicit" | "inherited" | "superAdmin";
export type OrganizationMemberRole = "admin" | "member" | "owner";

export interface OrganizationAccess {
    effectiveRole: OrganizationMemberRole | null;
    source: OrganizationAccessSource;
}

export interface OrganizationParentSummary {
    id: string;
    name: string;
    organizationType: OrganizationType;
    slug: string;
}

export interface OrganizationUserSummary {
    email: string;
    id: string;
    image?: string | null;
    name: string;
    role?: string | null;
}

export interface OrganizationMemberSummary {
    createdAt: Date | string;
    id: string;
    organizationId: string;
    role: OrganizationMemberRole;
    user: OrganizationUserSummary | null;
    userId: string;
}

export interface OrganizationInvitationSummary {
    createdAt: Date | string;
    email: string;
    expiresAt: Date | string;
    id: string;
    inviterId: string;
    organizationId: string;
    role: string | null;
    status: string;
}

export interface OrganizationSummary {
    access: OrganizationAccess;
    id: string;
    logo?: string | null;
    name: string;
    organizationType: OrganizationType;
    parentOrganization: OrganizationParentSummary | null;
    parentOrganizationId: string | null;
    slug: string;
}

export interface ActiveOrganization extends OrganizationSummary {
    createdAt: Date | string;
    invitations: OrganizationInvitationSummary[];
    metadata?: Record<string, unknown>;
    members: OrganizationMemberSummary[];
}

export type OrganizationSetupStepId =
    | "settings"
    | "billing"
    | "apiCredentials"
    | "content"
    | "insights"
    | "configuration"
    | "globalToneOfVoice"
    | "userJourney";
export type OrganizationSetupCompletionSource = "derived" | "route";

export interface OrganizationSetupStatusStep {
    id: OrganizationSetupStepId;
    completed: boolean;
    completedAt: string | null;
}

export interface OrganizationSetupStatus {
    organizationId: string;
    isOrganizationAdmin: boolean;
    hasNxtlCredentials: boolean;
    hideGuide: boolean;
    shouldAutoOpenGuide: boolean;
    steps: OrganizationSetupStatusStep[];
}

export interface OrganizationSetupStatusInput {
    organizationId?: string;
}

export interface OrganizationSetupDismissGuideInput
    extends OrganizationSetupStatusInput {
    hideGuide: boolean;
}

export interface OrganizationSetupMarkStepVisitedInput
    extends OrganizationSetupStatusInput {
    stepId: OrganizationSetupStepId;
}

export interface OrganizationExportCitation extends CitationsResponse {
    entryId: string;
}

export interface OrganizationExportArtifactStatistics
    extends ArtifactStatisticsResponse {
    formula: string;
}

export interface NxtlOrganizationDataExport {
    settings: {
        activatedPlugins: ActivatedPluginRecord[];
        domainModel: string;
        fallbackResponse: string;
        globalToneOfVoice: string;
    };
    content: {
        artifacts: Artifact[];
        entries: Entry[];
        matrices: Matrix[];
        userJourneys: UserJourneyRecord[];
    };
    history: {
        revisions: RevisionResponse[];
    };
    analytics: {
        artifactStatistics: OrganizationExportArtifactStatistics[];
        citations: OrganizationExportCitation[];
        evaluations: Record<IntentResolutionEvalIndex, NxtlEvalsResponse>;
        intentResolutionAssessments: IntentResolutionAssessmentFeedResponse;
        usage: number;
    };
}

export interface UsageReportResult {
    organizationId: string;
    organizationName: string;
    planId?: string;
    projectId?: string;
    currentUsage?: number;
    usageDelta?: number;
    success: boolean;
    skipped?: boolean;
    reason?: string;
    stripeEventId?: string;
    error?: string;
}

/** Required fields and normalized slot-array representation used when saving a matrix. */
export type MatrixUpdatePayload = Required<
    Pick<SetMatrixSecondPassRequest, "path" | "summary" | "locked">
> & {
    response: Extract<
        NonNullable<SetMatrixSecondPassRequest["response"]>,
        unknown[]
    >;
};
