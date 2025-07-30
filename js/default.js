let divisaoNumeros = [{letra:"B", inicio:1, fim:15}
                    , {letra:"I", inicio:16, fim:30}
                    , {letra:"N", inicio:31, fim:45}
                    , {letra:"G", inicio:46, fim:60}
                    , {letra:"O", inicio:61, fim:75}];

let sorteioIniciado = false;
let ultimoNumeroCantado = "";
let audio;
let sorteando = false;
let quantidadeTipoSom = 2;
let tipoSomSelecionado = 1;
let _sortearOrdenado = false;
let _numeroSorteado = 0;

$(function() {
    let painelBolinhas = $("#divPainelBolinhas");
    let modeloLinha = $("<div>").append($("#divModeloLinha").clone()).html();
    let modeloNumero = $("<div>").append($("#divModeloNumero").clone()).html();
    for (let i=0; i<divisaoNumeros.length; i++) {
        let linhaLetra = divisaoNumeros[i];
        linha = modeloLinha.replace("#VALOR_LETRA#", linhaLetra.letra);
        linha = linha.replace("divModeloLinha", "linha" + i);
        linha = linha.replace("divModeloLetra", "letra" + linhaLetra.letra);
        let numeros = "";
        for(let j=linhaLetra.inicio; j<=linhaLetra.fim; j++) {
            let numero = modeloNumero.replace("#VALOR_NUMERO#", j);
            numero = numero.replace("divModeloNumero", "numero" + j);
            numeros += numero;
        }
        linha = linha.replace(modeloNumero, numeros);
        painelBolinhas.append(linha);
    }
});

function sortear() {
    if (!sorteando) {
        sorteando = true;
        sorteioIniciado = true;
        if ( sorteioIniciado == true ){
            $('body').addClass('sorteando');
        }
        
        let numeroSorteado = _sortearOrdenado ? ++_numeroSorteado : Math.floor(Math.random() * 75) + 1;
        let numero = $("#numero" + numeroSorteado);
            
        while (!_sortearOrdenado && (numero.hasClass("numero-sorteado") || numero.hasClass("ultimo-numero-sorteado"))) {
            numeroSorteado = Math.floor(Math.random() * 75) + 1;
            numero = $("#numero" + numeroSorteado);
        }
		
		if ($("#btnAtivarSom").hasClass("som-ativado")) {
            audio = new Audio("audio_" + tipoSomSelecionado + "/" + numeroSorteado + ".mp3");
			audio.addEventListener('loadedmetadata', () => {
				setTimeout(function() {
					marcarNumeroSorteado(numero, numeroSorteado);
					setTimeout(function() {
						sorteando = false;
					}, 3);
				}, (audio.duration - 3) * 1000);
				
				
			});
			audio.play();		
        }
		else {
			marcarNumeroSorteado(numero, numeroSorteado);
			sorteando = false;
        }
    }
}

function dance(){
    $('.personagem').addClass("danca");    
}

function stopDance(){    
    setTimeout(function(){
        sorteando = false;
        $('.personagem').removeClass("danca");       
    },800);
}

function reiniciar() {
    $(".numero-sorteado").removeClass("numero-sorteado");
    $(".ultimo-numero-sorteado").removeClass("ultimo-numero-sorteado");
    $(".ultima-letra-sorteada").removeClass("ultima-letra-sorteada");
    $("#divNumeroSorteado").html("");
    $("#btnSortear").removeAttr("disabled");
    
    $('body').removeClass('sorteando');
	_numeroSorteado = 0;
}


function ativarSom() {
    if ($("#btnAtivarSom").hasClass("som-desativado"))
    {
		tipoSomSelecionado = 1;
        $("#btnAtivarSom").removeClass("som-desativado");
        $("#btnAtivarSom").addClass("som-ativado");
        $("#btnAtivarSom").attr("title", "Som ativado");
		$("#spanTipoSom").html(tipoSomSelecionado);
		$("#spanTipoSom").show();
    }
    else {
		if (tipoSomSelecionado < quantidadeTipoSom) {
			tipoSomSelecionado++;
			$("#spanTipoSom").html(tipoSomSelecionado);
		}
		else {			
			$("#btnAtivarSom").removeClass("som-ativado");
			$("#btnAtivarSom").addClass("som-desativado");
			$("#btnAtivarSom").attr("title", "Som desativado");
			$("#spanTipoSom").hide();
		}
    }
}

function marcarNumeroSorteado(numero, numeroSorteado) {
	$(".ultimo-numero-sorteado").addClass("numero-sorteado");
	$(".ultimo-numero-sorteado").removeClass("ultimo-numero-sorteado");
	numero.addClass("ultimo-numero-sorteado");
	$(".ultima-letra-sorteada").removeClass("ultima-letra-sorteada");
	let letra = numero.parents("[id^='linha']").find("[id^='letra']");
	letra.addClass("ultima-letra-sorteada");
	$("#divNumeroSorteado").html(numeroSorteado);
	if ($(".numero-sorteado,.ultimo-numero-sorteado").length == 75) {
		$("#btnSortear").attr("disabled", "disabled");
	}
	$('.personagem').removeClass("danca");
}