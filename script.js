const formulario = document.querySelector("form");

const divExibir = document.createElement("div");

const bg = document.querySelector(".bg");

if (!localStorage.getItem('listaDespesas')) {
    localStorage.setItem('listaDespesas', '[]');
}

var listaDespesas = JSON.parse(localStorage.getItem('listaDespesas'));


divExibir.setAttribute('class', 'mt-5 d-flex justify-content-center');


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

    if (listaDespesas.length == 0) {

        divExibir.innerHTML = "<h2>Total: Nenhum registro encontrado</h2>";

        bg.appendChild(divExibir);

        return;

    }

    var total = 0;

    listaDespesas.forEach(despesa => {
        
        total += despesa;

    });

    divExibir.innerHTML = "<h2>Total: " + total + "</h2>";

    bg.appendChild(divExibir);

}


function exibirMedia() {

    if (listaDespesas.length == 0) {

        divExibir.innerHTML = "<h2>Média: Nenhum registro encontrado</h2>";

        bg.appendChild(divExibir);

        return;

    }

    var total = 0;

    listaDespesas.forEach(despesa => {
        
        total += despesa;

    });

    var media = total / listaDespesas.length;

    divExibir.innerHTML = "<h2>Média: " + media + "</h2>";

    bg.appendChild(divExibir);

}


function exibirDespesaMaisAlta() {

    if (listaDespesas.length == 0) {

        divExibir.innerHTML = "<h2>Despesa mais alta: Nenhum registro encontrado</h2>";

        bg.appendChild(divExibir);

        return;

    }

    var maior = 0;

    listaDespesas.forEach(despesa => {

        if (maior < despesa) {

            maior = despesa;

        }
    });

    divExibir.innerHTML = "<h2>Despesa mais alta: " + maior + "</h2>";

    bg.appendChild(divExibir);

}


function exibirLista() {

    var htmlInterno = "<table class='table table-dark table-bordered text-center'><tr><th>Despesas</th><th></th></tr>";

    if (listaDespesas.length == 0) {

        divExibir.innerHTML = htmlInterno + " <tr><td>Nenhum registro encontrado</td><td></td></tr></table>";

        bg.appendChild(divExibir);

        return;

    }

    listaDespesas.forEach((despesa, indice) => {
        
        htmlInterno += "<tr><td>" + despesa + "</td> <td><button class='btn btn-danger btn-sm' onclick='apagarDespesa(" + indice + ")'>Excluir</button></td></tr>";

    });

    htmlInterno += "</table>";

    divExibir.innerHTML = htmlInterno;

    bg.appendChild(divExibir);
    

}


function apagarDespesa(indice) {

    listaDespesas.splice(indice, 1);

    localStorage.setItem('listaDespesas', JSON.stringify(listaDespesas));

    exibirLista();

}


function apagarDespesas() {

    localStorage.setItem('listaDespesas', '[]');

    listaDespesas = [];

    divExibir.innerHTML = "";

    bg.appendChild(divExibir);

}


formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    const despesa = verificarDespesa();
    
    if (despesa) {

        listaDespesas.push(despesa);

        localStorage.setItem('listaDespesas', JSON.stringify(listaDespesas));

        formulario.reset();

        divExibir.innerHTML = "";

        bg.appendChild(divExibir);

    }

})