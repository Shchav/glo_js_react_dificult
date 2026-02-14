'use stict'

const DomElement = function (selector) {

    const createElem = function (selector) {
        this.selector = selector;
        switch (selector[0]) {
            case '.':
                this.elem = document.createElement('div');
                this.elem.classList.add(selector.slice(1));
                break;
            case '#':
                this.elem = document.createElement('p');
                this.elem.id = selector.slice(1);
        }
        if (this.elem) {
            document.body.append(this.elem);
            this.elem.style.left = '0';
            this.elem.style.top = '0';
        }
        console.log(1, this);
    }

    this.setText = function (text) {
        if (this.elem) {
            this.elem.textContent = text;
            return this;
        }
    }

    this.setWidth = function (width) {
        if (this.elem) {
            this.width = width;
            this.elem.style.cssText += 'width: ' + width + 'px;';
            return this;
        }
    }
    this.setHeight = function (height) {
        if (this.elem) {
            this.height = height;
            this.elem.style.cssText += 'height: ' + height + 'px;';
            return this;
        }
    }
    this.setBackground = function (color) {
        if (this.elem) {
            this.bg = color;
            this.elem.style.cssText += 'background: ' + color + ';';
            return this;
        }
    }
    this.setFontsize = function (fontSize) {
        if (this.elem) {
            this.fontSize = fontSize;
            this.elem.style.cssText += 'font-size: ' + fontSize + 'px;';
            return this;
        }
    }
    this.element = function () {
        return this.elem;
    }
    this.setPosition = function (position) {
        if (this.elem) {
            this.elem.style.cssText += 'position: ' + position;
            return this;
        }
    }

    createElem.call(this, selector);
}

square = new DomElement('.square').setWidth(100).setHeight(100).
    setFontsize(14).setBackground('#AAAAAA').setPosition('absolute');

document.addEventListener('keydown', event => {
    const step = 10; // px
    if (event.key === 'ArrowLeft') {
        square.element().style.left = parseInt(square.element().style.left) - step + 'px';
    } else if (event.key === 'ArrowRight') {
        square.element().style.left = parseInt(square.element().style.left) + step + 'px';
    } else if (event.key === 'ArrowUp') {
        square.element().style.top = parseInt(square.element().style.top) - step + 'px';
    } else if (event.key === 'ArrowDown') {
        square.element().style.top = parseInt(square.element().style.top) + step + 'px';
    }
})

// new DomElement('.block').setWidth(50).setHeight(20).
//     setFontsize(14).setBackground('#AAAAAA').setText('Привет');


// square.setCSS('height: 100px; width: 100px; position: absolute; background: #AAAAAA');
