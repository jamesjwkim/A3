Added og:sitename as another piece of information.
It allows the users to see the title of the main website instead where we only saw the title of the page.
It helps if you are guiding through a big website.

Changed some css where the body is aligned in the center. It is my personal preference that contents align in the center.
Added the html response (the result) to the center of the page and included them in a div.
This way, the contents of the web is scaled to the center when the page is minimized horizontally.
I also added some minor margins around the link and the paragraph texts. This is so that the contents have some space between them.

/*
let allPosts = await req.models.Post.find()
    console.log("print allPosts")
    console.log(allPosts)

    let allurls = []
    let urlPosts = allPosts.map(async post =>{
        console.log(post.url)
        allurls.push(post.url)


    })

    console.log(allurls)

    let finalJSON=""

    for(let i = 0; i< allurls.length; i++){
        finalJSON += await getURLPreview(allurls[i]) 
    }

    res.json(finalJSON)
*/