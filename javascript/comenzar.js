var bandera=0;
var bandera2=1;
var puestos=[];
function inicio(){
    var iniciar;
    var temporizador;
    if(bandera2){
    iniciar=setInterval(timer,950);
    temporizador=setInterval(tempo,1000);
    bandera2=0;
    }
    function timer(){
        var random_x=Math.floor(Math.random()*560);
        var random_y=Math.floor(Math.random()*460);
        var alien=document.getElementById('invasor');
        
        alien.style.marginLeft=random_x+'px';
        alien.style.marginTop=random_y+'px';
        
        bandera=1;
    }
    function tempo(){
        var name;
        var invertido=[];
        var seg=document.getElementById('seg').innerHTML;
        seg=parseInt(seg);
        seg--;
        if(seg>=0){
            document.getElementById('seg').innerHTML=seg;
        }
        else{
            clearInterval(temporizador);
        }
        switch(seg){
            case 45:
                document.getElementById('nivel').innerHTML='NIVEL INTERMEDIO';
                clearInterval(iniciar);
                iniciar=setInterval(timer,800);
                break;

            case 30:
                document.getElementById('nivel').innerHTML='NIVEL DIOS';
                clearInterval(iniciar);
                iniciar=setInterval(timer,600);
                break;

            case 15:
                clearInterval(iniciar);
                var i=document.getElementById('decoracion');
                i.style.backgroundImage='url("imagenes/fuego.gif")';
                document.getElementById('nivel').innerHTML='NIVEL OCTAVIO';
                iniciar=setInterval(timer,250);
                break;

            case 0:
                clearInterval(iniciar);
                bandera=0;
                var array;

                name=prompt('¡Misión cumplida!\nVolvio la paz y los humanos tomamos el control.\nEn gratitud a su servicio por favor ingrese su nombre acontinuación.')
                if(!localStorage.getItem('puntajes')){
                    array=[name,document.getElementById('puntaje').innerHTML];
                    puestos.push(array);
                    localStorage.setItem('puntajes',JSON.stringify(puestos));
                }
                else{
                    puestos=JSON.parse(localStorage.getItem('puntajes'));
                    array=[name,document.getElementById('puntaje').innerHTML];
                    puestos.push(array);
                    localStorage.setItem('puntajes',JSON.stringify(puestos));
                }
                //modificar a partir de aca.. enn el load del rank poner script que carge el arrya lo invierta y ponga en la lista y ya ta
                invertido=puestos.reverse()
                // for(var i=0; i<10 ;i++){
                //     document.getElementById('nombres').innerHTML=invertido[i][0];
                // }

                location.href='rank.html';
                document.getElementById('nombres').innerHTML='nivel octavio';
                document.getElementById('nombres').innerHTML='nivel octavio';

                alert(invertido);
                break;
                            
        }
    }
}
    
function score(){
    if(bandera){
        var random=Math.floor(Math.random()*4);
        var puntaje=document.getElementById('puntaje').innerHTML;
        puntaje=parseInt(puntaje);
        puntaje+=50;
        document.getElementById('puntaje').innerHTML=puntaje;
        document.getElementById('invasor').src='imagenes/invasor'+random+'.png';
    }
}
function mostrar_rank(){
    var invertido=JSON.parse(localStorage.getItem('puntajes'));
    invertido= invertido.sort(function(a,b){
        if (a[1] < b[1]) {
            return 1;
          }
          if (a[1] > b[1]) {
            return -1;
          }
          return 0;
    });
    if(Object.keys(invertido).length>10){
        for(var i=0;i<10;i++){
        document.getElementById('nombres').innerHTML+=invertido[i][0]+'<br><br>';
        document.getElementById('tot_puntaje').innerHTML+=invertido[i][1]+'<br><br>';
        }
    }
    else{
        for(var i=0;i<Object.keys(invertido).length;i++){
        document.getElementById('nombres').innerHTML+=invertido[i][0]+'<br><br>';
        document.getElementById('tot_puntaje').innerHTML+=invertido[i][1]+'<br><br>';
        }
    }    
    // alert(Object.keys(invertido).length);
}
function borrar(){
    localStorage.removeItem('puntajes');
    location.href='rank.html'
}