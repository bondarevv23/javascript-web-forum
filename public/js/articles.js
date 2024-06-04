const posts_url = "https://my-json-server.typicode.com/AlexChampi/intensives_aug2023/posts"
window.addEventListener("load", fetchData);

function handleResponse(response) {
    if (response.ok) {
        console.log("Successfully fetch data")
        return response.json()
    }
    throw new Error('Status code is not 200');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function randomFilterPosts(posts) {
    console.log("Filter data")
    posts = shuffle(posts)
    return posts.slice(0, 5);
}


function renderPost(item) {
    const newItem = document.createElement("div");
    newItem.classList.add("articles-list__item");
    newItem.innerHTML = `
        <div class="articles-list__item-author">${item.author}</div>
        <div class="articles-list__item-date">${item.date}</div>
        <div class="articles-list__item-title">${item.title}</div>
        <div class="articles-list__item-img"><img src="${item.img}" alt="фото"></div>
  `;
    return newItem

}

function showPosts(filteredPosts) {
    console.log("Render data")
    console.log(filteredPosts)
    const parentElement = document.querySelector(".articles-list");

    filteredPosts.forEach(post => {
        el = renderPost(post);
        parentElement.appendChild(el);
    })
}

function hidePreloader() {
    let pre = document.getElementsByClassName("preloader")[0]
    console.log(pre)
    pre.hidden = true;
}

function handleError(error) {
    console.log("Error handle")
    document.getElementsByClassName("preloader-error")[0].hidden = false
}

async function fetchData() {
    console.log("Wait 2 sec before fetch")
    await sleep(2000)
    console.log("fetch")
    fetch(posts_url)
        .then(response => handleResponse(response))
        .then(posts => randomFilterPosts(posts))
        .then(filteredPosts => showPosts(filteredPosts))
        .catch(error => handleError(error))
        .finally(() => hidePreloader())
}
