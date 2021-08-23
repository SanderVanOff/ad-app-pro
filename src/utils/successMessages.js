const SUCCESS_CODES = {
    SUCCESS_CREATE_AD: "Объявление создано и отправно на модерацию",
    SUCCESS_UPDATE_AD: "Объявление обновлено и отправлено на модерацию",
    SUCCESS_OPEN_AD: "Объявление восстановлено и отправлено на модерацию",
    SUCCESS_CLOSE_AD: "Объявление закрыто",
    SUCCESS_UPDATE_USER: "Данные пользователя обновлены"
}


export function getSuccessMessage (code) {
    return SUCCESS_CODES[code]
}