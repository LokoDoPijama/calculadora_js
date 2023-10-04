const formulario = document.querySelector("form");

const divExibir = document.createElement("div");

if (!localStorage.getItem('listaDespesas')) {
    localStorage.setItem('listaDespesas', '[]');
}

var listaDespesas = JSON.parse(localStorage.getItem('listaDespesas'));


function verificarDespesa() {

    var despesa = document.getElementById("ttbDespesa").value;

    despesa = Number(despesa);

    if (despesa <= 0 || isNaN(despesa)) {

        alert("Por favor inserir um valor de despesa válido");

        return false;

    }

    return despesa;

}


function exibirTotal() {

    var total = 0;

    listaDespesas.forEach(despesa => {
        
        total += despesa;

    });

    divExibir.innerHTML = "<h2>Total: " + total + "</h2>";

    document.body.appendChild(divExibir);

}


function exibirMedia() {

    var total = 0;

    listaDespesas.forEach(despesa => {
        
        total += despesa;

    });

    var media = total / listaDespesas.length;

    divExibir.innerHTML = "<h2>Média: " + media + "</h2>";

    document.body.appendChild(divExibir);

}


function exibirLista() {

    var htmlInterno = "<table><tr><th>Despesas</th></tr>";

    listaDespesas.forEach(despesa => {
        
        htmlInterno += "<tr><td>" + despesa + "</td></tr>";

    });

    htmlInterno += "</table>";

    divExibir.innerHTML = htmlInterno;

    document.body.appendChild(divExibir);

}


formulario.addEventListener("submit", function(e) {

    const despesa = verificarDespesa();
    
    if (despesa) {

        listaDespesas.push(despesa);

        localStorage.setItem('listaDespesas', JSON.stringify(listaDespesas));

    } else {
        e.preventDefault();
    }

})