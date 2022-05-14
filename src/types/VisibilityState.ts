export enum VisibilityActionType {
    SHOW_FILTER = 'SHOW_FILTER',
    SHOW_TEASER = 'SHOW_TEASER',
    HIDE_MAP_OVERLAY = 'HIDE_MAP_OVERLAY',
    SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS',
    HIDE_SEARCH_RESULTS = 'HIDE_SEARCH_RESULTS',
    HIDE_ALL = 'HIDE_ALL'
}

export interface VisibilityAction {
    type: VisibilityActionType
}

export interface VisibilityState {
    showFilter: boolean,
    showTeaser: boolean,
    showSearchResults: boolean
}