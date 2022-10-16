import { Store } from '../../Store.js';
import { Ajax } from '../../../utils/ajax.js';
import { dispatcher } from '../../Dispatcher.js';

const UserMixin = (superclass) => class extends superclass {
};

class FilmStore extends UserMixin(Store) {

}
