window.onload = function () {

    var destapada=false;
    var minasP = 0;

    var bot = document.getElementById('select');
    var val = bot.addEventListener("click", Sacavalores, false); 

    function Sacavalores() {
        document.getElementById("select").style.backgroundImage = "url('css/facesmile.gif')";

        var elem = document.getElementsByName('opcion');
        for (i = 0; i < elem.length; i++) {
            if (elem[i].checked) {
                alto = elem[i].getAttribute('alto');
                ancho = elem[i].getAttribute('ancho');
                minas = elem[i].getAttribute('minas'); 

            } 
        } 
        pintaTabla(alto, ancho, minas);
    }

    function pintaTabla(alto, ancho, minas) {

        var contador=document.getElementById('contador');
       contador.innerHTML=parseInt(minas); 

        var valor;
        var body = document.getElementById("mapa");

        if (document.getElementById("tabla")) {
            var fila = document.getElementById('tabla');
            fila.parentNode.removeChild(fila);
        }

        var table = document.createElement("table");
        table.setAttribute('id', 'tabla'); 

        var tblBody = document.createElement("tbody");

        for (var i = 0; i < alto; i++) {
            var hilera = document.createElement("tr");
            for (var j = 0; j < ancho; j++) {

                var celda = document.createElement("td");

                var img = document.createElement('img');
                celda.setAttribute('id', ancho * i + j);
                
                img.setAttribute('src', 'css/blank.gif'); 

                celda.appendChild(img); 

                hilera.appendChild(celda);
            }

            tblBody.appendChild(hilera);
            var valor = parseInt(ancho * i + j);

        }
        var cara = document.getElementById('select');

        table.appendChild(tblBody);

        body.appendChild(table);
        
      
        seleccionar(alto, ancho, minas);
    } 

    function seleccionar(alto, ancho, minas) {
        var posiciones = alto * ancho;
        console.log(posiciones);
        var mov = minas;
         var jugada=0;
        var agua; 

        for (var i = 0; i < alto; i++) {
            for (var j = 0; j < ancho; j++) { 

                valor = document.getElementById(i * ancho + j);
                valor.addEventListener('contextmenu', function (e) {

                     if (e.which == 3 || e.which == 2) {
                      e.preventDefault();
                    } 

                    var hijo = document.getElementById(this.id).firstChild;
                    if (hijo.getAttribute('src') == 'css/blank.gif') { 
                        if(mov>0){
                          hijo.setAttribute('src', 'css/bombflagged.gif');
                          mov--;
                        document.getElementById('contador').innerHTML=mov;
                        }
                    }
                    else if (hijo.getAttribute('src') == "css/bombflagged.gif") {
                        hijo.setAttribute('src', 'css/bombquestion.gif');
                        mov++;
                        document.getElementById('contador').innerHTML=mov;
                    }
                    else if (hijo.getAttribute('src') == "css/bombquestion.gif") {
                        hijo.setAttribute('src', 'css/blank.gif');
                    }

                }, false); 

                valor.addEventListener('click', function () { 

                    if (jugada === 0) {
                        minasP = mapear(alto, ancho, minas, parseInt(this.id));
                        destapada=false;
                    } 
					
                 jugada++;
                  
                    sacarCasilla(alto, ancho, parseInt(this.id), minasP);
                    
                  if(jugada== minasP.length * minasP[0].length-minas) alert('HAS GANADO, presiona carita amarilla para volver a jugar');

                 
                }, false);
            }
          
        }
 
    }
     
    function sacarCasilla(alto, ancho, id, minasP) { 
       
        var hijo = document.getElementById(id).firstChild;
        for (var k = 0; k < alto; k++) {
            for (var l = 0; l < ancho; l++) {
                if ("[o]" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l) {
                    hijo.setAttribute('src', 'css/bombdeath.gif');
                    perder(minasP);
                    destapada=true;
                } else if ("0" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open0.gif');
                    destaparAgua(id, minasP);
                } else if ("1" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada  ) {
                    hijo.setAttribute('src', 'css/open1.gif');
                } else if ("2" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open2.gif');
                } else if ("3" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open3.gif');
                } else if ("4" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open4.gif');
                } else if ("5" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open5.gif');
                } else if ("6" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open6.gif');
                } else if ("7" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l && !destapada) {
                    hijo.setAttribute('src', 'css/open7.gif');
                } else if ("8" == minasP[k][l] && hijo.getAttribute('src') == 'css/blank.gif' && id == k * ancho + l ) {
                    hijo.setAttribute('src', 'css/open8.gif');
                }
            }
        } 

    }
    function ganar() {

    } 
    function perder(minasP) {
        console.log('perdi');
        console.log(minasP);

        for (var i = 0; i < minasP.length; i++) {
            for (var j = 0; j < minasP[i].length; j++) {
                var hijo = document.getElementById(minasP[i].length * i + j).firstChild;
                if ("[o]" == minasP[i][j] && hijo.getAttribute('src') == 'css/blank.gif') {
                    hijo.setAttribute('src', 'css/bombrevealed.gif');
                } 

                if("[o]" == minasP[i][j] && hijo.getAttribute('src') == 'css/bombflagged.gif'){
                    hijo.setAttribute('src', 'css/bombmisflagged.gif');

                }
            }
        }
        document.getElementById("select").style.backgroundImage = "url('css/facedead.gif')";
        alert('HAS PERDIDO, DESTAPASTE UNA MINA, presiona en carita amarilla para volver a jugar'); 

    }
    function mapear(alto, ancho, mina, pos1) {
        console.log(alto);
        console.log(ancho);
        console.log(mina);
        console.log(pos1);

        do {
            var minas = new Array(mina);
            var i = 0;
            var num = 0;

            for (var i = 0; i < mina; i++) {

                num = (Math.floor(Math.random() * (alto * ancho)) + 1) - 1;

                while (num === pos1) {
                    console.log(num);
                    num = (Math.floor(Math.random() * (alto * ancho)) + 1) - 1; 

                }
                minas[i] = num;
            }

            console.log(minas);

            var minasr = compruRepes(minas, alto, ancho, pos1);
            agua = colocaAgua(alto, ancho, minasr);
            tab = numerar(agua, minas, alto, ancho, pos1);

            for (var j = 0; j < tab.length; j++) {
                for (var k = 0; k < tab[j].length; k++) {
                    if (j * tab[j].length + k == pos1) {
                        posicion = tab[j][k];
                        console.log(tab[j][k]);
                    } 
                }
            } 
        } while (posicion != 0); 

        console.log('pasa'); 

        console.log(tab);
        return tab; 
    }

    function compruRepes(valores, alto, ancho, pos1) {

        var num;
        var reps = 0;
        while (reps < valores.length) {
            reps = 0;
            for (var i = 0; i < valores.length; i++) {
                for (var j = i + 1; j < valores.length; j++) {

                    if (valores[i] === valores[j] || valores[j] === pos1) {
                        num = (Math.floor(Math.random() * (alto * ancho)) + 1) - 1;
                        valores[i] = num;

                    } else {
                        reps++;
                    }
                }
            }
            console.log(valores);
        }
        return valores;
    }

    function colocaAgua(alto, ancho, minas) {
        console.log(minas);
        var agua = new Array(alto);

        for (var i = 0; i < alto; i++) {
            agua[i] = new Array(ancho);
            for (var j = 0; j < ancho; j++) {
                agua[i][j] = 0;
                var pos = alto * i + j + 1;

                for (var m = 0; m < minas.length; m++) {

                    if (i * ancho + j === minas[m]) {
                        agua[i][j] = "[o]"; 
                    }
                } 
            } 
        }
        console.log(agua);
        return agua;
    }

    function numerar(tabla, minas, alto, ancho, pos1) {
        console.log(pos1);
        var posicion; var cont=0;
        for (var i = 0; i < tabla.length; i++) {
            for (var j = 0; j < tabla[i].length; j++) {
               cont=0;
                
                if (tabla[i][j] == 0) {
               
                    if (i > 0) {
                        if (tabla[i - 1][j] == '[o]') {
                            cont++; 
                        }
                        if (j > 0) {
                            if (tabla[i - 1][j - 1] == '[o]')
                                cont++;
                        }
                        if (j < tabla[i].length - 1) {
                            if (tabla[i - 1][j + 1] == '[o]')
                                cont++;
                        } 
                    }
                    if (i < tabla.length - 1) {
                        if (tabla[i + 1][j] == '[o]') {
                            cont++;
                        }
                        if (j > 0) {
                            if (tabla[i + 1][j - 1] == '[o]')
                                cont++;
                        }
                        if (j < tabla[i].length - 1) {
                            if (tabla[i + 1][j + 1] == '[o]')
                                cont++;
                        }
                    }
                    if (j > 0) {
                        if (tabla[i][j - 1] == '[o]')
                            cont++;
                    }
                    if (j < tabla[i].length - 1) {
                        if (tabla[i][j + 1] == '[o]')
                            cont++;
                    }
                }

                if (cont > 0){
                    tabla[i][j] = cont;
                    }
                cont = 0; 
            }
        } 
        return tabla;
    } 

    function destaparAgua(seleccionada, tabla) { 

    for (var i = 0; i < tabla.length; i++) {
            for (var j = 0; j < tabla[i].length; j++) {
               
                  var cont = 0; var pos=tabla[i].length*i+j;
                if ( pos==seleccionada) {

                    if (i > 0) {
                        if (tabla[i - 1][j] !='[o]'  ) {
                            document.getElementById(pos-tabla[i].length).firstChild.setAttribute('src','css/open'+tabla[i - 1][j]+'.gif');
                            cont++; 

                        }
                        if (j > 0) {
                            if (tabla[i - 1][j - 1] !='[o]'  ){
                                 document.getElementById((pos-tabla[i].length)-1).firstChild.setAttribute('src','css/open'+tabla[i - 1][j-1]+'.gif');
                                cont++; 
                            }
                        }
                        if (j < tabla[i].length - 1) {
                            if (tabla[i - 1][j + 1] !='[o]'  ){
                                 document.getElementById(pos-tabla[i].length+1).firstChild.setAttribute('src','css/open'+tabla[i - 1][j+1]+'.gif');
                                cont++; 
                            }
                        }

                    }
                    if (i < tabla.length - 1) {
                        if (tabla[i + 1][j] !='[o]'  ) {
                             document.getElementById(pos+tabla[i].length).firstChild.setAttribute('src','css/open'+tabla[i + 1][j]+'.gif');
                            cont++; 
                        }
                        if (j > 0) {
                            if (tabla[i + 1][j - 1] !='[o]'  ){
                                 document.getElementById(pos+tabla[i].length-1).firstChild.setAttribute('src','css/open'+tabla[i + 1][j-1]+'.gif');
                                cont++; 
                            }
                        }
                        if (j < tabla[i].length - 1) {
                            if (tabla[i + 1][j + 1] !='[o]'  ){
                                 document.getElementById(pos+tabla[i].length+1).firstChild.setAttribute('src','css/open'+tabla[i + 1][j+1]+'.gif');
                                cont++; 
                            }
                        }
                    }
                    if (j > 0) {
                        if (tabla[i][j - 1] !='[o]'  ){
                             document.getElementById(pos-1).firstChild.setAttribute('src','css/open'+tabla[i][j-1]+'.gif');
                            cont++; 
                        }
                    }
                    if (j < tabla[i].length - 1) {
                        if (tabla[i][j + 1] !='[o]'  ){
                             document.getElementById(pos+1).firstChild.setAttribute('src','css/open'+tabla[i ][j+1]+'.gif');
                            cont++; 
                        }
                    } 
                   
                   //if (tabla[i - 1][j] == 0 ) destaparAgua(pos-tabla[i].length,tabla);
                  // if (tabla[i - 1][j-1] == 0 ) destaparAgua((pos-tabla[i].length)-1,tabla);
                  // if (tabla[i - 1][j+1] == 0 ) destaparAgua(pos-tabla[i].length+1,tabla);
                   if (tabla[i + 1][j] == 0 ) destaparAgua(pos+tabla[i].length,tabla);
                   if (tabla[i +1][j-1] == 0 ) destaparAgua(pos+tabla[i].length-1,tabla);
                   if (tabla[i +1][j+1] == 0 ) destaparAgua(pos+tabla[i].length+1,tabla);
                   if (tabla[i][j-1] == 0 ) destaparAgua(pos-1,tabla);
                   if (tabla[i][j+1] == 0 ) destaparAgua(pos+1,tabla);
                } 
            }
        }
     }
 }

