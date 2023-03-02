async function init(){
    await loadIdentity();
    loadUserInfo();
}

async function saveUserInfo(){
    //TODO: do an ajax call to save whatever info you want about the user from the user table
    //see postComment() in the index.js file as an example of how to do this
    document.getElementById("saveUserInfoStatus").innerHTML = "sending data..."
    let userInfo = document.getElementById("userInfoInput").value;
    const urlParams = new URLSearchParams(window.location.search);
    const username1 = urlParams.get('user');

    try{
        await fetchJSON(`api/${apiVersion}/custom`, {
            method: "POST",
            body: {favorite_song: userInfo}
        })
    }catch(error){
        document.getElementById("saveUserInfoStatus").innerText = "Error"
        throw(error)
    }
    document.getElementById("userInfoInput").value = "";
    document.getElementById("saveUserInfoStatus").innerHTML = "successfully saved."
}

async function loadUserInfo(){
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');
    if(username==myIdentity){
        document.getElementById("username-span").innerText= `You (${username})`;
        document.getElementById("user_info_new_div").classList.remove("d-none");
        
    }else{
        document.getElementById("username-span").innerText=username;
        document.getElementById("user_info_new_div").classList.add("d-none");
    }
    
    //TODO: do an ajax call to load whatever info you want about the user from the user table
    let userInfoDiv = document.getElementById("userInfo_previews");
    let userInfoJSON = await fetchJSON(`api/${apiVersion}/custom?username=${username}`);
    

    
    let userInfoHtml = userInfoJSON.map(givenInfo => {
        return `
        <div>
            <p>${givenInfo.favorite_song}</p>
        </div>
        `
    }).join(" ")


    userInfoDiv.innerHTML = userInfoHtml;


    loadUserInfoPosts(username)
}


async function loadUserInfoPosts(username){
    document.getElementById("posts_box").innerText = "Loading...";
    let postsJson = await fetchJSON(`api/${apiVersion}/posts?username=${encodeURIComponent(username)}`);
    let postsHtml = postsJson.map(postInfo => {
        return `
        <div class="post">
            ${escapeHTML(postInfo.description)}
            ${postInfo.htmlPreview}
            <div><a href="/userInfo.html?user=${encodeURIComponent(postInfo.username)}">${escapeHTML(postInfo.username)}</a>, ${escapeHTML(postInfo.created_date)}</div>
            <div class="post-interactions">
                <div>
                    <span title="${postInfo.likes? escapeHTML(postInfo.likes.join(", ")) : ""}"> ${postInfo.likes ? `${postInfo.likes.length}` : 0} likes </span> &nbsp; &nbsp; 
                </div>
                <br>
                <div><button onclick='deletePost("${postInfo.id}")' class="${postInfo.username==myIdentity ? "": "d-none"}">Delete</button></div>
            </div>
        </div>`
    }).join("\n");
    document.getElementById("posts_box").innerHTML = postsHtml;
}


async function deletePost(postID){
    let responseJson = await fetchJSON(`api/${apiVersion}/posts`, {
        method: "DELETE",
        body: {postID: postID}
    })
    loadUserInfo();
}