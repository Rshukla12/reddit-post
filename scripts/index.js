function fetchData(){
  return fetch('http://localhost:3000/posts')
    .then( res => res.json())
    .catch( err => console.log(err))
}


function fetchReply(id){
  return fetch(`http://localhost:3000/replies?parentId=${id}`)
    .then( res => res.json())
    .catch( err => console.log(err));
}

 
function putComment(comment, id){
  const author = "ravi";
  const payload = {
    parentId:id,
    body:comment,
    author:author,
    points: 0,
    timestamp: new Date().toGMTString()
  };
  config = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  }
  return fetch("http://localhost:3000/replies", config)
    .then( res => res.json() )
    .catch( err => console.log( err ) )
}


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

async function renderPost(post) {
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
  replyBtn.value = post.id;
  replyCont.className = "reply-box";
  replyCont.append( newReply, replyBtn );

  const arr = [meta, title, btns, replyCont];

  const replies = await displayReplies(post.id);

  if ( replies ) {
    arr.push(replies);
  }

  div.append(...arr);
  return div;
}

async function displayReplies(id){
  try {
    const data = await fetchReply(id);
    if ( data.length == 0 ){
      return false;
    }  
    const replies = document.createElement("div");

    for (let reply of data) {
      const res = await renderPost(reply);
      replies.append(res);
    }
    replies.className = "reply";
    return replies;
  } catch ( err ){
    console.log(err);
  }
}

function handleClick(event) {
  try {
    if ( event.target.textContent == "Reply" ){
      const tar = event.target.parentNode.parentNode.querySelector(".reply-box");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
      
      // console.log(event.target.parentNode.parentNode)
    } else if ( event.target.className == "reply-btn" ){
      newComment(event)
    } else if ( event.target.className == "replies" ) {
      const tar = event.target.querySelector(".reply");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
    } else {
      const tar = event.target.parentNode.querySelector(".reply");
      tar.style.display = tar.style.display == "block" ? "none" : "block";
    }
    event.stopImmediatePropagation();
  } catch ( err ){
    // error like replies doesn't exist
  } 
}


async function handleLoad(){
  try {
    const target = document.getElementById("container");
    const data = await fetchData();
    const post = await renderPost(data[0]);
    post.className = "post";
    target.append(post);
  } catch ( err ){
    console.log(err);
  }
}

async function newComment(){
  try {
    const parNode = event.target.parentNode;
    const input = parNode.querySelector("input");
    const parent = event.target.value;
    const {id, parentId} = await putComment(input.value, parent);
    const tar = parNode.parentNode;
    const r = await displayReplies(parentId);
    r.className = "reply"
    r.style.display = "inherit";
    if ( tar.querySelector(".reply") ){
      tar.removeChild(tar.querySelector(".reply"))
    }
    tar.append( r );
  } catch ( err ){
    console.log(err);
  }
}

window.addEventListener("load", () => {
  handleLoad();
  document.body.addEventListener("click", handleClick);
});
