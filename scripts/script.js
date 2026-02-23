const square = document.querySelector('.square-body');
const blocks = document.querySelectorAll('.block');
const reset = document.querySelector('.btn-reset');

const changeNumber = function (blockIndex1, blockIndex2) {
    // Предлагаемые индексы блоков для обмена числами должны быть валидными
    if (blockIndex1 < 0 || blockIndex1 >= blocks.length ||
        blockIndex2 < 0 || blockIndex2 >= blocks.length
    ) return;
    const block1 = blocks[blockIndex1].querySelector('.block-number');
    const block2 = blocks[blockIndex2].querySelector('.block-number');
    const num = block1.textContent;
    block1.textContent = block2.textContent;
    block2.textContent = num;
}

square.addEventListener('click', (e) => {
    // Нажатая стрелка
    const arrow = e.target.closest('.arrow');
    // Текущий блок, которому принадлежить нажатая стрелка
    let currentBlock = arrow.closest('.block');
    let currentBlockIndex; // и его индекс в массиве блоков
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] == currentBlock) {
            currentBlockIndex = i;
            break;
        }
    }
    if (arrow.closest('.left')) {
        changeNumber(currentBlockIndex, currentBlockIndex - 1);
    }
    if (arrow.closest('.right')) {
        changeNumber(currentBlockIndex, currentBlockIndex + 1);
    }
    if (arrow.closest('.top')) {
        changeNumber(currentBlockIndex, currentBlockIndex - 5);
    }
    if (arrow.closest('.bottom')) {
        changeNumber(currentBlockIndex, currentBlockIndex + 5);
    }
});

reset.addEventListener('click', (e) => {
    blocks.forEach((block, index) => {
        block.querySelector('.block-number').textContent = index + 1;
    })
});