export const actionGetCollectionData = (params: collectionParams) => ({
    type: 'getCollectionData',
    value: params,
});

export const actionGetUserCollectionData = (params: collectionUserParams) => ({
    type: 'getUserCollectionData',
    value: params,
});

export const actionGetPreviewData = (params: previewParams) => ({
    type: 'getPreviewData',
    value: params,
});

export const actionGetSearchData = (params: searchParams) => ({
    type: 'getSearchData',
    value: params,
});
