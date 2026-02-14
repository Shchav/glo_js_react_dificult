'use strict'

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

// Ползунок установки отката посреднику
const inputRange = document.querySelector('.rollback input');
// Отображение значения ползунка
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
/// CMS
const cmsOpen = document.querySelector('#cms-open');
const mainControlsItem = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.querySelector('#cms-select');
const mainControlsInput = mainControlsItem.querySelector('.main-controls__input');
const cmsOtherInput = mainControlsInput.querySelector('input');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    countScreens: 0,

    init: function () {
        this.addTitle();
        startBtn.addEventListener('click', this.start.bind(this));
        resetBtn.addEventListener('click', this.reset);
        buttonPlus.addEventListener('click', this.addScreenBlock);
        inputRange.addEventListener('input', () => {
            this.rollback = +inputRange.value;
            inputRangeValue.textContent = inputRange.value + '%';
        });
        cmsOpen.addEventListener('change', this.cmsOpen);
        cmsSelect.addEventListener('change', this.cmsSelect);
    },

    // Слушатель выбора типа CMS
    cmsSelect: function (event) {
        if (this.value == 'other') {
            mainControlsInput.style.display = 'flex';
        } else {
            mainControlsInput.style.display = 'none';
        }
    },

    // Слушатель checkbox-а CMS
    cmsOpen: function () {
        if (this.checked) {
            mainControlsItem.style.display = 'flex';
            // Принудительный вызов слушателя cms-select для обработки
            // первичного установленного значения, например "other"
            appData.cmsSelect.call(cmsSelect);
        } else {
            mainControlsItem.style.display = 'none';
        }
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    isUserDataScreensCorrect: function () {
        screens = document.querySelectorAll('.screen');
        for (screen of screens) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (!select.value || isNaN(parseInt(input.value))) {
                return false;
            }
        }
        return true;
    },

    start: function () {
        if (!this.isUserDataScreensCorrect()) {
            return;
        }

        this.addScreens();
        this.addServices();

        this.addPrices();

        // this.logger();
        this.showResult();

        this.reset();
    },

    reset: function (event) {

        const screens = document.querySelectorAll('.screen');
        const allCheckbox = document.querySelectorAll('input[type="checkbox"]');

        if (event == undefined) { // Нажата кнопка "Рассчитать"
            // Все блоки типов экранов становятся недоступными
            screens.forEach(item => {
                item.querySelector('select').setAttribute('disabled', '');
                item.querySelector('input').setAttribute('disabled', '');
            });
            // Кнопка добавления блоков типов экрана становится недоступной
            buttonPlus.setAttribute('disabled', '');
            // Все checkbox-ы становятся недоступными
            allCheckbox.forEach(item => {
                item.setAttribute('disabled', '');
            });
            // Ползунок тоже становится недоступным
            inputRange.setAttribute('disabled', '');
            // Настройки CMS становятся недоступными
            cmsSelect.setAttribute('disabled', '');
            cmsOtherInput.setAttribute('disabled', '');
            // Кнопка "Расчитать" меняется на кнопку "Сброс"
            startBtn.style.display = 'none';
            resetBtn.style.display = '';
        } else { // Нажата кнопка "Сброс"
            // Удаление все добавленных блоков типов экранов кроме начального
            screens.forEach((item, index) => {
                if (index > 0) {
                    item.remove();
                }
            });
            // Установка начального значение для select-а и input-a 
            // начального блока типов экрана с установкой их доступности
            const select = screens[0].querySelector('select');
            select.value = '';
            select.removeAttribute('disabled');
            const input = screens[0].querySelector('input');
            input.value = '';
            input.removeAttribute('disabled');
            // Кнопка добавления блоков типов экрана становится доступной
            buttonPlus.removeAttribute('disabled');
            // Сброс всех checkbox-ов и установка их доступности
            allCheckbox.forEach(item => {
                item.checked = false;
                item.removeAttribute('disabled');
            });
            // Сброс ползунка установки отката посреднику в начальное значение
            // и установка его доступности
            inputRange.value = inputRange.defaultValue;
            inputRange.removeAttribute('disabled');
            inputRangeValue.textContent = inputRange.value + '%';
            // Сброс настроек CMS с установкой их недоступности и скрытием
            cmsSelect.value = '';
            cmsOtherInput.value = '';
            cmsSelect.removeAttribute('disabled');
            cmsOtherInput.removeAttribute('disabled');
            // appData.cmsSelect.call(cmsSelect);
            cmsSelect.checked = false;
            appData.cmsOpen.call(cmsOpen);
            // Сброс все результатов расчетов в первоначальное значение
            document.querySelectorAll('.total-input').forEach(item => {
                item.value = item.defaultValue;
            });
            // Кнопка "Сброс" меняется на кнопку "Рассчитать"
            startBtn.style.display = '';
            resetBtn.style.display = 'none';
        }
    },

    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.countScreens;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        this.screens = [];
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        })
    },

    addServices: function () {
        this.servicesPercent = [];
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }

        })
        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        })
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },

    prompting: function (message, defaultInput, mustBeText) {
        do {
            var input = prompt(message, defaultInput);
        } while (mustBeText == this.isNumber(input));
        return input;
    },

    addPrices: function () {
        this.screenPrice = 0;
        this.countScreens = 0;
        this.servicePricesNumber = 0;
        this.servicePricesPercent = 0;

        for (let screen of this.screens) {
            this.screenPrice += +screen.price; // Стоимость верстки
            this.countScreens += screen.count; // Кол-во экранов
        }
        // Стоимость услуг выражающихся в процентах
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        // Стоимость услуг выражающихся напрямую в рублях
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        // Расчет стоимость верстки в случае ее выполнения с помощью CMS
        let coeff = 1;
        // Если выбрана верстка с помощью СMS WordPress
        if (cmsSelect.value == 50) {
            coeff = cmsSelect.value / 100;
        } else if (cmsSelect.value == 'other' && !isNaN(parseInt(cmsOtherInput.value))) {
            coeff = cmsOtherInput.value / 100;
        }
        this.screenPrice -= this.screenPrice * coeff;
        this.servicePricesNumber -= this.servicePricesNumber * coeff;
        this.servicePricesPercent -= this.servicePricesPercent * coeff;

        // Общая стоимость без учета отката
        this.fullPrice =
            this.screenPrice +         // Стоимость верстки
            this.servicePricesNumber + // Стоимость услуг, выражающихся в процентах
            this.servicePricesPercent; // Стоимость услуг, выражающихся напрямую в рублях
        // Общая стоимость с учетом отката
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },

    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
    }
}

appData.init();


