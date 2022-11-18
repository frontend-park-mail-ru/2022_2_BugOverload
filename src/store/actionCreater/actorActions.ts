export const actionGetActor = (id :number, numberPhotos = 9) => ({
    type: 'getActor',
    value: {
        id,
        numberPhotos,
    },
});
