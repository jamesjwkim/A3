import fetch from 'node-fetch'
import parser from 'node-html-parser'
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/urls/preview', async function(req,res,next) {
    let url = req.query.url

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

    res.type("html")
    res.send(responseHtml)



})

export default router;

//console.log("first one " + metaURL + "\n\n")
    //if(metaURL = "") {
    //  console.log("meta tag does not exist")
    //} else {
    //  console.log("first one " + metaURL + "\n\n")
    //}
      // console.log("first one " + metaURL + "\n\n")
      // console.log(metaURL.content)
      // console.log("two" + metaTitle + "\n\n")
      // console.log("three" + metaImage + "\n\n")
      // console.log("four" + metaDesc + "\n\n")

      // let regURL = url;
      // if (regURL != null) {
      //   let urlName = regURL.textContext
      //   console.log(urlName)

         // for(let i = 0; i < metaURL.length; i++){
    //   let finalUrl = metaURL[i]
    //   if(finalUrl != null) {
    //     console.log("askdaoiwhgoiawe")
    //     console.log(finalUrl.attributes.content)
    //   } else {
    //     console.log("sdgsgsdgsdg")5
    //   }
    // }
    
    // for(let i = 0; i < metaTitle.length; i++){
    //   let finalTitle = metaTitle[i]

    //   console.log(finalTitle.attributes.property) 
    // }

    // for(let i = 0; i < metaImage.length; i++){
    //   let finalImage = metaImage[i]

    //   console.log(finalImage.attributes.content) 
    // }

    // for(let i = 0; i < metaDesc.length; i++){
    //   let finalDesc = metaDesc[i]

    //   console.log(finalDesc.attributes.property) 
    // }

    
    // console.log(test)
    // if(test.getAttribute(property) == "og:url") {
    //   console.log("it worked!")
    // }
    
    // console.log(metaURL + "\n\n")
    //console.log(metaURL)
    //console.log(test.getAttribute(content))

    //let metaURL = htmlPage.querySelectorAll("meta[property='og:url']");     
    //let metaTitle = htmlPage.querySelectorAll("meta[property='og:title']"); 
    // let metaImage = htmlPage.querySelectorAll("meta[property='og:image']");
    // let metaDesc = htmlPage.querySelectorAll("meta[property='og:description']");
    // let ogTags = htmlPage.querySelectorAll('meta[property*="og:"]')