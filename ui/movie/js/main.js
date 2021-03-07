function getMovies(searchText){

    $("#moviesSpinner").removeClass("d-none");

    $.get('https://www.omdbapi.com?apikey=915cbc57&s='+searchText)
    .then((response)=>{

        console.log(response);
        let movies=response.Search;
        let output = '';
        $.each(movies,(index,movie)=>{
           output += `
           <div class="col-md-6">
                <div class="bg-info text-center">
                    <img src="${movie.Poster}" class="mt-4">
                    <h5>${movie.Title}</h5>
                    <button class="btn btn-primary mb-3" onclick="movieSelected('${movie.imdbID}')" >Detail</button>
                </div>
           </div>
            `;
        });
        $("#movies").html(output);
        $("#moviesSpinner").addClass("d-none");
    })
    .catch((err)=>{
        console.log(err);
        $("#moviesSpinner").addClass("d-none");
    });
}
    function movieSelected(id){
        sessionStorage.setItem('movieId', id);
        window.location='movie.html';
        return false;
    }
    function getMovie(){
        $("#movieSpinner").removeClass("d-none");
        let movieId=sessionStorage.getItem('movieId');
        $.get('https://www.omdbapi.com?apikey=915cbc57&i='+movieId)
        .then((response)=>{
            console.log(response);
           let movie=response;
           let output=`
           <div class="row text-center pt-4">
            <div class="col-md-12">
            <img src="${movie.Poster}" class="thumbnail"></img>
            </div>
            <div class="col-md-12">
            <h2 class="text-white">${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating : </strong>${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
            </ul>

            </div>
           </div>
                <div class="row">
                <div class="well">
                <h3 class="text-white pl-2">Plot</h3>
                <p class="text-white pl-2">${movie.Plot}</p>
                <hr>
                <a class="pl-2" href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a class="pl-2" href="index.html" class="btn btn-info">Go back to Search</a>
                </div>

                </div>
                 `;
                 $("#movie").html(output);
                 $("#movieSpinner").addClass("d-none");
        })
        .catch((err)=>{
            console.log(err);
            $("#movieSpinner").addClass("d-none");
        });
    }

$(document).ready(function(){
    $("#searchForm").on('submit',(e) =>{
        let searchText= $('#searchText').val();  
        if(searchText == ''){
            alert("Please enter search term");
            return false;
        }
        getMovies(searchText);
        e.preventDefault();
    });
});