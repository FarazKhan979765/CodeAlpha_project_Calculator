let display = document.querySelector(".display");
let buttons= document.querySelectorAll("button");
const operators= ["+","-","*","/"];
let currentinput="";
display.value="0";

document.addEventListener("keydown",(event)=>{
});


// dark mode
let themebutton=  document.getElementById("theme");
let calculator= document.querySelector(".calculator");
let body= document.body;

themebutton.addEventListener("click",()=>{

    calculator.classList.toggle("dark");
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        themebutton.innerText="Light";
    }
    else{
        themebutton.innerText="Dark";
    }
});

buttons.forEach((button) => {
    button.addEventListener("click",()=>{
        
        const buttontext = button.innerText;

        // if(currentinput==="Error;"){
        //     currentinput="";
        //     display.value=currentinput;
        // }

        // if(currentinput==="0" || currentinput==="00" || currentinput==="Error;"){
        if(currentinput==="00" || currentinput==="Error;"){
            currentinput="0";
            display.value=currentinput;
        }

        // if(currentinput==="00"){
        //     currentinput="0";
        //     display.value=currentinput;
        // }
        else if(buttontext==="Dark" || buttontext==="Light"){
            return;
        }
        else if(buttontext==="AC"){
            currentinput="";
            display.value=currentinput;
        }
        else if(buttontext==="DEL"){
            currentinput=currentinput.slice(0,-1);
            display.value=currentinput;
        }
        else if(buttontext==="="){
            if(currentinput===""){
                return;
            }
            else{
                try{
                    let result= eval(currentinput);
                    if(result % 1 !== 0){
                        result=result.toFixed(2);
                    }
                    currentinput=result.toString();
                    // currentinput=eval(currentinput).toString();
                    // if(eval(currentinput) % 1 !==0){
                    //     currentinput=eval(currentinput).toFixed(2);
                    // }
                }
                catch{
                    currentinput="Error;";
                }
                display.value=currentinput;
                
            } 
        }
        else if(operators.includes(buttontext)){
            // it allows us to input the "-" at the start of operation (a negative number)
            if(currentinput==="" && buttontext==="-"){
                currentinput+=buttontext;
                display.value=currentinput;
                return;
            }
            if(currentinput===""){
                return;
            }
            const lastchar=currentinput.slice(-1);
            if(operators.includes(lastchar))
                return;
            
            currentinput+=buttontext;
            display.value=currentinput;
        }          
        else{

            if(buttontext==="." && currentinput===""){
                currentinput="0.";
                display.value=currentinput;
                return;
            }

            if (buttontext === "." && operators.includes(currentinput.slice(-1))) {
                currentinput += "0.";
                display.value = currentinput;
                return;
            }

            if (buttontext === "." && currentinput.includes(".")) {
                return; // Prevent multiple decimal points
            }
            currentinput+=buttontext; 
            display.value=currentinput;
        }
    });  
});

