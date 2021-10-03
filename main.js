const subButton=document.getElementById("button")
const responseText=document.getElementById("result")
//let res=true

responseText.innerText="Results will appear here"
subButton.onclick=function(){
    responseText.innerText="Loading..."
    fetch( 'https://phishshield.herokuapp.com/post?URL=https://www.faceb0ok.com/' )
    .then( response => response.json() )
    .then( response => {
        // Do something with response.
        //res=response
        console.log(response)
        
        if(response==1){
            responseText.innerText="Safe Website"
        }
        else if(response==0){
            responseText.innerText="Not recognized"
        }
        else if(response==2){
            responseText.innerText="Loading..."
        }
        else{
            responseText.innerText="Phishing website"
        }
    } );
    


}



