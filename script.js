'use strict'

const isNumber = function (num) {
    return !!num && isFinite(num) && !num.includes(' ');
}

const guessNum = function (wishNum) {
    let numAttemps = 10;

    return function game() {

        let userNum = prompt('Угадай число от 1 до 100');

        function check(cond, message, isContinue) {
            if (cond) {
                if (isContinue == undefined) {
                    if (confirm(message)) {
                        numAttemps = 10;
                        game();
                    }
                } else if (isContinue) {
                    alert(message);
                    game();
                } else if (!isContinue) {
                    alert(message);
                }
            }
            return cond;
        }
        check(numAttemps == 1, 'Попытки закончились, хотите сыграть еще?') ||
            check(userNum == null, 'Игра окончена', false) ||
            check(!isNumber(userNum), 'Введи число!', true) ||
            check(userNum > wishNum, 'Загаданное число меньше, осталось попыток ' + --numAttemps, true) ||
            check(userNum < wishNum, 'Загаданное число больше, осталось попыток ' + numAttemps, true) ||
            check(userNum == wishNum, 'Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
    }
}

guessNum(23)();