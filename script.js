'use strict'

const week = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];

const currentDate = new Date().toLocaleDateString('ru-RU', { weekday: 'long' });
document.body.innerHTML =
    week.reduce(function (htmlStr, item, index) {
        if (item.toLowerCase() == currentDate.toLowerCase())
            item = '<b>' + item + '</b>';
        if (index >= 5) item = '<i>' + item + '</i>';
        return htmlStr += item + '<br>';
    }, '');
