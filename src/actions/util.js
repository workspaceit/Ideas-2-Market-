export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const SHOW_LOADER2 = 'SHOW_LOADER2'
export const HIDE_LOADER2 = 'HIDE_LOADER2'

export const showLoader = () => ({ type: SHOW_LOADER })
export const hideLoader = () => ({ type: HIDE_LOADER })

export const showLoader2 = () => ({ type: SHOW_LOADER2 })
export const hideLoader2 = () => ({ type: HIDE_LOADER2 })

export function toggleLoader() {
    return (dispatch, getState) => {
        const state = getState()
        dispatch(state.util.loading ? hideLoader() : showLoader())
      }
}

export function toggleLoader2() {
    return (dispatch, getState) => {
        const state = getState()
        dispatch(state.util.loading2 ? hideLoader2() : showLoader2())
      }
}