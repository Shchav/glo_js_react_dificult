'use strict'

const formatDate1 = function (now) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    let hoursStr;
    const nowHours = now.getHours() + '';
    if (nowHours.slice(-1) == 1 && nowHours != 11)
        hoursStr = 'час';
    else if ([2, 3, 4].includes(+nowHours.slice(-1)) && ![12, 13, 14].includes(+nowHours))
        hoursStr = 'часа';
    else hoursStr = 'часов';

    return 'Сегодня ' +
        days[now.getDay()] + ', ' +
        now.getDate() + ' ' +
        months[now.getMonth()] + ' ' +
        now.getFullYear() + ' года' + ', ' +
        now.getHours() + ' ' + hoursStr + ' ' +
        now.getMinutes() + ' минут ' +
        now.getSeconds() + ' секунды';
}

const formatDate2 = function (now) {
    const addZero = function (num) {
        if (num < 10) return '0' + num;
        return num;
    }

    return addZero(now.getDate()) + '.' +
        addZero(now.getMonth()) + '.' +
        addZero(now.getFullYear()) + ' - ' +
        addZero(now.getHours()) + ':' +
        addZero(now.getMinutes()) + ':' +
        addZero(now.getSeconds());
}

setInterval(function () {
    document.body.innerHTML = formatDate1(new Date()) + '<br>';
    document.body.innerHTML += formatDate2(new Date());
}, 1000);

