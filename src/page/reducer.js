

export const initialState = {
    allActive: true,
    favesActive: false,
    urlBase: 'https://hn.algolia.com/api/v1/search_by_date?query=',
    optionSelectData: [
        {
            label: 'Angular',
            image: '/images/angular-small.png',
            urlTech: 'angular&page=',
        },
        {
            label: 'Reacts',
            image: '/images/react-small.png',
            urlTech: 'reactjs&page=',
        },
        {
            label: 'Vuejs',
            image: '/images/vue-small.png',
            urlTech: 'vuejs&page=',
        }
    ],
    queryData: [],
    pageNumber: 0,
    maxPageNumber: 0,
    loading: true,
}

export const actionsReducer = (state, actions) => {

    switch (actions.type) {
        case "CHANGE_FIELD":
            state[actions.path] = actions.payload
            return;
        case "CHANGE_ACTIVE":
            if (actions.path === 'allActive') {
                state['allActive'] = actions.payload
                state['favesActive'] = !actions.payload
            } else {
                state['allActive'] = !actions.payload
                state['favesActive'] = actions.payload
            }
            return;
        case "CHANGE_SELECT":
            const data = JSON.stringify(actions.payload)
            localStorage.setItem('techSelected', data)
            state['techSelected'] = actions.payload
            return;
        case "ADD_FAVES":
            console.log(actions);
            state['queryData'][actions.payload]['isFave'] = true
            return;
        case "REMOVE_FAVES":
            console.log(actions);
            state['queryData'][actions.payload]['isFave'] = false
            return;
        case "CHANGE_LOADING":
            state['loading'] = actions.payload
            return;
        default:
            return;
    }
}