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

const weekDaysArr = [
    weekDaysRu.split(','),
    weekDaysEn.split(',')
];
console.log(weekDaysArr[+(lang != 'ru')])

const namePerson = 'Артем';
namePerson == 'Артем' ? console.log('директор') :
    namePerson == 'Александр' ? console.log('преподаватель') : console.log('студент');


