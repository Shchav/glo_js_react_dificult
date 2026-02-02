const lang = 'ru';
const weekDaysRu = 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье';
const weekDaysEn = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

if (lang == 'ru') console.log(weekDaysRu);
else console.log(weekDaysEn);

switch (lang) {
    case "ru": {
        console.log(weekDaysRu);
        break;
    }
    default: console.log(weekDaysEn);
}

let weekDaysArr = [];
weekDaysArr[0] = weekDaysRu.split(',');
weekDaysArr[1] = weekDaysEn.split(',');
console.log(weekDaysArr[lang == 'ru' ? 0 : 1])

const namePerson = 'Артем';
namePerson == 'Артем' ? console.log('директор') :
    namePerson == 'Александр' ? console.log('преподаватель') : console.log('студент');


