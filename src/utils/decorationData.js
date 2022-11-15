export const decoreDuration = (minutes, mode = 'full') => {
    if (!minutes) {
        return null;
    }
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
    if (!list) {
        return null;
    }
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
    if (!list) {
        return null;
    }

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
    if (!count) {
        return null;
    }

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
    if (!count) {
        return '0 рецензий';
    }

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

export const decoreCountActors = (count) => {
    if (!count) {
        return '0 aктёров';
    }

    if (count % 10 > 4 || (count % 100 > 10 && count % 100 < 20) || count % 10 === 0) {
        return `${count} aктёров`;
    }

    if (count % 10 === 1) {
        return `${count} актёр`;
    }
    if (count % 10 > 1 && count % 10 <= 4) {
        return `${count} aктёра`;
    }

    return `${count} aктёров`;
};

export const decoreCountScores = (count) => {
    if (!count) {
        return '0 оценок';
    }

    if (count % 10 > 4 || (count % 100 > 10 && count % 100 < 20) || count % 10 === 0) {
        return `${count} оценок`;
    }

    if (count % 10 === 1) {
        return `${count} оценка`;
    }
    if (count % 10 > 1 && count % 10 <= 4) {
        return `${count} оценки`;
    }

    return `${count} оценок`;
};

export const decoreColorRating = (location, className, rating) => {
    if (!location || !className) {
        return;
    }
    const filmRating = location.querySelector(className);
    if (!rating) {
        filmRating.remove();
        return;
    }

    if (rating > 7.49) {
        filmRating.dataset.valueRating = 'positive';
        return;
    }

    if (rating > 5.19) {
        filmRating.dataset.valueRating = 'neutral';
        return;
    }

    filmRating.dataset.valueRating = 'negative';
};

export const decoreDate = (date) => {
    if (!date) {
        return 'нет данных';
    }

    const newFormatDate = date.split(' ')[0].split('.').reverse();
    newFormatDate[1] = getMonthName(newFormatDate[1]);
    return newFormatDate.join(' ');
};

const getMonthName = (numberMonth) => {
    if (!numberMonth || !isFinite(numberMonth) || numberMonth > 12 || numberMonth === 0) {
        return 'января';
    }

    switch (numberMonth) {
    case 1:
        return 'января';
    case 2:
        return 'февраля';
    case 3:
        return 'марта';
    case 4:
        return 'апреля';
    case 5:
        return 'мая';
    case 6:
        return 'июня';
    case 7:
        return 'июля';
    case 8:
        return 'августа';
    case 9:
        return 'сентября';
    case 10:
        return 'октября';
    case 11:
        return 'ноября';
    case 12:
        return 'декабря';
    default:
        return 'января';
    }
};
