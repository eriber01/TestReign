import { useEffect } from "react";
import axios from "axios";

import { useImmerReducer } from "use-immer"
import { actionsReducer, initialState } from "./reducer";

export const UseActions = () => {
    const [state, dispatch] = useImmerReducer(actionsReducer, initialState)

    const getData = async (validations) => {
        if (!validations) {
            if (JSON.parse(localStorage.getItem('techSelected'))) {
                await axios({
                    method: 'GET',
                    url: state.urlBase + JSON.parse(localStorage.getItem('techSelected')).urlTech + state.pageNumber,
                }).then(res => {
                    let dataArray = res.data.hits.map((item) => ({
                        created_at: item.created_at,
                        author: item.author,
                        story_title: item.story_title,
                        story_url: item.story_url,
                        objectID: item.objectID,
                        isFave: false
                    }))

                    let dataFilter = dataArray.filter((item) =>
                        item.story_title !== null &&
                        item.story_url !== null &&
                        item.author !== null &&
                        item.created_at !== null
                    )

                    dispatch({
                        type: "CHANGE_FIELD",
                        path: 'queryData',
                        payload: dataFilter
                    })

                    dispatch({
                        type: "CHANGE_LOADING",
                        payload: false
                    })

                    dispatch({
                        type: "CHANGE_FIELD",
                        path: 'maxPageNumber',
                        payload: res.data.nbPages
                    })
                }).catch(e => {
                    if (axios.isCancel(e)) return
                })

            } else {
                dispatch({
                    type: "CHANGE_FIELD",
                    path: 'queryData',
                    payload: []
                })
            }
        } else {
            let dataFilter = JSON.parse(localStorage.getItem('favoriteData'))

            dispatch({
                type: "CHANGE_FIELD",
                path: 'queryData',
                payload: dataFilter
            })
        }
    }

    const transformDate = (date) => {
        const now = new Date()
        const endDate = new Date(date)
        let dateTransform = (now.getTime() - endDate.getTime()) / 1000;
        dateTransform /= (60 * 60)
        return Math.round(dateTransform)
    }

    const redirectFn = (url, target) => {
        console.log(url);
        console.log(target.id)
        if (!target.id) {
            window.open(url, '_blank')
        }
    }

    const indexProduct = (id) => {
        for (let i = 0; i < state.queryData?.length; i++) {
            const element = state.queryData[i];

            let pID = parseInt(element.objectID);
            if (parseInt(pID) === parseInt(id)) {
                if (state.queryData[i].objectID) {
                    return { element, i: parseInt(i) };
                } else {
                    console.log("no");
                }
            } else {
                console.log("buscando");
            }
        }
    };

    const addFavorite = (target) => {

        const id = indexProduct(target.id).i

        let objCache = { ...state.queryData[id] }
        let dataForEdit = [...state.queryData];

        dataForEdit.splice(id, 1, { ...dataForEdit[id], isFave: !objCache.isFave })

        dispatch({
            type: "CHANGE_FIELD",
            path: 'queryData',
            payload: dataForEdit
        })

        let dataStorage = JSON.parse(localStorage.getItem('favoriteData'))

        if (!dataStorage) {
            console.log('nulo')
            localStorage.setItem('favoriteData', JSON.stringify([dataForEdit[id]]))
        } else {

            let isInStorage = dataStorage.filter(item => item.objectID === target.id)
            console.log(isInStorage);

            if (isInStorage.length === 0) {
                dataStorage.push(dataForEdit[id])

                localStorage.setItem('favoriteData', JSON.stringify(dataStorage))
            } else {
                let dataStorageDelete = dataStorage.filter(item => item.objectID !== target.id)
                localStorage.setItem('favoriteData', JSON.stringify(dataStorageDelete))
            }
        }
    }

    const isFaveFn = (value, id) => {

        let dataStorage = JSON.parse(localStorage.getItem('favoriteData'))
        let dataFilter = dataStorage?.filter(item => item.objectID === id)

        if (dataFilter?.length) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (state.allActive) {
            getData(false)
        } else if (state.favesActive) {
            getData(true)
        }
        /* eslint-disable */
    }, [state.allActive, state.favesActive, state.pageNumber, state.techSelected])


    return [{ state },
    {
        dispatch,
        transformDate,
        redirectFn,
        addFavorite,
        isFaveFn,
    }]

}