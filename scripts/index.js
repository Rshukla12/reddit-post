const data = {
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
          points: "8",
        },
      ],
    },
    {
      id: "002",
      author: "Nrupul",
      body: "looking forward for the demo!",
      timestamp: "Sun Aug 02 2020 18:10:45 GMT+0530",
      points: "2",
    },
  ],
};

function createBtns(){
  const reply = document.createElement("button");
  const giveAward = document.createElement("button");
  const share = document.createElement("button");
  const report = document.createElement("button");
  const save = document.createElement("button");

  reply.textContent = "Reply";
  giveAward.textContent = "Give Award";
  share.textContent = "Share";
  report.textContent = "Report";
  save.textContent = "Save";

  reply.className = "new-reply";

  return [reply, giveAward, share, report, save];
}

function createMeta(post){
  const meta = document.createElement("div");
  const author = document.createElement("h5");
  const points = document.createElement("h5");
  const time = document.createElement("h5");

  author.textContent = post.author;
  points.textContent = post.points + " Points";
  time.textContent = post.timestamp;

  meta.className = "details";

  meta.append( author, points, time );
  return meta;
}


function renderPost(post) {
  const div = document.createElement("div");
  
  const meta = createMeta(post);
  const title = document.createElement("h3");
  
  const btns = document.createElement("div");

  title.textContent = post.body;

  btns.append(...createBtns());

  const newReply = document.createElement("input");
  newReply.className = "reply-box";

  const arr = [meta, title, btns, newReply];

  if ( post.replies?.length > 0 ) {
    const replies = document.createElement("div");
    for (let reply of post.replies) {
      const res = renderPost(reply);
      replies.append(res);
    }
    replies.className = "reply";
    arr.push(replies);
  }
  div.append(...arr);
  return div;
}

function handleLoad() {
  try {
    if ( event.target.textContent == "Reply" ){
      const tar = event.target.parentNode.parentNode.querySelector(".reply-box");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
      // console.log(event.target.parentNode.parentNode)
    } else if ( event.target.className == "replies" ) {
      console.log(event.target)
      const tar = event.target.querySelector(".reply");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
    } else {
      const tar = event.target.parentNode.querySelector(".reply");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
    }
  } catch ( err ){
    // error like replies doesn't exist
  } 
}

window.addEventListener("load", () => {
  const target = document.getElementById("container");
  const post = renderPost(data);
  post.className = "post";
  target.append(post);
  target.addEventListener("click", handleLoad);
});
