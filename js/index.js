const form = document.getElementById('github-form')
let currentUser = '';


function loadRepos() {
    console.log(currentUser)
    // const search = document.getElementById('search').value;
    // const splitSearch = search.split(' ').join('');
    document.getElementById('repos-list').innerHTML = '';
    fetch(`https://api.github.com/users/${currentUser}/repos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const reposList = document.getElementById('repos-list')
            for(let repos in data) {
                console.log(data[repos].name)
                const repo = document.createElement('li')
                repo.innerHTML = `${data[repos].name}`

                reposList.appendChild(repo)
            }
        })
}
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const search = document.getElementById('search').value;
    const splitSearch = search.split(' ').join('');
    document.getElementById('user-list').innerHTML = '';
    fetch(`https://api.github.com/users/${splitSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            document.getElementById('user-list').innerHTML = `
                <h3 id="userTitle">${data.login}</h3>
                <img src="${data.avatar_url}"/>
                <p>Name: ${data.name}</p>
                <p>Bio: ${data.bio}</p>
                <input type="submit" onclick="loadRepos()" value="Repositories" />
            `
            currentUser = data.login;
    });
})
const repos = document.getElementById('getRepos')