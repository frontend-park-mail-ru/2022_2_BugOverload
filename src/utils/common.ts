export const getDateNow = () => {
    const d = new Date();
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};


export const roundFloat = (rating: number) => {
    const rounded = Math.round(rating * 10) / 10;
    if (Number.isInteger(rounded)) {
        return `${rounded}.0`;
    }

    return `${rounded}`;
}
