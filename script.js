'use strict'

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    asking: function () {
        appData.title = appData.prompting('Как называется ваш проект?', 'Калькулятор верстки', true);

        for (let i = 0; i < 2; i++) {
            let name = appData.prompting('Какие типы экранов нужно разработать?', 'Простые, сложные', true);
            let price = 0;


            price = +appData.prompting('Сколько будет стоить данная работа?', 10_000, false);

            appData.screens.push({ id: i, name: name, price: price });
        }

        for (let i = 0; i < 2; i++) {
            let name = appData.prompting('Какой дополнительный тип услуги нужен?', 'Тестирование', true);
            let price = 0;

            price = appData.prompting('Сколько это будет стоить?', 20_000, false);

            appData.services[name + '_' + i] = +price;
        };

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    prompting: function (message, defaultInput, mustBeText) {
        do {
            var input = prompt(message, defaultInput);
        } while (mustBeText == appData.isNumber(input));
        return input;
    },

    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (screenPrice, screen) {
            return screenPrice + screen.price;
        }, 0);

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так";
        }
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
    }
}

appData.start();


