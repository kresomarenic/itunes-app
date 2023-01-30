'use strict'

const inputSearch = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');


const handleSearch = (event) => {
    searchResult.innerHTML = 'Searching for songs ...';
    setTimeout(() => searchSongs(), 2000);
  };

const searchSongs = () => {
    const searchValue = inputSearch.value.trim();
    if(searchValue.length >= 3) {
        const apiUrl = `https://itunes.apple.com/search?term=${searchValue}&entity=song`;

        const request = new XMLHttpRequest();
        request.open('GET', apiUrl, true);

        request.onload = (e) => {
            searchResult.innerHTML = '';
            const response = JSON.parse(request.response);
            console.log(response);

            if(response.results.length > 0) {
                response.results.forEach(result => {
                    const artistName = result.artistName;
                    const trackName = result.trackName;

                    const newSong = document.createElement('li');
                    newSong.innerHTML = `<b>Artist:</b> ${artistName} - <b>Song:</b> ${trackName}`;

                    searchResult.append(newSong);

                });
            } else {
                searchResult.innerHTML = 'No songs found';
            }
        }

        request.send();
        
    }
}


inputSearch.addEventListener('input', handleSearch);