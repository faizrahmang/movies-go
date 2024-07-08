function check() {
    var id = document.getElementById("UserId");
    var pass = document.getElementById("password").value;
    if (pass.length < 8) {
        document.getElementById("emailp").innerText =
            "Password should contain atleast 8 elements";
    }
}

function searchMovie() {
    var title = document.getElementById("movieName").value;
    // Replace with the movie title you want to search for
    //   const url = `http://www.omdbapi.com/?i=tt3896198&apikey=e32b8540&t=${title}`;
    //   const options = {
    //       method: 'GET',
    //       headers: {
    //           'x-rapidapi-key': '1f91ad5ca6msh7ffe266d726c5e2p1e5920jsnf47716050eae',
    //           'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
    //       }
    //   };

    //   try {
    //       const response = fetch(url);
    //       console.log(response);
    //   } catch (error) {
    //       console.error(error);
    //   }
    const apiKey = "e32b8540"; // Replace with your OMDb API key
    // Replace with the movie title you want to search for
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(
        title
    )}&apikey=${apiKey}`;

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error('Error:', error));
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                const movieCard = document.getElementById("movie-card");
                const movieHTML = `
                        <img src="${data.Poster}" alt="${data.Title}">
                        <div class="card-content">
                            <h2 class="card-title">${data.Title}</h2>
                            <p class="card-date">Released: ${data.Released}</p>
                            <p class="card-cast">Cast: ${data.Actors}</p>
                        </div>
                    `;
                movieCard.innerHTML = movieHTML;

                const movieDetailsCard = document.getElementById('movie-details-card');
                    // const movieDetailsHTML = `
                    //     <div class="card-content">
                    //         <h2 class="card-title">${data.Title}</h2>
                    //         <p class="card-date">Release Date: ${data.Released}</p>
                    //         <p class="card-director">Director: ${data.Director}</p>
                    //         <p class="card-language">Language: ${data.Language}</p>
                    //         <p class="card-imdb">IMDB Rating: ${data.imdbRating}</p>
                    //         <p class="card-genre">Genre: ${data.Genre}</p>
                    //         <h3 class="card-cast">Cast:</h3>
                    //         <ul class="card-list">
                    //             ${data.Actors.split(', ').map(actor => `<li>${actor}</li>`).join('')}
                    //         </ul>
                    //     </div>
                    // `;
                    
                    movieDetailsCard.innerHTML = 
                   `<table class="movie-details">
    <tr>
        <th>Title</th>
        <td>${data.Title}</td>
    </tr>
    <tr>
        <th>Release Date</th>
        <td>${data.Released}</td>
    </tr>
    <tr>
        <th>Director</th>
        <td>${data.Director}</td>
    </tr>
    <tr>
        <th>Language</th>
        <td>${data.Language}</td>
    </tr>
    <tr>
        <th>IMDB Rating</th>
        <td>${data.imdbRating}</td>
    </tr>
    <tr>
        <th>Genre</th>
        <td>${data.Genre}</td>
    </tr>
    <tr>
        <th>Cast</th>
        <td>
            <ul>
                ${data.Actors.split(', ').map(actor => `<li>${actor}</li>`).join('')}
            </ul>
        </td>
    </tr>
</table>`

            } else {
                document.write("Movie not found");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.write("An error occurred while fetching the movie data.");
        });
}
