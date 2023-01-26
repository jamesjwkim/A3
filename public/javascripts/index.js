//Do an ajax fetch call to the api endpoint "api/v1/urls/preview" with a
// query parameter called "url" that will have the value saved in the url variable

async function previewUrl(){
    try {
        let url = document.getElementById("urlInput").value;
    
        let response = await fetch("/api/v1/urls/preview?url=" + url)
        let result = await response.text()

        let preview = result
        console.log(preview)
        
        displayPreviews(preview)
    } catch(err) {
        displayPreviews(err)
    }
}

function displayPreviews(previewHTML){
    document.getElementById("url_previews").innerHTML = previewHTML;
}
