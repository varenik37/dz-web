function insert_table() {
    let number = parseInt(document.getElementById('number_input').value);
    let table = document.querySelector('#table');
    table.innerHTML = ''; // очищаем таблицу перед новым заполнением

    for (let i = 1; i <= number; i++) {
        let tr = document.createElement('tr');

        for (let j = 1; j <= number; j++) {
            let td = document.createElement('td');
            td.innerText = i * j; // Заполняем ячейку произведением
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

const node_insert_table = document.getElementById("insert_table");
node_insert_table.addEventListener("click", insert_table);
