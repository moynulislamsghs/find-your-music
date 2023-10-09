const searchSongs = async() => {
    const searchText = document.getElementById('searchField').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);
    } catch (error) {
        displayError("Sorry, something went wrong! Please try again later!!");
    }
}
const displaySongs = songs =>{
    //console.log(songs);
    const songContainer = document.getElementById('songContainer');
    songContainer.innerHTML = '';
    const songLyricsDiv = document.getElementById("songLyrics");
    songLyricsDiv.innerText = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album-"${song.album.title}" by ${song.artist.name}</p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
        //console.log(song);

    });
}

const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyrics(data.error);
    } catch (error) {
        displayError("Sorry, could not find lyrics.");
    }
}

const displayLyrics = lyrics => {
    const songLyricsDiv = document.getElementById("songLyrics");
    songLyricsDiv.innerText = lyrics;
}

const displayError = (error) =>{
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = `
    <h1>${error}</h1>
    `;
}