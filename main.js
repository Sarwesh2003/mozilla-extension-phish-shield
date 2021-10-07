const subButton=document.getElementById("sub")
const responseText=document.getElementById("res")
const backbtn=document.getElementById("back")
const bg=document.getElementsByTagName("body")[0]
const urlText=document.getElementById("search")
const input=document.getElementById("inputform")
//let res=true
/*subButton.onclick=function(){
    responseText.innerText="Hello"
    bg.className="blink-bg-yellow"
    let temp=document.getElementById("search").value
    console.log(temp)
}*/



//input.addEventListener("submit",(event))

function showResult(){
    responseText.innerText="Loading..."
    let url=urlText.value
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
        
    } );
    
}

responseText.innerText="Results will appear here"
urlText.addEventListener("keydown",e=>{
    if (e.key === 'Enter') {
        e.preventDefault();
        // Trigger the button element with a click
        showResult()
      }
})


subButton.onclick=function(){
    showResult()
    bg.className=""
}



