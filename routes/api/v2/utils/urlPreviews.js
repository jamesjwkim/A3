import fetch from 'node-fetch';

import parser from 'node-html-parser';

async function getURLPreview(url){
  // TODO: Copy from your code for making url previews in A2 to make this 
  // a function that takes a url and returns an html string with a preview of that html
  try {

    //let url = req.query.url

    //get contents of the url/html
    let response = await fetch(url)
    let pageText = await response.text()

    //parse the html
    let htmlPage = parser.parse(pageText)

    //find all meta tags with og and send response in form of html

    let responseHtml = ""

    let metaURL = htmlPage.querySelector("meta[property='og:url']");
    if(metaURL != null) {
      let urlName = metaURL.getAttribute("content");
      console.log(urlName)
      responseHtml += "<div class='align'>" + "<a href='" + urlName + "' style='display: block; margin: 10px;'>"
      console.log(responseHtml)
    } else {
      console.log("wetwewrer");
      console.log(url)
      responseHtml += "<div class='align'>" + "<a href='" + url + "' style='display: block; margin: 10px;'>"
    }

    let metaTitle = htmlPage.querySelector("meta[property='og:title']");
    if(metaTitle != null) {
      let titleName = metaTitle.getAttribute("content");
      console.log(titleName)
      responseHtml += titleName + "</a>"
    } else {
      console.log("wetwewrer");
      let titleName = htmlPage.querySelector("title").textContent
      responseHtml += titleName + "</a>"
    }

    let metaSite = htmlPage.querySelector("meta[property='og:sitename']");
    if(metaSite != null) {
      let siteName = metaSite.getAttribute("content");
      console.log(siteName)
      responseHtml += "<p>" + siteName + "</p>"
    }

    let metaImage = htmlPage.querySelector("meta[property='og:image']");
    if(metaImage != null) {
      let imageName = metaImage.getAttribute("content");
      console.log(imageName)
      responseHtml += "<img src='" + imageName + "'>"
    }

    let metaDesc = htmlPage.querySelector("meta[property='og:description']");
    if(metaDesc != null) {
      let descName = metaDesc.getAttribute("content");
      console.log(descName)
      responseHtml += "<p>" + descName + "</p>" + "</div>"
    }

    return responseHtml
  } catch(err) {
    return "<p>Error</p>"
  }



}

export default getURLPreview;