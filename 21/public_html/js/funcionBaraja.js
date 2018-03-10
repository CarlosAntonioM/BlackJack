/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baraja = new Array();
var puntuajeJugador = 0;
var puntuajeDealer = 0;
var temporalDealer = 0;


function inicio() {
    //alert("Entro");
    iniciarBaraja();
    inicializarJuego();
}
function iniciarBaraja() {
    //Inicia la baraja
    //alert("Entro a creacion");
    for (var i = 1; i < 53; i++) {
        baraja.push(i);
    }
    //Revuelve
    for (var i = 0; i < 100; i++)
    {
        var posicion1 = Math.floor((Math.random() * baraja.length));
        var posicion2 = Math.floor((Math.random() * baraja.length));
        var temp = baraja[posicion1];
        baraja[posicion1] = baraja[posicion2];
        baraja[posicion2] = temp;
    }

}
//Dar dos cartas a ambos
function inicializarJuego() {
    //alert("Entro a inizializar");

    for (var i = 0; i < 4; i++) {
        if (i < 2) {
            agregarCarta(0);
        } else {
            agregarCarta(1);
        }

    }
    if (puntajeJugador == 21) {
        alert("Gano Jugador");
    } else if (puntajeDealer == 21) {
        alert("Gano Dealer");
        document.getElementById("temporal").src = "img/" + temporalDealer + ".GIF";

    }
    //alert("Jugador:  "+puntuajeJugador+"  Dealer:  "+ puntuajeDealer);

}
function agregarCarta(tipo) {
    var lista = document.getElementById("jugador");
    var lista2 = document.getElementById("Dealer");
    var carta = document.createElement("DIV");
    var imag = document.createElement("IMG");
    var cartaVal = baraja.pop();
    if (tipo == 0) {
        var auxi = valor(cartaVal);
        puntuajeJugador = puntuajeJugador + auxi;
        if (cartaVal == 1) {
            imag.src = "img/" + cartaVal + ".gif";
        } else {
            imag.src = "img/" + cartaVal + ".GIF";
        }
        lista.appendChild(imag);
    } else {
        puntuajeDealer = puntuajeDealer + valor(cartaVal);
        if (temporalDealer == 0) {
            imag.src = "img/OCULTA.GIF";
            temporalDealer = cartaVal;
            imag.id = "temporal";
            lista2.appendChild(imag);
        } else {
            if (cartaVal == 1) {
                imag.src = "img/" + cartaVal + ".gif";
            } else {
                imag.src = "img/" + cartaVal + ".GIF";
            }
            lista2.appendChild(imag);
        }

    }

}

function valor(valor) {
    //alert("Entro a valor"+ valor);
    var real = 0;
    if (valor <= 13) {
        real = valor;
    } else if (valor > 13 && valor <= 26) {
        real = valor - 13;
    } else if (valor > 26 && valor <= 39) {
        real = valor - 26;
    } else if (valor > 39) {
        real = valor - 39;
    }
    if (real > 9) {
        real = 10;
    }
    return real;
}

function pedir() {
    agregarCarta(0);
    alert("Puntaje del usuario:" + puntuajeJugador);
    alert("Puntaje del dealer" + puntuajeDealer);
    if (puntuajeJugador > 21) {
        if (temporalDealer == 1) {
            document.getElementById("temporal").src = "img/" + temporalDealer + ".gif";
        } else {
            document.getElementById("temporal").src = "img/" + temporalDealer + ".GIF";
        }
        alert("Gano Dealer");

    }
}

function reiniciar() {
    document.location.href = document.location.href;
}

