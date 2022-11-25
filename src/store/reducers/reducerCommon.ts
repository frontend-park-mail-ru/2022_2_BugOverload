import { Ajax } from '@utils/ajax';
import { API, responsStatuses } from '@config/config';
import { mockCollection, mockPrewiew, mockSearch } from '@store/reducers/mockData';

class ReducerCommon {
    async getCollectionData({name, target, key, sortParam, countFilms, delimiter} :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.collection(target, key, sortParam, countFilms, delimiter)) as Response;
        } catch (e) {
            return { [`${name}`]: mockCollection() };
        }
        if (response.status === responsStatuses.OK) {
            console.log(`${name}`)
            return { [`${name}`]: response.body };
        }
      return { [`statusCollection-${name}`]: response.status };
  }

    async getPreviewData({name} :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.recommendation) as Response;
        } catch (e) {
            return { [`preview-${name}`]: mockPrewiew() };
        }

        if (response.status === responsStatuses.OK) {
            return { [`preview-${name}`]: response.body };
        }

        return { [`statusPreview-${name}`]: response.status };
    }

    async getSearchData({request}: searchParams) {
        let response;
        try {
            response = await Ajax.get(API.search(request)) as Response;
        } catch (e) {
            if (request === 'q-qwe') {
                return { search: mockSearch() };
            }
            return { search: { error: 'error' } };
        }
        console.log(`responseStatus ${response.status} ${request}`);
        if (response.status === responsStatuses.OK) {
            return { search: response.body };
        }

        // if (response.status === responsStatuses.NotFound) {
          // if (request === 'q-qwe') {
          //   return { search:}
          // }
        // }
        console.log(`getSearchData : nothing`)
        return { search: { error: 'error' } };
    }
}

export const reducerCommon = new ReducerCommon();
