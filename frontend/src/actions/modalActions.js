export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';


export const showModal = (modalData) => {
    return {
        type: "SHOW_MODAL",
        payload: {
            show: true,
            title: modalData.title,
            body: modalData.body,
            buttons: modalData.buttons
        }
    }
}

export const hideModal = (modalData) => {
    return {
        type: "HIDE_MODAL",
        payload: {
            show: false
        }
    }
}
