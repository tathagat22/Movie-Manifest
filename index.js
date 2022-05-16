const slider = document.getElementById('slider');
const moviecard = document.getElementById('moviecard');

function toggleMenu(flag) {
    let value = document.getElementById("menu");
    console.log('clicked');
    if (flag) {
        value.classList.remove("hidden");
    } else {
        value.classList.add("hidden");
    }
}
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");
btn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
});
// The Poster Slider
hash_arr = ['8B7BCDC2', '500B67FB', 'A89D0DE6', '225E6693', '9D9539E7', 'BDC01094', '7F5AE56A', '4F32C4CF', 'B0E33EF4', '2D297A22', '2D297A26', '2D297A13', '2D297B22', '2D297A92'];
for(let i=0;i<hash_arr.length;i++){
    sliderr(hash_arr[i]);
}
function sliderr(hash) {
    const mainslider = document.createElement('div');
    mainslider.classList.add('slide');
    mainslider.innerHTML = `
    <img src="https://api.lorem.space/image/movie?w=240&h=290&hash=${hash}" height="300" width="250" alt="" />
    `
    slider.appendChild(mainslider);
}
// The Poster Slider

// The Movie Fetcher

async function getPost() {
    const postResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=700f939f660d9c0f14d5e56bc946f5ed&query=${document.getElementById('textbox_id').value}`);
    const postData = await postResponse.json();
    const data = {post: postData};
    const where = await fetch(`https://api.themoviedb.org/3/movie/${data.post.results[0].id}?api_key=700f939f660d9c0f14d5e56bc946f5ed`);
    const whereData = await where.json();
    const wheredata = {wdata: whereData};
    const trailer = await fetch(`https://api.themoviedb.org/3/movie/${data.post.results[0].id}/videos?api_key=700f939f660d9c0f14d5e56bc946f5ed`);
    const postTrailer = await trailer.json();
    const Otrailer = {otrailer: postTrailer};

    console.log('clicked');
    console.log(wheredata.wdata.tagline);
    movietime(data,wheredata, Otrailer);

}
function movietime(data, wheredata, Otrailer){
    moviecard.innerHTML = `
    <div class="bg-white shadow-lg border-gray-100 max-h-70 border sm:rounded-5xl p-4 flex space-x-6">
          <div class="h-48 overflow-visible w-1/2">
              <img class="rounded-3xl shadow-lg" src="https://image.tmdb.org/t/p/w500/${data.post.results[0].poster_path}" alt="${data.post.results[0].title}">
          </div>
          <div class="flex flex-col w-1/2 space-y-4">
            <div class="flex justify-between items-start">
              <h2 class="text-3xl font-bold text-gray-900">${data.post.results[0].title}</h2>
              <div class="bg-yellow-400 font-bold rounded-xl p-2 text-gray-800">${data.post.results[0].vote_average}</div>
            </div>
            <div>
              <div class="text-sm text-gray-400">Lang - ${data.post.results[0].original_language}</div>
              <div class="text-lg text-gray-800">${data.post.results[0].release_date}</div>
            </div>
              <p class=" text-gray-700 max-h-80 overflow-auto">${data.post.results[0].overview}</p>
            <div class="flex text-l font-bold text-a text-gray-800">"${wheredata.wdata.tagline}"</div>
          </div>
        </div>
    </div>
    `
    const ytrailer = document.getElementById('ytrailer');
    ytrailer.innerHTML = `
    <h1 class="text-center text-2xl font-black leading-7 text-gray-800 sm:text-3xl md:text-4xl md:leading-10 lg:text-5xl xl:text-6xl p-1">Trailer</h1>
    <iframe class="w-full" width="1280" height="720" src="https://www.youtube.com/embed/${Otrailer.otrailer.results[0].key}" title="Trailer" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

async function random_movie(){
    const postRandomResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=700f939f660d9c0f14d5e56bc946f5ed&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${rando(500)}&with_watch_monetization_types=flatrate`);
    const postRandomData = await postRandomResponse.json();

    const movierandom = {rand : postRandomData};
    
    rand_to_dom(movierandom);
}

function rand_to_dom(movierandom){
    const moviecard2 = document.getElementById('moviecard2');
    const random = rando(19);
    moviecard2.innerHTML = `
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12" id="moviecard2">
        <div class="py-3 sm:max-w-xl sm:mx-auto">
            <div class="bg-white shadow-lg border-gray-100 max-h-70 border sm:rounded-5xl p-4 flex space-x-6">
                <div class="h-48 overflow-visible w-1/2">
                    <img class="rounded-3xl shadow-lg" src="https://image.tmdb.org/t/p/w500/${movierandom.rand.results[random].poster_path}" alt="">
                </div>
                <div class="flex flex-col w-1/2 space-y-4">
                    <div class="flex justify-between items-start">
                        <h2 class="text-3xl font-bold text-gray-900">${movierandom.rand.results[random].title}</h2>
                    <div class="bg-yellow-400 font-bold rounded-xl p-2 text-gray-800">${movierandom.rand.results[random].vote_average}</div>
                </div>
                <div>
                    <div class="text-sm text-gray-400">Lang - ${movierandom.rand.results[random].original_language}</div>
                    <div class="text-lg text-gray-800">${movierandom.rand.results[random].release_date}</div>
                </div>
                    <p class=" text-gray-700 max-h-80 overflow-auto">${movierandom.rand.results[random].overview}</p>
                </div>
                </div>
         </div>
        </div>
    </div>
    `;
}
