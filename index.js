const fs = require("fs")
const inquirer = require("inquirer")
const util = require("util")
const Axios = require("axios");
const puppeteer = require("puppeteer");



inquirer
   .prompt([
       {
           type: 'input',
           name: 'name',
           message: "Enter your Github username",
       },
       
       {
           type: 'input',
           name: 'color',
           message: "What is your favorite color?",
       }
   ])
   
   .then(answers => {
       console.log(`Hi ${answers.name}!`)
       console.log(`Favcolor is ${answers.color}!`)
       

       const queryUrl = `https://api.github.com/users/${answers.name}`;
       const starsQuery = `https://api.github.com/users/${answers.name}/starred`
      

       Axios
           .get(queryUrl)
           .then(function(response){
       
        //    console.log(response.data.avatar_url)

        //    console.log(response.data.bio)
           
        //    console.log(response.data.login)

        //    console.log(response.data.html_url)

        //    console.log(response.data.location)

        //    console.log(response.data.public_repos)

        //    console.log(response.data.followers)

        //    console.log(response.data.following);
           
      
       (async function renderPDF() {
           try {
           
                   const browser = await puppeteer.launch();
                   const page = await browser.newPage();
           
                   await page.setContent(
                   
                   `
                   <!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Document</title>

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

   <style>
       img {
           height: 190px;
           width: 190px;
           margin-top: 30px;
           margin-left: auto;
           margin-right: auto;
           border-radius: 50%;
           box-shadow: 0px 0px 8px 1px grey;
       }

       .bio, .githublink, .githubprofile, .location, .followers, .following, .stars, .repos  {
           margin-top: 30px;
           margin-left: auto !important;
           margin-right: auto !important;
           border-radius: 5px;
           width: 50%;
           text-align: center;
           background-color: #ff7171;
       }


       html, body {

           width: 100%;
           height: 100%;
           background-color: gray;
       }

       .main-div {
           margin-top: 50px;
       }


       p {
           color: white;
       }

       .pdf-header {
           background-color: ${answers.color};
       }

   
   </style>


</head>



<body>

   <div class="container-fluid">
       <div class="container main-div">
           <div class="container pdf-header">

               <div class="row">
                   <img id="ProfileImg" src="${response.data.avatar_url}">
                   
               </div>

               <div class="row">
                   <div class="col-md-4"></div>

                   <div class="col-md-4 bio">
                       <p>Hi! My name is ${response.data.name}</p> 
                       <p>${response.data.bio}</p>
                   </div>

                   <div class="col-md-4"></div>
               </div>
              
           <div class="row">
               <div class="col-md-4 location">${response.data.location}</div>
               <div class="col-md-4 githublink"><a id="GithubLink" href="${response.data.html_url}">Github</a></div>
               <div class="col-md-4 githublink"><a id="GithubLink" href="${response.data.blog}">Blog</a></div>
           </div>

       </div>

       <div class="container pdf-header">
           <div class="row">
               <div class="col-md-2 followers">
                   <p>Followers</p>
                   <p>${response.data.followers}</p>
               </div>
               <div class="col-md-2 following">
                   <p>Following</p>
                   <p>${response.data.following}</p>
               </div>
           </div>

           <div class="row">
               <div class="col-md-2 stars">
                   <p>Stars</p>
                   <p></p>
               </div>
               <div class="col-md-2 repos">
                   <p>Repositories</p>
                   <p>${response.data.public_repos}</p>
               </div>
           </div>
        </div>
       </div>
   </div>

</body>

   <!-- Bootstrap JS -->
   <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

   <!-- JQuery -->
   <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
   

   <!-- Custom JS / JQuery Scripts -->
   <script src="index.js"></script>


</html>
       `)
           
                   await page.emulateMedia("screen");
                   await page.pdf({
           
                       path: "GithubSnapShot.pdf",
                       format: "A4",
                       printBackground: true
                   });
           
                   console.log("PDF Complete!");
                   await browser.close();
                   process.exit();
           
                   } catch (err) {
                       console.log("our error", err)
                   }
           
               })();

       })
       
 
 })

 