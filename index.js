

async function tags() {

    let url = "https://api.imgur.com/3/tags";

    let res = await fetch(url, {
        headers: {
            "Authorization": "Client-ID 76f7d227f32e40a"
        }
    });
    let data = await res.json();
    let tags = data.data.tags;
    console.log(tags)
    show_tags(tags)
}

let tag_wall = document.getElementById("tag_wall");

function show_tags(tags) {
    tags.forEach((tags) => {

        let div = document.createElement('div');
        div.setAttribute("class", "tag_div")

        let title = document.createElement('h5');
        title.textContent = tags.name;

        let items = document.createElement('p');
        items.textContent = tags.total_items + " " + "Posts";

        let background = document.createElement('img');
        background.src = "media/background.png";
        background.setAttribute("id", "tag_img")

        div.append(background, title, items);
        tag_wall.append(div)
    })
}

tags();

const seeMore = document.getElementById("see_more");

seeMore.addEventListener("click", () => {
    tag_wall.classList.toggle("expanded");

    const expanded = tag_wall.classList.contains("expanded");
    if (expanded) {
        seeMore.innerHTML = "LESS TAGS-";
    } else {
        seeMore.innerHTML = "MORE TAGS+";
    }
});

let search_results = document.getElementById('search_results');
let id;

async function search_result() {

    let query = document.getElementById("search").value;

    let url = `https://api.imgur.com/3/gallery/search?q=${query}&page=1`;

    let response = await fetch(url, {
        headers: {
            "Authorization": "Client-ID 76f7d227f32e40a"
        }
    });

    let data = await response.json();
    let search = data.data;
    console.log(search);
    return search;
}

async function show_search(result) {

    search_results.innerHTML = null;

    let results = await search_result();

    if (results === undefined) {
        return false;
    }



    results.forEach((result) => {

        let div = document.createElement('div');
        div.setAttribute("id", "results")

        let title = document.createElement('p');
        title.innerText = result.title;

        div.append(title);
        search_results.append(div)
    })
}

function debounce(func, delay) {

    document.getElementById("search_results").style.height = "300";

    clearTimeout(id);

    id = setTimeout(function () {
        func();
    }, delay);
}

let content_wall = document.getElementById("content_wall");

async function content() {

    let url = "https://api.pexels.com/v1/curated?per_page=100";

    let res = await fetch(url, {
        headers: {
            "Authorization": "563492ad6f91700001000001fb3b1e4c4fe94c9c89d2476a52ba7512"
        }
    });
    let data = await res.json();
    let contents = data.photos;
    console.log(contents)
    show_content(contents)
}

function show_content(contents) {
    contents.forEach((contents) => {

        let div = document.createElement('div');
        div.setAttribute("id", "content_div")

        let title = document.createElement('h5');
        title.textContent = contents.alt;

        let iframe = document.createElement('img');
        iframe.src = contents.src.original;
        // iframe.autoplay = "true"

        div.append(iframe, title);
        content_wall.append(div)
    })
}

content();

function registered(e) {

    e.preventDefault();

    let myForm = document.getElementById("myForm");

    let name = myForm.users.value;
    let email = myForm.email.value;
    let password = myForm.password.value;
    let retype = myForm.retype.value;
    let number = myForm.number.value;

    if (localStorage.getItem('users') === null) {
        localStorage.setItem("users", JSON.stringify([]));
    }

    let user = {
        name,
        email,
        password,
        retype,
        number
    };

    let arr = JSON.parse(localStorage.getItem("users"));
    arr.push(user);

    localStorage.setItem("users", JSON.stringify(arr));

    alert("Congrats! You have been registered successfully")
}

function sign_in(e) {

    e.preventDefault();

    let myForm = document.getElementById("myForm");

    let email = myForm.email.value;
    let password = myForm.password.value;

    let all_users = JSON.parse(localStorage.getItem("users"));
    all_users.forEach(function (user) {

        if (email === user.email && password === user.password) {
            window.location.href = "index.html";
        }
        else if (email !== user.email || password !== user.password) {
            alert("Invalid email or password")
        }
    });

}

