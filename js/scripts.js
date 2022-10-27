const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");
const resultsUsers = document.querySelector(".user__container");

loadBtn.addEventListener("click", async function (evt) {
  const searchValue = searchInput.value.trim().toLowerCase();
  evt.preventDefault();

  await fetch(`https://api.github.com/users/${searchValue}`)
    .then((res) => {
      return res.json();
    })
    .then(
      (data) =>
        (resultsContainer.innerHTML = `<div class="response-container">
                <img src="${data.avatar_url}">
                <p> Имя: <span>${data.name}</span><p>
                <p> О себе: <span>${data.bio}</span><p>
                <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
            </div>`)
    );
});

async function getUser() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const users = response.data.map((post) => {
      return `<div class="user__block">
      <p><span class="user__description">id:</span> ${post.id}</p>
      <p><span class="user__description">name:</span> ${post.name}</p>
      <p><span class="user__description">username:</span> ${post.username}<p>
      <p><span class="user__description">street:</span> ${post.address.street}<p>
      <p><span class="user__description">suite:</span> ${post.address.suite}<p>
      <p><span class="user__description">city:</span> ${post.address.city}<p>
      <p><span class="user__description">zipcode:</span> ${post.address.zipcode}<p>
      <p><span class="user__description">phone:</span> ${post.phone}<p>
      <p><span class="user__description">website:</span> ${post.website}<p>
      <p><span class="user__description">name:</span> ${post.company.name}<p>
      <p><span class="user__description">catchPhrase:</span> ${post.company.catchPhrase}<p>
      <p><span class="user__description">bs:</span> ${post.company.bs}<p>
      </div>`;
    });

    resultsUsers.innerHTML = users.join("");
  } catch (error) {
    console.error(error);
  }
}
