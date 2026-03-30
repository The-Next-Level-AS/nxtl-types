export const NXTL_ENDPOINTS = {
    conversation: { method: "POST", path: "/conversation", auth: "apiKey" },
    reranking: { method: "POST", path: "/reranking", auth: "apiKey" },
    transformation: { method: "POST", path: "/transformation", auth: "apiKey" },
    crudArtifacts: { method: "GET", path: "/crud/artifacts", auth: "apiKey" },
    crudDeleteEntry: {
        method: "DELETE",
        path: "/crud/deleteEntry",
        auth: "apiKey",
    },
    crudDeleteMatrix: {
        method: "DELETE",
        path: "/crud/deleteMatrix",
        auth: "apiKey",
    },
    crudDeleteUserJourney: {
        method: "DELETE",
        path: "/crud/deleteUserJourney",
        auth: "apiKey",
    },
    crudEntries: { method: "GET", path: "/crud/entries", auth: "apiKey" },
    crudEvals: { method: "GET", path: "/crud/evals", auth: "apiKey" },
    crudMatrices: { method: "GET", path: "/crud/matrices", auth: "apiKey" },
    crudMatrix: { method: "GET", path: "/crud/matrix", auth: "apiKey" },
    crudRetrieveEntries: {
        method: "POST",
        path: "/crud/retrieveEntries",
        auth: "apiKey",
    },
    crudSetArtifact: {
        method: "POST",
        path: "/crud/setArtifact",
        auth: "apiKey",
    },
    crudSetMatrix: { method: "POST", path: "/crud/setMatrix", auth: "apiKey" },
    crudSetMatrixSecondPass: {
        method: "POST",
        path: "/crud/setMatrixSecondPass",
        auth: "apiKey",
    },
    crudSyncEntries: {
        method: "POST",
        path: "/crud/syncEntries",
        auth: "apiKey",
    },
    crudSyncEntry: { method: "POST", path: "/crud/syncEntry", auth: "apiKey" },
    crudGlobalToneOfVoiceGet: {
        method: "GET",
        path: "/crud/globalToneOfVoice",
        auth: "apiKey",
    },
    crudGlobalToneOfVoice: {
        method: "POST",
        path: "/crud/globalToneOfVoice",
        auth: "apiKey",
    },
    crudUserJourneysGet: {
        method: "GET",
        path: "/crud/userJourneys",
        auth: "apiKey",
    },
    crudUserJourneyGet: {
        method: "GET",
        path: "/crud/userJourney",
        auth: "apiKey",
    },
    crudUserJourneyPatch: {
        method: "PATCH",
        path: "/crud/userJourney",
        auth: "apiKey",
    },
    crudUserJourneysSet: {
        method: "POST",
        path: "/crud/userJourneys",
        auth: "apiKey",
    },
    crudRevisions: { method: "GET", path: "/crud/revisions", auth: "apiKey" },
    crudRevisionsRollback: {
        method: "POST",
        path: "/crud/revisions/rollback",
        auth: "apiKey",
    },
    crudUsage: { method: "GET", path: "/crud/usage", auth: "apiKey" },
    crudCredentials: {
        method: "POST",
        path: "/crud/credentials",
        auth: "bearer",
    },
    proxyChatCompletions: {
        method: "POST",
        path: "/v1/chat/completions",
        auth: "none",
    },
};
//# sourceMappingURL=index.js.map