const formulario = document.querySelector("form");

const divExibir = document.createElement("div");

const bg = document.querySelector(".bg");

if (!localStorage.getItem('listaDespesas')) {
    localStorage.setItem('listaDespesas', '[]');
}

var listaDespesas = JSON.parse(localStorage.getItem('listaDespesas'));

divExibir.setAttribute('class', 'mt-5 d-flex justify-content-center');


function formatarValor(valor) {

    valor = Number(valor);

    if (String(valor).includes(".")) {

        valorSplit = String(valor).split(".");

        if (valorSplit[0] === '') {
            valorSplit[0] = '0';
        }

        if (valorSplit[1].length == 1) {
            valorSplit[1] += "0";
        }

        valor = valorSplit[0] + "." + valorSplit[1].slice(0, 2);

    } else {

        valor += ".00";

    }

    return valor;

}


function verificarDespesa() {

    var despesa = document.getElementById("ttbDespesa").value;

    if (Number(despesa) < 0.01 || isNaN(Number(despesa)) || despesa.length > 15 || despesa[despesa.length - 1] == '.') {

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
        
        total += Number(despesa);

    });

    total = formatarValor(total);

    divExibir.innerHTML = "<h2>Total: R$ " + total + "</h2>";

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
        
        total += Number(despesa);

    });

    var media = total / listaDespesas.length;

    media = formatarValor(media);

    divExibir.innerHTML = "<h2>Média:  R$ " + media + "</h2>";

    bg.appendChild(divExibir);

}


function exibirDespesaMaisAlta() {

    if (listaDespesas.length == 0) {

        divExibir.innerHTML = "<h2 class='text-center'>Despesa mais alta: Nenhum registro encontrado</h2>";

        bg.appendChild(divExibir);

        return;

    }

    var maior = 0;

    listaDespesas.forEach(despesa => {

        if (Number(maior) < Number(despesa)) {

            maior = despesa;

        }
    });

    divExibir.innerHTML = "<h2>Despesa mais alta: R$ " + maior + "</h2>";

    bg.appendChild(divExibir);

}


function exibirLista() {

    var htmlInterno = "<table id='tabela' class='table table-dark table-bordered text-center'><tr><th>Despesas</th><th></th></tr>";

    if (listaDespesas.length == 0) {

        divExibir.innerHTML = htmlInterno + " <tr><td>Nenhum registro encontrado</td><td></td></tr></table>";

        bg.appendChild(divExibir);

        return;

    }

    listaDespesas.forEach((despesa, indice) => {
        
        htmlInterno += "<tr><td>R$ " + despesa + "</td> <td><button class='btn btn-danger btn-sm' onclick='apagarDespesa(" + indice + ")'>Excluir</button></td></tr>";

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

    bg.removeChild(divExibir);

}


formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    var despesa = verificarDespesa();
    
    if (despesa) {

        despesa = formatarValor(despesa);

        listaDespesas.push(despesa);

        localStorage.setItem('listaDespesas', JSON.stringify(listaDespesas));

        formulario.reset();

        bg.removeChild(divExibir);

    }

})