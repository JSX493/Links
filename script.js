document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const currentArtist = document.getElementById('currentArtist');
    const coverArt = document.getElementById('coverArt');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const playlistUl = document.getElementById('playlist');

    // **IMPORTANTE:** Substitua estas URLs pelas suas próprias músicas e capas!
    // Para testar, você pode usar URLs de músicas gratuitas ou locais.
    // Ex: 'music/minhamusica.mp3' se estiver na mesma pasta ou subpasta.
    // Você pode baixar músicas gratuitas e legalmente utilizáveis de sites como bensound.com ou pixabay.com/music/
    const playlist = [
        {
            title: 'Montagem grave alucianante {slowed}',
            artist: 'DJ JSX',
            src: 'Montagem grave alucianante {slowed}.wav', // Exemplo de URL de música
            cover: 'Gemini_Generated_Image_ri0swrri0swrri0s.png' // Exemplo de URL de capa
        },
        {
            title: 'Montagem DILOS',
            artist: 'DJ JSX,MIG',
            src: 'Montagem-Dilos.wav',
            cover: 'ChatGPT Image 23 de jul. de 2025, 13_36_54.png'
        },
        {
            title: 'Montagem vem igual DNA',
            artist: 'DJ JSX',
            src: 'montagem vem igual dna.wav',
            cover: 'ChatGPT Image 23 de jul. de 2025, 14_40_13.png'
        },
        {
            title: 'Montagem Arabia',
            artist: 'DJ JSX,HG',
            src: 'Montagem Arabia.mp3',
            cover: 'Gemini_Generated_Image_rp2myyrp2myyrp2m.png'
        },
        {
            title: 'Montagem Kick Dançante',
            artist: 'DJ JSX',
            src: 'Montagem Kick Dançante.wav',
            cover: 'Capa Retrô para _Montagem Kick Dançante_.png'
        },
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // --- Funções de Ajuda ---
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function loadSong(songIndex) {
        const song = playlist[songIndex];
        audioPlayer.src = song.src;
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        coverArt.src = song.cover;

        // Atualiza a classe 'active' na playlist
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            if (index === songIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        audioPlayer.load(); // Carrega a música para obter duração etc.
    }

    function playSong() {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
        isPlaying = true;
    }

    function pauseSong() {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        audioPlayer.pause();
        isPlaying = false;
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    // --- Event Listeners ---

    // Botão Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // Botão Próxima
    nextBtn.addEventListener('click', nextSong);

    // Botão Anterior
    prevBtn.addEventListener('click', prevSong);

    // Quando a música termina
    audioPlayer.addEventListener('ended', nextSong);

    // Atualiza a barra de progresso
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    });

    // Quando a música é carregada (para obter a duração)
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audioPlayer.duration);
    });

    // Clicar na barra de progresso para pular na música
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    });

    // Renderiza a playlist na tela
    function renderPlaylist() {
        playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.classList.add('playlist-item');
            li.dataset.index = index; // Para saber qual música foi clicada
            li.innerHTML = `
                <div class="item-info">
                    <span class="item-title">${song.title}</span><br>
                    <span class="item-artist">${song.artist}</span>
                </div>
                <i class="fas fa-play-circle play-icon"></i>
            `;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            });
            playlistUl.appendChild(li);
        });
    }

    // --- Inicialização ---
    loadSong(currentSongIndex); // Carrega a primeira música ao iniciar
    renderPlaylist(); // Renderiza a lista de músicas
});
