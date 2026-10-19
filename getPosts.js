function getPosts(n) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`)
        .then((response) => response.json())
        .then((json) => json.splice(0, n))
}

getPosts(10).then(console.log);