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

  const replyCont = document.createElement("div");
  const newReply = document.createElement("input");
  const replyBtn = document.createElement("button");
  
  replyBtn.textContent = "Comment"
  
  replyBtn.className = "reply-btn";
  replyCont.className = "reply-box";
  replyCont.append( newReply, replyBtn );

  const arr = [meta, title, btns, replyCont];

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

function handleClick() {
  try {
    if ( event.target.textContent == "Reply" ){
      const tar = event.target.parentNode.parentNode.querySelector(".reply-box");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
      
      // console.log(event.target.parentNode.parentNode)
    } else if ( event.target.className == "reply-btn" ){
      // handle new event;

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

function fetchData(){
  return fetch('http://localhost:3000/posts')
    .then( res => res.json())
    .catch( err => console.log(err))
}

async function handleData(){
  try {
    const target = document.getElementById("container");
    const data = await fetchData();
    const post = renderPost(data);
    post.className = "post";
    target.append(post);

  } catch ( err ){
    console.log(err);
  }

}

window.addEventListener("load", () => {
  handleData();
  document.body.addEventListener("click", handleClick);
});
