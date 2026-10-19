function getFullPosts(n) {
    return fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(res => res.json())
        .then(posts => posts.slice(0, n))
        .then(posts => {
            const commentsRequest = posts.map(post =>
                fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                    .then(com => com.json())
            );

            const usersRequest = posts.map(post =>
                fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                    .then(user => user.json())
            );


            return Promise.all(commentsRequest)
                .then(comments => {
                    posts.forEach((post, i) => {
                        post.comments = comments[i];
                    });
                    return Promise.all(usersRequest);
                })
                .then((users) => {
                    posts.forEach((post, i) => {
                        post.user = users[i]
                    })

                    return posts
                })
        });
}

getFullPosts(10).then(console.log);