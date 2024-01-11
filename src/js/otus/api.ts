import { Request } from "../app/request";

/**
 * Get a page of OTUs from the API
 *
 * @param refId - The unique identifier of the reference to search
 * @param term - The search term to filter OTUs by name or abbreviation
 * @param verified - Whether OTUs should be filtered by verified status
 * @param page - The page of results to fetch
 * @returns A Promise resolving to the API response containing a page of OTUs
 */
export function find({
    refId,
    term,
    verified,
    page,
}: {
    refId: string;
    term: string;
    verified: boolean;
    page: number;
}) {
    return Request.get(`/refs/${refId}/otus`).query({ find: term, page, verified: verified || undefined });
}

/**
 * Get a single OTU data from the API
 *
 * @param otuId - The unique identifier of the OTU to fetch
 * @returns A Promise resolving to the API response containing the OTU data
 */
export function get({ otuId }: { otuId: string }) {
    return Request.get(`/otus/${otuId}`);
}

/**
 * Get the history of changes for a single OTU
 *
 * @param otuId - The unique identifier of the OTU
 * @return A Promise resolving to the API response containing the OTU history
 */
export function getHistory({ otuId }: { otuId: string }) {
    return Request.get(`/otus/${otuId}/history`);
}

/**
 * Get the Genebank data for a sequence
 *
 * @param accession - The unique accession identifying the sequence in genebank
 * @returns A Promise resolving to the API response containing the genebank sequence data
 */
export function getGenbank(accession: { accession: string }) {
    return Request.get(`/genbank/${accession}`);
}

/**
 * Create a new OTU
 *
 * @param refId - The unique identifier of the parent reference of the new OTU
 * @param name - The name of the new OTU
 * @param abbreviation - The shorthand name for the new otu
 * @returns A Promise resolving to the API response containing the new OTU data
 */
export function create({ refId, name, abbreviation }: { refId: string; name: string; abbreviation: string }) {
    return Request.post(`/refs/${refId}/otus`).send({
        name,
        abbreviation,
    });
}

/**
 * Edit an existing OTU
 *
 * @param otuId - The unique identifier of the OTU to edit
 * @param name - The new name for the OTU
 * @param abbreviation - The new abbreviation for the OTU
 * @param schema - The update schema for the otu
 * @returns A Promise resolving to the API response containing the updated OTU data
 */
export function edit({
    otuId,
    name,
    abbreviation,
    schema,
}: {
    otuId: string;
    name: string;
    abbreviation: string;
    schema: string[];
}) {
    return Request.patch(`/otus/${otuId}`).send({
        name,
        abbreviation,
        schema,
    });
}

/**
 * Remove an existing OTU
 *
 * @param otuId - The unique identifier of the OTU to remove
 * @returns A promise resolving to the API response indicating if removal was successful
 */
export function remove({ otuId }) {
    return Request.delete(`/otus/${otuId}`);
}

/**
 * Create a new isolate for an OTU
 *
 * @param otuId - The unique identifier of the OTU to add the isolate to
 * @param sourceType - The kind of source the sequence is based off of (e.g. "isolate", "strain")
 * @param sourceName - The name of the source
 * @returns A promise resolving to the API response containing the new isolate
 */
export function addIsolate({
    otuId,
    sourceType,
    sourceName,
}: {
    otuId: string;
    sourceType: string;
    sourceName: string;
}) {
    return Request.post(`/otus/${otuId}/isolates`).send({
        source_type: sourceType,
        source_name: sourceName,
    });
}

/**
 * Update an existing isolate
 *
 * @param otuId - The unique identifier of the OTU to add the isolate to
 * @param isolateId - The unique identifier of the isolate to edit
 * @param sourceType - The kind of source the sequence is based off of (e.g. "isolate", "strain")
 * @param sourceName - The name of the source
 * @returns A Promise resolving to the API response containing the updated isolate
 */
export function editIsolate({ otuId, isolateId, sourceType, sourceName }) {
    return Request.patch(`/otus/${otuId}/isolates/${isolateId}`).send({
        source_type: sourceType,
        source_name: sourceName,
    });
}

/**
 * Set an isolate as the default resource for an OTU
 *
 * @param otuId - The unique identifier of the OTU to add the isolate to
 * @param isolateId - The unique identifier of the isolate to set as default
 * @returns A Promise resolving to the API response containing the updated isolate
 */
