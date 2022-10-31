import { createContext, useEffect, useReducer } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CATEGORIES_ACTION_TYPES = {
    GET_CATEGORIES: 'GET_CATEGORIES'
}

const categoryReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.GET_CATEGORIES:
            return {
                ...state,
                categoriesMap: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in categoriesReducer`)
    }
}

const INITIAL_STATE = {
    categoriesMap: null
}

export const CategoriesProvider = ({ children }) => {
    const [ {categoriesMap}, dispatch ] = useReducer(categoryReducer, INITIAL_STATE);

    const setCategoriesMap = (categories) => {
        dispatch({ type: CATEGORIES_ACTION_TYPES.GET_CATEGORIES, payload: categories })
    }

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}