/**
 * Created by Enot on 22.11.2016.
 */

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generateArray").addEventListener("click", function () {
        viewHtml("arr")
    });
    document.getElementById("solveTransportTask").addEventListener("click", function () {
        viewHtml("TransportTask")
    });
});
function viewHtml(flagView) {
    if (flagView == "arr") {
        let flag = document.getElementsByName("html/consoleArrayTask");
        if (flag[0].checked) {
            createArray(flag[0].checked)
        }
        else {
            arrayViewHtml();
        }
    }
    if (flagView == "TransportTask") {
        let flag = document.getElementsByName("html/consoleTransportTask");
        if (flag[0].checked) {
            solutionTransportTask(flag[0].checked);
        }
        else {
            transportTaskViewHtml();
        }
    }
}

/********TASK 2********/
function createArray(flag) {
    let max = 1000000;
    let startCreateArray = new Date();
    var arr = [];
    for (let i = 0; i < 1000000; i++) {
        let randomItem = Math.random() * max;
        let intRandomItem = Math.floor(randomItem);
        arr[i] = intRandomItem;
    }
    let endCreateArray = new Date();

    let startSortAscending = new Date();
    let ascendingArray = arr.slice().sort(function (a, b) {
        return a - b;
    });
    let endSortAscending = new Date();

    let startSortDescending = new Date();
    let descendingArray = arr.slice().sort(function (a, b) {
        return b - a;
    });
    let endSortDescending = new Date();

    let timeCreateArray = endCreateArray - startCreateArray;
    let timeAscendingSort = endSortAscending - startSortAscending;
    let timeDescendingArray = endSortDescending - startSortDescending;

    if (flag) {
        viewConsoleArray()
    }
    else {
        return returnData();
    }

    function returnData() {
        var dataArr = [];

        let sumElement = arr.reduce(function (sum, currentItem) {
            return sum + currentItem;
        }, 0);
        dataArr.push(timeCreateArray, timeAscendingSort, timeDescendingArray, sumElement);
        return dataArr;
    }

    function viewConsoleArray() {
        console.clear();
        console.info("--- Task 2 ---");
        viewConsoleMass("Рандомный массив", arr);
        viewConsoleMass("Массив по возрастанию", ascendingArray);
        viewConsoleMass("Массив по убыванию", descendingArray);
        sumElementsMass(arr);
        viewConsoleTime("Генерация массива", timeCreateArray);
        viewConsoleTime("Сортировка массива по возростанию", timeAscendingSort);
        viewConsoleTime("Сортировка массива по убыванию", timeDescendingArray);

        function viewConsoleMass(nameArr, array) {
            console.log(nameArr);
            console.log(array);
        }

        function sumElementsMass(array) {
            var sumResult = array.reduce(function (sum, currentItem) {
                return sum + currentItem;
            }, 0);
            console.log("Сумма елементов массива: " + sumResult.toLocaleString());
        }

        function viewConsoleTime(name, spentTime) {
            console.log(name + " : " + spentTime + "ms");
        }
    }
}
function arrayViewHtml() {
    let dataArray = createArray();

    let tableViewArrayHtml = document.getElementById("resultArrayGenerate");
    tableViewArrayHtml.innerHTML = "";

    document.getElementById('tableArray').style.visibility = "visible";

    let nameRowTable = ["Время генерации массива (ms)", "Время сортировки по возростанию (ms)", "Время сортировки по убыванию (ms)", "Сумма елементов массива"];
    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        tableViewArrayHtml.innerHTML += tr.innerHTML = "<td>" + nameRowTable[i] + "</td> <td>" + dataArray[i] + "</td>";
    }
}

/********TASK 3********/
function solutionTransportTask(flag) {
    let matrixA = [60, 80, 100];
    let matrixB = [40, 60, 80, 60];
    let matrixC = [[1, 3, 4, 2], [4, 5, 8, 3], [2, 3, 6, 7]];

    var copyMatrixA = matrixA.slice();
    var copyMatrixB = matrixB.slice();

    northWestCorner(matrixA, matrixB, matrixC);

    function northWestCorner(stocksMatrix, needMatrix, matrixSupportPlan) {
        for (let i = 0; i < matrixSupportPlan.length; i++) {
            for (let j = 0; j < matrixSupportPlan[i].length; j++) {
                min(i, j);
            }
        }
        function min(pos1, pos2) {
            if (stocksMatrix[pos1] == 0 || needMatrix[pos2] == 0) {
                matrixSupportPlan[pos1][pos2] = 0;
            }
            else if (stocksMatrix[pos1] >= needMatrix[pos2]) {
                matrixSupportPlan[pos1][pos2] = needMatrix[pos2];
                stocksMatrix[pos1] -= needMatrix[pos2];
                needMatrix[pos2] = 0;
            }
            else {
                matrixSupportPlan[pos1][pos2] = stocksMatrix[pos1];
                needMatrix[pos2] -= stocksMatrix[pos1];
                stocksMatrix[pos1] = 0;
            }
        }
    }

    if (flag) {
        viewConsoleTable(matrixC);
    }
    else {
        return dataResultTransportTask();
    }

    function dataResultTransportTask() {
        for (let i = 0; i < matrixC.length; i++) {
            matrixC[i].unshift("A" + (i+1));
            matrixC[i].push(copyMatrixA[i]);

        }
        let nameColumn = [];
        for(let j = 1;j< (matrixC[0].length-1);j++){
            nameColumn[j] = ("B" + j);
        }
        nameColumn[0] = "Поставщик";
        nameColumn.push("Запас")

        copyMatrixB.unshift("Потребность");
        matrixC.unshift(nameColumn);
        matrixC.push(copyMatrixB);

        return matrixC;
    }

    function viewConsoleTable(matrix) {
        console.clear();
        console.info("--- Task 3 ---");

        let viewObj = {};
        for (let i = 0; i < matrix.length; i++) {
            let objRow = {};
            let nameColumn = ("A" + (i + 1));

            for (let j = 0; j < matrix[i].length; j++) {
                let nameRow = ("B" + (j + 1));
                objRow[nameRow] = matrix[i][j];
            }
            viewObj[nameColumn] = objRow;
        }
        console.table(viewObj);
    }
}
function transportTaskViewHtml() {
    let dataTransportTask = solutionTransportTask();
    let tableViewTransportTaskHtml = document.getElementById("resultTransportTask");

    removeChild(tableViewTransportTaskHtml);
    createTable(tableViewTransportTaskHtml, dataTransportTask);

    function removeChild(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    function createTable(container, data) {
        container.style.visibility = "visible";
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < data[i].length; j++) {
                let td = document.createElement('td');
                td.innerHTML = data[i][j];
                tr.appendChild(td);
            }
            container.appendChild(tr);
        }
    }
}
