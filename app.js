const search = document.querySelector("#search");
const searchBtn = document.querySelector("#Btn");
const showData = document.querySelector(".showImage");
const showMore = document.querySelector(".moreBtn");

let page = 1;
let searchVal = ""; // Define searchVal globally to access it in different scopes

const ApiKey = "zz4UiPE_8IYTQVDLUDZzX8DpqRR-f03wUf4mPAi6FeU";

async function getData(searchVal, pageNo) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchVal}&per_page=28&page=${pageNo}&client_id=${ApiKey}`
  );
  let data = await response.json();

  let results = data.results;

  if (pageNo === 1) {
    showData.innerHTML = "";
  } else if (searchVal === "") {
    showData.innerHTML = `<h1>Please Search</h1>`;
  } else {
    document.querySelector(".moreBtn").style.display = "block";
  }

  let html = ""; // Accumulate HTML

  results.forEach((data) => {
    html += `
      <div>
        <img src=${data.urls.small} alt="">
      </div>`;
  });

  showData.innerHTML += html; // Set HTML after the loop
}

searchBtn.addEventListener("click", () => {
  searchVal = search.value; // Update searchVal
  getData(searchVal, 1);
});

showMore.addEventListener("click", () => {
  getData(searchVal, ++page); // Increment page and pass searchVal
});
