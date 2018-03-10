/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

        var baraja = new Array();
        var puntuajeJugador = 0;
        var temporalDealer=0;


        function inicio(){
            alert("Entro");
            iniciarBaraja();
            inicializarJuego();
        }
        function iniciarBaraja(){
            //Inicia la baraja
            for(var i =0; i<52; i++){
                baraja.push(i);
            }
            //Revuelve
            for (var i = 0; i < 100; i++)
            {
                var posicion1 = Math.floor((Math.random() * baraja.length));
                var posicion2 = Math.floor((Math.random() * baraja.length));
                var temp = baraja[posicion1];
                baraja[posicion1] = baraja[posicion2];
                baraja[posicion1] = temp;
            }
            
        }
        //Dar dos cartas a ambos
        function inicializarJuego(){
             var lista = document.getElementById("jugador");
             var lista2 = document.getElementById("Dealer");
             var carta = document.createElement("DIV");
             var imag = document.createElement("IMG");
             var carta = baraja.pop();
             carta = valor(carta);
             imag.src="img/"+carta.toString()+".GIF";
             lista.appendChild(carta);
             carta = baraja.pop();
             carta = valor(carta);
             imag.src="img/"+carta.toString()+".GIF";
             lista.appendChild(carta);
             //Para Dealer
             carta = baraja.pop();
             carta = valor(carta);
             imag.src="img/OCULTA.GIF";
             lista2.appendChild(carta);
             carta = baraja.pop();
             carta = valor(carta);
             imag.src="img/"+carta.toString()+".GIF";
             lista2.appendChild(carta);
             

        }
        function(valor){
            var real = 0;
            if(valor <14){               
                return valor;
            }else if(valor>13 && valor <= 26){
                real = valor - 13;
                return real;
            }else if(valor>26 && valor <= 39){
                real = valor - 26;
                return real;
            }else if(valor >39){
                real = valor - 39;
                return real;
            }
        }
        

        function createDeck()
        {
            deck = new Array();
            for (var i = 0 ; i < values.length; i++)
            {
                for(var x = 0; x < suits.length; x++)
                {
                    var weight = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        weight = 10;
                    if (values[i] == "A")
                        weight = 11;
                    var card = { Value: values[i], Suit: suits[x], Weight: weight };
                    deck.push(card);
                }
            }
        }

        function createPlayers(num)
        {
            players = new Array();
            for(var i = 1; i <= num; i++)
            {
                var hand = new Array();
                var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
                players.push(player);
            }
        }

        function createPlayersUI()
        {
            document.getElementById('players').innerHTML = '';
            for(var i = 0; i < players.length; i++)
            {
                var div_player = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'points';
                div_points.id = 'points_' + i;
                div_player.id = 'player_' + i;
                div_player.className = 'player';
                div_hand.id = 'hand_' + i;

                div_playerid.innerHTML = players[i].ID;
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('players').appendChild(div_player);
            }
        }

        function shuffle()
        {
            // for 1000 turns
            // switch the values of two random cards
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }

        function start()
        {
            // deal 2 cards to every player object
            currentPlayer = 0;
            createDeck();
            shuffle();
            createPlayers(4);
            createPlayersUI();
            dealHands();
            document.getElementById('player_' + currentPlayer).classList.add('active');
        }

        function dealHands()
        {
            // alternate handing cards to each player
            // 2 cards each
            for(var i = 0; i < 2; i++)
            {
                for (var x = 0; x < players.length; x++)
                {
                    var card = deck.pop();
                    players[x].Hand.push(card);
                    renderCard(card, x);
                    updatePoints();
                }
            }

            updateDeck();
        }

        function renderCard(card, player)
        {
            var hand = document.getElementById('hand_' + player);
            hand.appendChild(getCardUI(card));
        }

        function getCardUI(card)
        {
            var el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = card.Suit + ' ' + card.Value;
            return el;
        }

        // returns the number of points that a player has in hand
        function getPoints(player)
        {
            var points = 0;
            for(var i = 0; i < players[player].Hand.length; i++)
            {
                points += players[player].Hand[i].Weight;
            }
            players[player].Points = points;
            return points;
        }

        function updatePoints()
        {
            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

        function hitMe()
        {
            // pop a card from the deck to the current player
            // check if current player new points are over 21
            var card = deck.pop();
            players[currentPlayer].Hand.push(card);
            renderCard(card, currentPlayer);
            updatePoints();
            updateDeck();
            check();
        }

        function stay()
        {
            // move on to next player, if any
            if (currentPlayer != players.length-1) {
                document.getElementById('player_' + currentPlayer).classList.remove('active');
                currentPlayer += 1;
                document.getElementById('player_' + currentPlayer).classList.add('active');
            }

            else {
                end();
            }
        }

        function end()
        {
            var winner = -1;
            var score = 0;

            for(var i = 0; i < players.length; i++)
            {
                if (players[i].Points > score && players[i].Points < 22)
                {
                    winner = i;
                }

                score = players[i].Points;
            }

            document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
        }

        function check()
        {
            if (players[currentPlayer].Points > 21)
            {
                document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
            }
        }

        function updateDeck()
        {
            document.getElementById('deckcount').innerHTML = deck.length;
        }

        window.addEventListener('load', function(){
            createDeck();
            shuffle();
            createPlayers(1);
        });