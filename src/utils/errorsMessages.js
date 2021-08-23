const ERROR_CODES = {
    EMAIL_OR_PASSWORD_INVALID: "Неправильный адрес электронной почты или пароль",
    EMAIL_HAS_BEEN_REGISTER: "Пользователь с этим адресом электронной почты уже зарегистрирован",
    ERROR_OCCURRED_DATA: "При добавлении данных произошла ошибка",
    ERROR_GET_USER_DATA: "Возникла проблема получения данных текущего пользователя",
    ERROR_UPDATE_USER_DATA: "Возникла проблема обновления данных текущего пользователя",

    ERROR_FETCH_AD_DATA: 'При получении данных произошла проблема',
    ERROR_FETCH_CATEGORIES_DATA: 'При получении категорий произошла проблема',
    ERROR_CREATE_NEW_AD: 'При создании объявления возникла проблема',
    ERROR_UPDATE_AD: 'При обновлении объявления возникла проблема',
}


export function getErrorMessage (code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}