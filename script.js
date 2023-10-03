const formulario = document.querySelector("form");

if (!localStorage.getItem('listaDespesas')) {
    localStorage.setItem('listaDespesas', '[]');
}

listaDespesas = JSON.parse(localStorage.getItem('listaDespesas'));


function verificarDespesa() {

    var despesa = document.getElementById("ttbDespesa").value;

    despesa = Number(despesa);

    if (despesa <= 0 || isNaN(despesa)) {

        alert("Por favor inserir um valor de despesa válido");

        return false;

    }

    return despesa;

}

formulario.addEventListener("submit", function(e) {

    const despesa = verificarDespesa();
    
    if (despesa) {

        listaDespesas.push(despesa);

        localStorage.setItem('listaDespesas', JSON.stringify(listaDespesas));

    }

})