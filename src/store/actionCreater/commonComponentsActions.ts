export const actionGetCollectionData = (params :collectionParams) => ({
    type: 'getCollectionData',
    value: params,
});

export const actionGetPreviewData = (params :collectionParams) => ({
    type: 'getPreviewData',
    value: params,
});
