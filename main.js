document.addEventListener('DOMContentLoaded', () => {
    const botonSello = document.getElementById('boton-sello');
    const contenedorSello = document.querySelector('.contenedor-sello');
    const puertaIzq = document.querySelector('.puerta-izq');
    const puertaDer = document.querySelector('.puerta-der');
    const pantallaEntrada = document.getElementById('pantalla-entrada');
    const audioSello = document.getElementById('audio-sello');

    if (botonSello) {
        botonSello.addEventListener('click', () => {
            if (audioSello) {
                audioSello.play().catch(error => console.log(error));
            }

            contenedorSello.classList.add('oculto');
            
            setTimeout(() => {
                puertaIzq.classList.add('abierta');
                puertaDer.classList.add('abierta');
            }, 800);

            setTimeout(() => {
                pantallaEntrada.style.display = 'none';
            }, 2500); 
        });
    }

    const audioFondo = document.getElementById('audio-fondo');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const iconoPlay = document.getElementById('icono-play');
    const iconoPause = document.getElementById('icono-pause');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    const playlist = [
        'musica/cancion1.mp3',
        'musica/cancion2.mp3',
        'musica/cancion3.mp3',
        'musica/cancion4.mp3',
        'musica/cancion5.mp3'
    ];
    
    let indiceCancionActual = 0;
    let reproduciendo = false;

    function cargarCancion(indice) {
        audioFondo.src = playlist[indice];
        if (reproduciendo) {
            audioFondo.play();
        }
    }

    if (btnPlayPause && audioFondo) {
        btnPlayPause.addEventListener('click', () => {
            if (reproduciendo) {
                audioFondo.pause();
                iconoPause.style.display = 'none';
                iconoPlay.style.display = 'inline';
            } else {
                audioFondo.play();
                iconoPlay.style.display = 'none';
                iconoPause.style.display = 'inline';
            }
            reproduciendo = !reproduciendo;
        });

        btnPrev.addEventListener('click', () => {
            indiceCancionActual--;
            if (indiceCancionActual < 0) {
                indiceCancionActual = playlist.length - 1; 
            }
            cargarCancion(indiceCancionActual);
        });

        btnNext.addEventListener('click', () => {
            indiceCancionActual++;
            if (indiceCancionActual >= playlist.length) {
                indiceCancionActual = 0; 
            }
            cargarCancion(indiceCancionActual);
        });

        audioFondo.addEventListener('ended', () => {
            indiceCancionActual++;
            if (indiceCancionActual >= playlist.length) {
                indiceCancionActual = 0;
            }
            cargarCancion(indiceCancionActual);
            audioFondo.play();
        });
    }

    const fechaMeta = new Date("Aug 15, 2026 16:00:00").getTime();

    const actualizarContador = setInterval(() => {
        const ahora = new Date().getTime();
        const distancia = fechaMeta - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");

        if (elDias && elHoras && elMinutos) {
            elDias.innerHTML = dias < 10 ? "0" + dias : dias;
            elHoras.innerHTML = horas < 10 ? "0" + horas : horas;
            elMinutos.innerHTML = minutos < 10 ? "0" + minutos : minutos;
        }

        if (distancia < 0) {
            clearInterval(actualizarContador);
            if (elDias) elDias.innerHTML = "00";
            if (elHoras) elHoras.innerHTML = "00";
            if (elMinutos) elMinutos.innerHTML = "00";
        }
    }, 1000);
});