'use strict'

const func = function (str) {
    if (typeof str != 'string') {
        console.log('Переданный параметр не является строкой');
        return;
    }

    if (str[0] == ' ')
        str = func(str.slice(1));
    else if (str[str.length - 1] == ' ')
        str = func(str.slice(0, -1));

    const maxLength = 30;
    if (str.length > maxLength) {
        str = str.substr(0, maxLength) + '...';
    }

    return str;
}

func(123);
console.log(func("             Lorem ipsum dolor sit amet, consectetur \
    adipisicing elit.Ipsum placeat, omnis amet veniam, nemo \
    doloremque ab illum dolor qui quos nobis repudiandae quibusdam \
    est.Architecto similique porro quod dolor enim.Commodi quis \
    neque voluptatibus dicta cumque illo ratione corrupti deleniti.     "));
console.log('\'', func("             Lorem ipsum                   ") + '\'');

