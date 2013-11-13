/// <reference path="jquery-1.7.1.js" />
/// <reference path="jquery-1.9.0.min.js" />

/*====================== Desenvolvido por Bruno Sato ===========================*/

$(document).ready(function () {
	    resize();
	    window.onresize = function () {
		    resize();
	    }
});

function resize() {
	var h = $(window).height();
	var w = $(window).width();

	//altura
	$('#divFirst').css('height', h);
	$('#divSecond').css('height', h);
	$('#divThird').css('height', h - 50);
	$('#divFourth').css('height', h);
	$('#divFifth').css('height', h);
	$('#divSix').css('height', h-200);

	//largura
	$('#divFirst').css('width', w);
	$('#divSecond').css('width', w);
	$('#divThird').css('width', w);
	$('#divFourth').css('width', w);
	$('#divFifth').css('width', w);
	$('#divSix').css('width', w);

}

$(window).bind('scroll', function () {
	if ($(window).scrollTop() > 0) {
		$('.divMenu').addClass('fixed');
	}
	else {
		$('.divMenu').removeClass('fixed');
	}

	var posScroll = getScrollTop();
	var area2 = getPosicaoElemento('divSecond').top - 80;
	var area3 = getPosicaoElemento('divThird').top - 500;
	var area4 = getPosicaoElemento('divFourth').top - 250;
	var area5 = getPosicaoElemento('divFifth').top - 250;
	var area6 = getPosicaoElemento('divSix').top - 250;
	switch (true) {
		case (posScroll > area2 && posScroll < area3):
			$('a').removeClass("up");
			$('ul li')[1].children[0].className = "up";
			break;

		case (posScroll > area3 && posScroll < area4):
			$('a').removeClass("up");
			$('ul li')[2].children[0].className = "up";
			break;

		case (posScroll > area4 && posScroll < area5):
			$('a').removeClass("up");
			$('ul li')[3].children[0].className = "up";
			break;

		case (posScroll > area5 && posScroll < area6):
			$('a').removeClass("up");
			$('ul li')[4].children[0].className = "up";
			break;

		case (posScroll > area6):
			$('a').removeClass("up");
			$('ul li')[5].children[0].className = "up";
			break;

		default:
			$('a').removeClass("up");
			$('ul li')[0].children[0].className = "up";
			break;
	}
});

$('.divMenu ul li a').on('click', function () {
	var go = $(this).attr('href');
	if (go == '#home') {
		var getPosition = $('#divFirst').offset().top;
		$('html,body').animate({ scrollTop: getPosition }, 'slow');
		return false;
	}
	else if (go == '#usinagem') {
		var getPosition = $('#divSecond').offset().top;
		$('html,body').animate({ scrollTop: getPosition }, 'slow');
		return false;
	}
	else if (go == '#servico') {
		var getPosition = $('#divThird').offset().top;
		$('html,body').animate({ scrollTop: getPosition - 50 }, 'slow');
		return false;
	}
	else if (go == '#clientes') {
		var getPosition = $('#divFourth').offset().top;
		$('html,body').animate({ scrollTop: getPosition }, 'slow');
		return false;
	}
	else if (go == '#perguntas') {
		var getPosition = $('#divFifth').offset().top;
		$('html,body').animate({ scrollTop: getPosition }, 'slow');
		return false;
	}
	else if (go == '#contato') {
		var getPosition = $('#divSix').offset().top;
		$('html,body').animate({ scrollTop: getPosition }, 'slow');
		return false;
	}
});

function getScrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}

function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function getPosicaoElemento(elemID) {
	var offsetTrail = document.getElementById(elemID);
	var offsetLeft = 0;
	var offsetTop = 0;
	while (offsetTrail) {
		offsetLeft += offsetTrail.offsetLeft;
		offsetTop += offsetTrail.offsetTop;
		offsetTrail = offsetTrail.offsetParent;
	}
	if (navigator.userAgent.indexOf("Mac") != -1 && typeof document.body.leftMargin != "undefined") {
		offsetLeft += document.body.leftMargin;
		offsetTop += document.body.topMargin;
	}

	return { left: offsetLeft, top: offsetTop };
}

function irTopo(pos, speed, callback) {
	if (!speed) speed = 'slow';

	if ($.isNumeric(pos)) {
		if (!pos) pos = 0;
	} else {
		var posElem = getPosicaoElemento(pos).top;
		pos = posElem;
	}
	$('html, body').animate({ scrollTop: pos }, speed, function () {
		if (typeof callback == 'function')
			callback.call(this);
	});
}

$("#enviar").click(function () {
	var nome = $("#Nome")[0].value;
	var email = $("#Email")[0].value;
	var ddd = $("#strDDD")[0].value;
	var telefone = $("#Telefone")[0].value;
	var telefoneCompleto = "(" + ddd + ")" + " " + telefone;
	var text = $("#Texto")[0].value;

	var passo = verificacao(nome, email, ddd, telefone, text);

	if (passo == false) {
		clear();

		bootbox.dialog({
			message: "Email enviado com sucesso!",
			title: "Alerta",
			buttons: {
				success: {
					label: "Enviado com Sucesso",
					className: "btn-success",
					callback: function () {
					}
				},
			}
		});

		$.ajax({
			url: '/Index/Email',
			type: 'POST',
			datatype: "json",
			traditional: true,
			data: {
				nomeData: JSON.stringify(nome),
				emailData: JSON.stringify(email),
				telefoneData: JSON.stringify(telefoneCompleto),
				textData: JSON.stringify(text),
			},
			success: function (event, request, settings) {
				clear();
			},
		});
	}
});

function clear() {
	$("#Nome")[0].value = "";
	$("#Email")[0].value = "";
	$("#strDDD")[0].value = "";
	$("#Telefone")[0].value = "";
	$("#Texto")[0].value = "";
}

function verificacao(nome, email, ddd, telefone, text) {
	switch (true) {
		case (nome == ""):
			bootbox.alert("O campo NOME não esta prenchido", function () {});
			break;
			return true;
		case (email == ""):
			bootbox.alert("O campo EMAIL não esta prenchido", function () {});
			break;
			return true;
		case (ddd == ""):
			bootbox.alert("O campo DDD não esta prenchido", function () {});
			break;
			return true;
		case (telefone == ""):
			bootbox.alert("O campo TELEFONE não esta prenchido", function () { });
			break;
			return true;
		case (text == ""):
			bootbox.alert("O campo MENSAGEM não esta prenchido", function () { });
			break;
			return true;
		default:
			return false;
	}
}

/*====================== =========================== ===========================*/