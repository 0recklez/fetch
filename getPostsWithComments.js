
function getPostsWithComments(n) {
    return fetch('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => response.json())
        .then((json) => json.slice(0, n))
        .then((posts) => {
            const commentsRequest = posts.map(post =>
                fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                    .then(com => com.json())
            );

            return Promise.all(commentsRequest)
                .then((comments) => {
                    comments.forEach((com, i) => {
                        posts[i]['comments'] = com;
                    });
                    return posts;
                });
        });
}

getPostsWithComments(10).then(console.log);
