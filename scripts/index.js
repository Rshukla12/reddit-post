const data =  {
    id: "001",
    author: "albert",
    body: "Whats the status?",
    timestamp: "Sun Aug 02 2020 18:08:45 GMT+0530",
    points: "2",
    replies: [
      {
        id: "003",
        author: "haren",
        body: "Wrote the test suites, waiting for approval?",
        timestamp: "Sun Aug 02 2020 18:12:45 GMT+0530",
        points: "3",
        replies: [
          {
            id: "004",
            author: "albert",
            body: "Thanks for the update!",
            timestamp: "Sun Aug 02 2020 18:15:45 GMT+0530",
            points: "8"
          }
        ]
      },
      {
        id: "002",
        author: "Nrupul",
        body: "looking forward for the demo!",
        timestamp: "Sun Aug 02 2020 18:10:45 GMT+0530",
        points: "2"
      }
    ]
};


function renderPost(post){
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("h5");

    title.textContent = post.body;
    author.textContent = post.author;

    const replies = document.createElement("div");
    if ( post.replies ){    
        for ( let reply of post.replies ){
            const res = renderPost(reply);
            replies.append( res );
        }
    }

    replies.className = "reply";

    div.append( title, author, replies );
    return div;
}

function handleLoad(){
    const tar = event.target.parentNode.querySelector(".reply");
    tar.style.display = tar.style.display == "block" ? "none" : "block";
}


window.addEventListener("load", ()=> {
    const target = document.getElementById("container");
    target.append(renderPost(data));
    target.addEventListener("click", handleLoad)
})