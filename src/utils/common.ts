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

export const getAge = (bithday: string) => {
    const premiere = new Date(bithday);
    const now = new Date();

    const timeDiff = Math.abs(premiere.getTime() - now.getTime());
    const diffYears = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365));

    if (diffYears < 0) {
        return 0;
    }

    return diffYears;
}
