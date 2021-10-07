const subButton=document.getElementById("sub")          //Submit button
const responseText=document.getElementById("res")       //Response div
const backbtn=document.getElementById("back")           //Back button
const bg=document.getElementsByTagName("body")[0]       //Body tag for animation
const urlText=document.getElementById("search")         //TextBox for URL
const loadingOverlay = document.querySelector('.loading');
const controller = new AbortController()
// 5 second timeout:
const timeoutId = setTimeout(() => controller.abort(), 20000)


loadingOverlay.classList.add('hidden');
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
    toggleLoading();
    responseText.innerText="Loading..."
    fetch( 'https://phishshield.herokuapp.com/post?URL='+url,{signal:controller.signal} )
    .then( response => response.json() )
    .then( response => {
        if(response==1){
            toggleLoading()
        responseText.innerHTML="Hushhhhh! It's a<br><h2>Safe Website</h2>"
        bg.className="blink-bg-green"
    }
    else if(response==0){
        toggleLoading()
        responseText.innerHTML="Ummmm... I think it's <b>safe</b> but not into our Data Base<h2>Not recognized</h2>"
        bg.className="blink-bg-yellow"
    }
    else if(response==2){
        toggleLoading()
        responseText.innerHTML="<h2>Loading...</h2>"
    }
    else{
        toggleLoading()
        responseText.innerHTML="Okay. Wait. Think about it before visiting.<h2>Phishing website</h2>Assure that you recieved link from safe source"
        bg.className="blink-bg-red"
    }
    urlText.value=""
        
    } )
    .catch(error=>{
        toggleLoading()
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


function toggleLoading(){
  //if (event.keyCode !== 13) return;
  
  document.activeElement.blur();
  
  if (loadingOverlay.classList.contains('hidden')){
    loadingOverlay.classList.remove('hidden');
  } else {
    loadingOverlay.classList.add('hidden');
  }
}

//document.addEventListener('keydown', toggleLoading);