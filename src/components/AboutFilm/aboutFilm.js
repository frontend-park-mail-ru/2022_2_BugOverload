export class AboutFilm {
    async getRequestData() {
        const response = await Ajax.get('http://movie-gate.online:8088/v1/about_film/1');
        if (response.status === 200) {
            return response.body;
        }

        if (response.status === 404) {
            ShowErrorMessage('Такой страницы не найдено :(');
            return null;
        }

        if (response.status > 500) {
            ShowErrorMessage('Произошла ошибка сервера');
            return null;
        }

        ShowErrorMessage();
        return null;
    }

    renderTemplate(data) {
        console.log(data);
        return Handlebars.templates['components/AboutFilm/aboutFilm']({
            poster_hor: 'img/films_hor/trueDetective.jpg',
            film_name: 'Настоящий Детектив',
            original_name: 'True detective',
            rating: '8.7',
            year_prod: '2014-2019',
            duration: '60',
            type_serial: 'true',
            count_seasons: '3',
            age_limit: '18',
            short_description: 'Кто стоит за необычайно жестокими и запутанными убийствами? Суперзвезды в главном детективном сериале 2010-х',
            directors: ['Кэри Дзёдзи Фукунага', 'ещё чел'],
            roles: ['Мэттью МакКонахи', 'Колин Фаррелл', 'Вуди Харрельсон'],
        });
    }
}
