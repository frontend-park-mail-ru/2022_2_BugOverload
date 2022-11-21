import template from '@components/PremiereList/premiereList.handlebars';
import { Component } from '@components/Component';
import { PremiereDay } from '@components/PremiereDay/premiereDay';

/**
* Список премьер.
* Отрисовывает блоки фильмов, сгруппированных по дням.
* Делегирует создание блока компоненту PremiereFilm.
*/
export class PremiereList extends Component {
    constructor(props: componentProps) {
        super(props);
        this.nameLocation = props.nameLocation;
        this.location = document.querySelector(`.${this.nameLocation}`);

        this.filmsData = props.films;
    }

    render() {
        if (!this.filmsData || !this.location) {
            return;
        }
        // вставляем шаблон-контейнер на страницу
        this.location.insertAdjacentHTML('afterbegin', template());

        this.blocksDay = <Array<PremiereDay>>[];
        let filmsByDay: Array<filmPremiere> = [];
        let currDate = this.filmsData[0].prod_date;

        // Разделяем фильмы по дням. На каждую группу фильмов создаётся компонент
        // PremiereDay, который отрендерит и навесит обработчики на блок фильмов
        this.filmsData.forEach((film: filmPremiere, index: number, filmsData: Array<filmPremiere>) => {
            const createBlock = () => {
                this.blocksDay.push(new PremiereDay({
                    nameLocation: 'js-premiere-list__container',
                    filmsData: filmsByDay.slice(0), // клонирование массива
                    rootNode: this.rootNode,
                }));

                this.blocksDay[this.blocksDay.length - 1].render();

                filmsByDay.length = 0; // очищение массива
            }

            if (film.prod_date === currDate) {
                currDate = film.prod_date;
                filmsByDay.push(film);

                // для последнего фильма
                if (index === filmsData.length - 1) {
                    createBlock();
                }
                return;
            }

            currDate = film.prod_date;
            if (filmsByDay.length > 0) {
                createBlock();
            }

            filmsByDay.push(film);

            // для последнего фильма
            if (index === filmsData.length - 1) {
                createBlock();
            }
        });
    }
}
