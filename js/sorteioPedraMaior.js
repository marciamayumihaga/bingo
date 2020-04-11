let numerosSorteados = [];

function sortearPedraMaior()  {
    let numeroSorteado = Math.floor(Math.random() * 75) + 1;
    while (verificaNumeroJaFoiSorteado(numeroSorteado)) {
        numeroSorteado = Math.floor(Math.random() * 75) + 1;
    }
    numerosSorteados.push(numeroSorteado);
    let modeloNumeroSorteadoPedraMaior = $("<div>").append($("#divModeloNumeroSorteadoPedraMaior").clone()).html();
    modeloNumeroSorteadoPedraMaior = modeloNumeroSorteadoPedraMaior.replace("#VALOR_NUMERO_SORTEADO_PEDRA_MAIOR#", numeroSorteado);
    modeloNumeroSorteadoPedraMaior = modeloNumeroSorteadoPedraMaior.replace("divModeloNumeroSorteadoPedraMaior", "numeroSorteadoPedraMaior" + numeroSorteado);
    $("#divNumerosSorteadosPedraMaior").append(modeloNumeroSorteadoPedraMaior);
    let novoNumeroSorteado = $("#numeroSorteadoPedraMaior" + numeroSorteado);
    $(".ultimo-numero-sorteado-pedra-maior").addClass("numero-sorteado-pedra-maior");
    $(".ultimo-numero-sorteado-pedra-maior").removeClass("ultimo-numero-sorteado-pedra-maior");
    novoNumeroSorteado.addClass("ultimo-numero-sorteado-pedra-maior");
    // Deixa o tamanho da bolinha maior de acordo com o número
    let tamanhoNumeroSorteado = 50 + (numeroSorteado - 1) * 2;
    novoNumeroSorteado.css("width", tamanhoNumeroSorteado);
    novoNumeroSorteado.css("height", tamanhoNumeroSorteado);
    novoNumeroSorteado.css("line-height", tamanhoNumeroSorteado + "px");
    novoNumeroSorteado.css("border-radius", tamanhoNumeroSorteado);
    // Destaca a bolinha de pedra maior
    if (verificaPedraMaior(numeroSorteado)) {
        $(".pedra-maior").removeClass("pedra-maior");
        novoNumeroSorteado.addClass("pedra-maior");
    }
    if (numerosSorteados.length == 75) {
        $("#btnSortearPedraMaior").attr("disabled", "disabled");
    }
}

function verificaNumeroJaFoiSorteado(numero) {
    for (let i = 0; i < numerosSorteados.length; i++) {
        if (numerosSorteados[i] == numero) {
            return true;
        }
    }
    return false;
}

function verificaPedraMaior(numero) {
    for (let i = 0; i < numerosSorteados.length; i++) {
        if (numerosSorteados[i] > numero) {
            return false;
        }
    }
    return true;
}

function reiniciarPedraMaior() {
    numerosSorteados = [];
    $("#divNumerosSorteadosPedraMaior").html("");
    $("#btnSortearPedraMaior").removeAttr("disabled");
}