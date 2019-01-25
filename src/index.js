import './index.css';

const getXY = (source) => {
    const y = source.findIndex(arr => arr.includes(null));
    const x = source[y].findIndex(x => x === null);
    return { y, x };
};

const fifteen = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, null, 15]
];

const winningState = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null]
];

const shuffleState = (stateOfGame) => {
    const shuffleArr = (inputArr) => {
        const arr = [...inputArr];
        for (let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };
    const flattenArr = stateOfGame.reduce((acc, val) => {
        return [...acc, ...val];
    }, []);
    const shuffledArr = shuffleArr(flattenArr);
    return [
        shuffledArr.slice(0, 4),
        shuffledArr.slice(4, 8),
        shuffledArr.slice(8, 12),
        shuffledArr.slice(12, 16),
    ];
};

const checkWin = function() {
    if (stateOfGame.join() === winningState.join()) {
        alert("Congratulation, you won. Close this window to start again");
        stateOfGame = shuffleState(fifteen);
        renderGame(stateOfGame);
    }
};

const renderRow = (arr) =>
    `<div class='square'>${arr.join('</div><div class=\'square\'>')}</div>`;

const renderRows = (arr) => {
    return arr.reduce((acc, current) => {
        return acc + renderRow(current);
    }, '');
};

const renderGame = (shuffledArray, domNode = document.getElementById('app')) => {
    const rows = renderRows(shuffledArray).replace(
        '<div class=\'square\'></div>',
        '<div class=\'square empty\'></div>'
    );
    domNode.innerHTML = rows;
    checkWin();
};

let stateOfGame = shuffleState(fifteen);
renderGame(stateOfGame);

document.addEventListener('keydown', e => {
    const xyOfEmptyCell = getXY(stateOfGame);
    if (e.keyCode === 38) {
        // up arrow
        if (xyOfEmptyCell.y === 3) return;
        // figure out why we have this checking -
        // all arrays contain elements with indexes from 0 to 3; if empty cell is already on the bottom (in this case), we cannot move it further;
        // in general we need it to perform moves only inside game field and avoid new elements creation behind it.
        const nextY = xyOfEmptyCell.y + 1;
        const nextX = xyOfEmptyCell.x;
        stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
        stateOfGame[nextY][nextX] = null;
        renderGame(stateOfGame);
    }
    else if (e.keyCode === 40) {
        // down arrow
        if (xyOfEmptyCell.y === 0) return;
        const nextY = xyOfEmptyCell.y - 1;
        const nextX = xyOfEmptyCell.x;
        stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
        stateOfGame[nextY][nextX] = null;
        renderGame(stateOfGame);
    }
    else if (e.keyCode === 37) {
        // left arrow
        if (xyOfEmptyCell.x === 3) return;
        const nextY = xyOfEmptyCell.y;
        const nextX = xyOfEmptyCell.x + 1;
        stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
        stateOfGame[nextY][nextX] = null;
        renderGame(stateOfGame);
    }
    else if (e.keyCode === 39) {
        // right arrow
        if (xyOfEmptyCell.x === 0) return;
        const nextY = xyOfEmptyCell.y;
        const nextX = xyOfEmptyCell.x - 1;
        stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
        stateOfGame[nextY][nextX] = null;
        renderGame(stateOfGame);
    }
});