export function setIsolateAsDefault({ otuId, isolateId }) {
    return Request.put(`/otus/${otuId}/isolates/${isolateId}/default`);
}

/**
 * Remove an existing isolate
 *
 * @param otuId - The unique identifier of the OTU to add the isolate to
 * @param isolateId - The unique identifier of the isolate to set as default
 * @returns A Promise resolving to the API response indicating if removal was successful
 */
export function removeIsolate({ otuId, isolateId }) {
    return Request.delete(`/otus/${otuId}/isolates/${isolateId}`);
}

/**
 * Create a new sequence for an isolate
 *
 * @param otuId - The unique identifier of the isolates parent otu
 * @param isolateId - The unique identifier of the isolate to add the sequence to
 * @param accession - The accession number for the sequence
 * @param definition - The definition for the sequence
 * @param host - The host the sample was taken from
 * @param sequence - The raw sequence data
 * @param segment - Which section of the genome the sequence is from
 * @param target - The target the sequence is from
 * @returns A Promise resolving to the API response containing the new sequence
 */
export function addSequence({
    otuId,
    isolateId,
    accession,
    definition,
    host,
    sequence,
    segment,
    target,
}: {
    otuId: string;
    isolateId: string;
    accession: string;
    definition: string;
    host: string;
    sequence: string;
    segment: string;
    target: string;
}) {
    return Request.post(`/otus/${otuId}/isolates/${isolateId}/sequences`).send({
        accession,
        definition,
        host,
        sequence,
        segment,
        target,
    });
}

/**
 * Update an existing sequence
 *
 * @param otuId - The unique identifier of the isolates parent otu
 * @param isolateId - The unique identifier of the parent isolate to the sequence
 * @param sequenceId - The unique identifier of the sequence to edit
 * @param accession - The accession number for the sequence
 * @param definition - The definition for the sequence
 * @param host - The host the sample was taken from
 * @param sequence - The raw sequence data
 * @param segment - Which section of the genome the sequence is from
 * @param target - The target the sequence is from
 * @returns A Promise resolving to the API response containing the updated sequence
 */
export function editSequence({
    otuId,
    isolateId,
    sequenceId,
    accession,
    definition,
    host,
    sequence,
    segment,
    target,
}: {
    otuId: string;
    isolateId: string;
    sequenceId: string;
    accession: string;
    definition: string;
    host: string;
    sequence: string;
    segment: string;
    target: string;
}) {
    return Request.patch(`/otus/${otuId}/isolates/${isolateId}/sequences/${sequenceId}`).send({
        accession,
        definition,
        host,
        sequence,
        segment,
        target,
    });
}

/**
 * Remove an existing sequence
 *
 * @param otuId - The unique identifier of the isolates parent otu
 * @param isolateId - The unique identifier of the parent isolate to the sequence
 * @param sequenceId - The unique identifier of the sequence to remove
 * @returns A Promise resolving to the API response indicating if removal was successful
 */
export function removeSequence({
    otuId,
    isolateId,
    sequenceId,
}: {
    otuId: string;
    isolateId: string;
    sequenceId: string;
}) {
    return Request.delete(`/otus/${otuId}/isolates/${isolateId}/sequences/${sequenceId}`);
}

/**
 * Revert an otu to how it was before a given change
 *
 * @param change_id - The unique identifier of the change to revert
 * @returns A Promise resolving to the API response indicating if the revert was successful
 */
export function revert({ change_id }) {
    return Request.delete(`/history/${change_id}`);
}

/**
 * Get a page of OTUs from the API
 *
 * @param refId - the unique identifier of the reference to search
 * @param term - The search term to filter OTUs by name or abbreviation
 * @param verified - Whether OTUs should be filtered by verified status
 * @param page - The page of results to fetch
 * @returns A Promise resolving to a page of OTUs
 */
export function findOTUs({
    refId,
    term,
    verified,
    page,
}: {
    refId: string;
    term: string;
    verified: boolean;
    page: number;
}) {
    return Request.get(`/refs/${refId}/otus`)
        .query({ find: term, page, verified: verified || undefined })
        .then(response => response.body);
}