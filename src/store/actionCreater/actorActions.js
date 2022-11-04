export const actionGetActor = (id, numberPhotos = 9) => ({
    type: 'getActor',
    value: {
        id,
        numberPhotos,
    },
});
