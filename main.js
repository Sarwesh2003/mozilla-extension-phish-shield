const subButton=document.getElementById("sub")          //Submit button
const responseText=document.getElementById("res")       //Response div
const backbtn=document.getElementById("back")           //Back button
const bg=document.getElementsByTagName("body")[0]       //Body tag for animation
const urlText=document.getElementById("search")         //TextBox for URL

responseText.innerText="Results will appear here"

//Submit button
subButton.onclick=function(){
    let url=urlText.value
    if(check_url(url)){
        showResult(url)
    }
    else{
        responseText.innerText="URL not valid"
    }
    bg.className=""
}

//If user press enter on textbox adter entering URL
urlText.addEventListener("keydown",e=>{
    if (e.key === 'Enter') {
        e.preventDefault();
        let url=urlText.value
        if(check_url(url)){
            showResult(url)
        }
        else{
            responseText.innerText="URL not valid"
        }
        bg.className=""
      }
})

//Function to fetch server
function showResult(url){
    responseText.innerText="Loading..."
    fetch( 'https://phishshield.herokuapp.com/post?URL='+url )
    .then( response => response.json() )
    .then( response => {
        if(response==1){
        responseText.innerHTML="<b>Safe Website</b>"
        bg.className="blink-bg-green"
    }
    else if(response==0){
        responseText.innerText="Not recognized"
        bg.className="blink-bg-yellow"
    }
    else if(response==2){
        responseText.innerText="Loading..."
    }
    else{
        responseText.innerText="Phishing website"
        bg.className="blink-bg-red"
    }
    urlText.value=""
        
    } )
    .catch(error=>{
        responseText.innerText="Something went wrong. Please Check your internet connection"
    });
    
}

//Function to check input URL
function check_url(myURL){
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(myURL);
}


