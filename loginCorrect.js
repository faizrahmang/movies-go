function check() {
  var id = document.getElementById("UserId");
  var pass = document.getElementById("password").value;
  if (pass.length < 8) {
    document.getElementById("emailp").innerText =
      "Password should contain atleast 8 elements";
  }
}
document.getElementById('movieName').innerHTML="";

document.getElementById('movieName').addEventListener('click', function() {
  document.getElementById('moviess').classList.remove("moviess");
  document.getElementById('moviess').classList.add('afterClick');
});
document.getElementById('movieName').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && ((document.getElementById('movieName').value)!="")) {
      searchMovie();
  }
});

document.getElementById('search').addEventListener('click', function() {
  if((document.getElementById('movieName').value)!="")
  {
      searchMovie();
  }
});


function searchMovie() {
  document.getElementById("error").innerHTML="";
  var title = document.getElementById("movieName").value;
  document.getElementById('body').classList.remove("body");
  document.getElementById('body').classList.add("changebg");
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
        console.log(data);
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

        const movieDetailsCard = document.getElementById("movie-details-card");
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

        movieDetailsCard.innerHTML = `
                   <table class="movie-details">
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
                ${data.Actors.split(", ")
                  .map((actor) => `<li>${actor}</li>`)
                  .join("")}
            </ul>
        </td>
    </tr>
</table>`;
      } else {
        // document.getElementById('movie-details-card').innerHTML="";
        // document.getElementById("error").innerHTML="The Movie You Have Asked is not available. Kindly check if exist any Spelling mistake";
        // document.getElementById("movieName").innerText="";
        alert("The movie you have asked is not available. Check for the spelling and try again")
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      //document.write("An error occurred while fetching the movie data.");
    });
}
