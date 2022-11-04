export const decoreDuration = (minutes, mode = 'full') => {
    const inHour = 60;
    let res = '';
    if (mode === 'full' || minutes <= inHour) {
        res += `${minutes} мин.`;
    }

    if (minutes > inHour) {
        if (mode === 'full') {
            res += ' / ';
        }
        const hours = Math.trunc(minutes / inHour);
        res += `${hours}ч. ${minutes - hours * inHour}мин.`;
    }

    return res;
};

export const decoreListPersons = (list, maxCount, sep = ',') => {
    const newList = [];
    let i = 0;
    for (; i < maxCount - 1 && i < list.length - 1; ++i) {
        newList.push({ ...list[i] });
        newList[i].name += sep;
    }
    newList.push(list[i]);

    return newList;
};

export const decoreListItems = (list, maxCount) => {
    const newList = [];
    let i = 0;
    for (; i < maxCount - 1 && i < list.length - 1; ++i) {
        newList.push(list[i]);
        newList[i] += ',';
    }
    newList.push(list[i]);

    return newList;
};

export const decoreCountSeasons = (count) => {
    if (count % 10 > 4 || (count % 100 > 10 && count % 100 < 20) || count % 10 === 0) {
        return `${count} сезонов`;
    }

    if (count % 10 === 1) {
        return `${count} сезон`;
    }
    if (count % 10 > 1 && count % 10 <= 4) {
        return `${count} сезона`;
    }

    return `${count} сезонов`;
};

export const decoreCountReviews = (count) => {
    if (count % 10 > 4 || (count % 100 > 10 && count % 100 < 20) || count % 10 === 0) {
        return `${count} рецензий`;
    }

    if (count % 10 === 1) {
        return `${count} рецензия`;
    }
    if (count % 10 > 1 && count % 10 <= 4) {
        return `${count} рецензии`;
    }

    return `${count} рецензий`;
};

export const decoreColorRating = (location, className, ratio) => {
    const filmRating = location.querySelector(className);
    if (!ratio) {
        filmRating.remove();
        return;
    }

    if (ratio > 7.49) {
        filmRating.dataset.valueRating = 'positive';
        return;
    }

    if (ratio > 5.19) {
        filmRating.dataset.valueRating = 'neutral';
        return;
    }

    filmRating.dataset.valueRating = 'negative';
};
