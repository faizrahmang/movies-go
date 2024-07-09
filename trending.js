// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTM3OWM2YmViMjNhNzkzMjk2NDk2N2Y1ODAwZGM5NiIsIm5iZiI6MTcyMDUyMDM1OS4xMjcwMzIsInN1YiI6IjY2OGI4YWY4NTZjYzlkZDM5NDc0OWZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dh6VO69r9Rw-WrMNc2CZwYpIfwEeK9HrQqxlM-6pkl0'
//       }
//     };

//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         console.log(res);
//         const moviesDiv = document.getElementById('movies');
//         res.results.forEach(movie => {
//           fetch(`https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits`, options)
//             .then(res => res.json())
//             .then(details => {
//               console.log(res);
//               const directors = details.credits.crew.filter(member => member.job === 'Director').map(director => director.name).join(', ');
//               const actors = details.credits.cast.slice(0, 3).map(actor => actor.name).join(', ');

//               const movieElement = document.createElement('div');
//               movieElement.className = 'card';
//               movieElement.innerHTML = `
//                 <h2>${movie.title}</h2>
//                 <p><strong>Director:</strong> ${directors}</p>
//                 <p><strong>Actors:</strong> ${actors}</p>
//               `;

//               movieElement.addEventListener('click', () => {
//                 alert(`Full details for ${movie.title}:\n\nOverview: ${movie.overview}\nRelease Date: ${movie.release_date}\nVote Average: ${movie.vote_average}`);
//               });

//               moviesDiv.appendChild(movieElement);
//             })
//             .catch(err => console.error('error fetching movie details:', err));
//         });
//       })
//       .catch(err => console.error('error fetching movies:', err));
const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTM3OWM2YmViMjNhNzkzMjk2NDk2N2Y1ODAwZGM5NiIsIm5iZiI6MTcyMDUyMDM1OS4xMjcwMzIsInN1YiI6IjY2OGI4YWY4NTZjYzlkZDM5NDc0OWZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    const moviesDiv = document.getElementById("movies");
    json.results.forEach((movie) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits`,
        options
      )
        .then((res) => res.json())
        .then((details) => {
          const directors = details.credits.crew
            .filter((member) => member.job === "Director")
            .map((director) => director.name)
            .join(", ");
          const actors = details.credits.cast
            .slice(0, 3)
            .map((actor) => actor.name)
            .join(", ");

          const movieElement = document.createElement("div");
          movieElement.className = "card";
          const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          movieElement.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title} Poster">
                <div>
                  <h2>${movie.title}</h2>
                  <p><strong>Director:</strong> ${directors}</p>
                  <p><strong>Actors:</strong> ${actors}</p>
                </div>
              `;

          movieElement.addEventListener("click", () => {
            alert(
              `Full details for ${movie.title}:\n\nOverview: ${movie.overview}\nRelease Date: ${movie.release_date}\nVote Average: ${movie.vote_average}`
            );
          });

          moviesDiv.appendChild(movieElement);
        })
        .catch((err) => console.error("error fetching movie details:", err));
    });
  })
  .catch((err) => console.error("error fetching movies:", err));
