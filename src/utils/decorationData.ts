export const decoreDuration = (minutes: number, mode = 'full') => {
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

export const decoreListPersons = (list: Array<actor>, maxCount: number, sep = ',') => {
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

export const decoreListItems = (list: Array<string>, maxCount: number) => {
    if (!list) {
        return null;
    }

    const newList = [];
    let i = 0;
    for (; i < maxCount - 1 && i < list.length - 1; i++) {
        newList.push(`${list[i]},`);
    }
    newList.push(list[i]);

    return newList;
};

export const decoreCountSeasons = (count: number) => {
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

export const decoreCountReviews = (count: number) => {
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

export const decoreCountActors = (count: number) => {
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

export const decoreCountScores = (count: number) => {
    if (!count) {
        return 'нет оценок';
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

export const decoreAge = (countYears: number) => {
    if (!countYears) {
        return 'нет возраста';
    }

    if (countYears % 10 > 4 || (countYears % 100 > 10 && countYears % 100 < 20) || countYears % 10 === 0) {
        return `${countYears} лет`;
    }

    if (countYears % 10 === 1) {
        return `${countYears} год`;
    }
    if (countYears % 10 > 1 && countYears % 10 <= 4) {
        return `${countYears} года`;
    }

    return `${countYears} лет`;
};

export const decoreCountFilms = (countFilms: number) => {
    if (!countFilms) {
        return 'нет фильмов';
    }

    if (countFilms % 10 > 4 || (countFilms % 100 > 10 && countFilms % 100 < 20) || countFilms % 10 === 0) {
        return `${countFilms} фильмов`;
    }

    if (countFilms % 10 === 1) {
        return `${countFilms} фильм`;
    }
    if (countFilms % 10 > 1 && countFilms % 10 <= 4) {
        return `${countFilms} фильма`;
    }

    return `${countFilms} фильмов`;
};

export const decoreColorRating = (location: HTMLElement, className: string, rating: number) => {
    if (!location || !className) {
        return;
    }
    const filmRating: HTMLElement = location.querySelector(className);
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

export const decoreDate = (date: string, sep: string = ' ', decoreMonth = true) => {
    if (!date) {
        return 'нет данных';
    }

    const newFormatDate = date.split(' ')[0].split('.').reverse();
    if (decoreMonth) {
        newFormatDate[1] = getMonthName(+newFormatDate[1]);
    }
    return newFormatDate.join(sep);
};

const getMonthName = (numberMonth: number) => {
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

export const decoreBudget = (budget: number, currency_budget: string = 'USD') => {
    if (!budget) {
        return null;
    }

    let newBudget = budget.toString().split("").reverse().join("").match(/.{1,3}/g).reverse().join(" ");

    switch (currency_budget) {
    case 'USD':
        newBudget = `$ ${newBudget}`;
        break;
    case 'EUR':
        newBudget = `€ ${newBudget}`;
        break;
    case 'RUB':
        newBudget = `₽ ${newBudget}`;
        break;
    }

    return newBudget;
}

export const restrictText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return `${text.slice(0, maxLength)} ...`;
    }

    return text;
}

export const decoreDaysLeft = (date:string) => {
    if (!date) {
        return '';
    }
    const premiere = new Date(date);
    const now = new Date();

    const timeDiff = Math.abs(premiere.getTime() - now.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays < 0) {
        return 'Премьера уже состоялась';
    }
    if (diffDays === 0) {
        return `Премьера состоялась!`;
    }
    if (diffDays === 1) {
        return `Уже завтра!`;
    }

    if (diffDays % 10 > 4 || (diffDays % 100 > 10 && diffDays % 100 < 20) || diffDays % 10 === 0) {
        return `Осталось ${diffDays} дней`;
    }

    if (diffDays % 10 === 1) {
        return `Остался ${diffDays} день`;
    }
    if (diffDays % 10 > 1 && diffDays % 10 <= 4) {
        return `Осталось ${diffDays} дня`;
    }

    return `Осталось ${diffDays} дней`;
}
