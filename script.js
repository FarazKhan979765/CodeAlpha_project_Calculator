// Selecting the input/display area and all button elements of the calculator
let display = document.querySelector(".display");
let buttons= document.querySelectorAll("button");
const operators= ["+","-","*","/"];
let currentinput="";
display.value="";
// Defining keys allowed from the keyboard including digits, operators, and controls
const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","+", "-", "*", "/", ".", "Backspace", "Delete", "Enter","ArrowLeft","ArrowRight"];
  
// -----------Dark Mode Section--------------

// Selecting the theme toggle button and  the main calculator container
let themebutton=  document.getElementById("theme");
let calculator= document.querySelector(".calculator");
let body= document.body;

// Event listener for theme switch
themebutton.addEventListener("click",()=>{
    
    // Toggle the 'dark' class for both calculator and body
    calculator.classList.toggle("dark");
    body.classList.toggle("dark");
    
    // Change button text depending on current theme
    if(body.classList.contains("dark")){
        themebutton.innerText="Light";
    }
    else{
        themebutton.innerText="Dark";
    }
});


// Calculator Functionality, Function to Evaluate the Expression
function caleval(){ 
    if(currentinput===""){
        return;
    }
    else{
        try{
            let result= eval(currentinput);

            // If result is a float, limit it to 2 decimal places
            if(result % 1 !== 0){
                result=result.toFixed(2);
            }
            currentinput=result.toString();
        }
        catch{
            currentinput="E";
        }
        display.value=currentinput;
    }
}

//------------Button Click Logic-------------

// Add click event listeners to all calculator buttons
buttons.forEach((button) => {
    button.addEventListener("click",()=>{
        const buttontext = button.innerText;  // Capture the text inside the button clicked
        if(currentinput==="00" || currentinput==="E"){
            currentinput="";
            display.value=currentinput;
        }
        else if(buttontext==="Dark" || buttontext==="Light"){
            return;
        }

        // AC button clears all input
        else if(buttontext==="AC"){
            currentinput="";
            display.value=currentinput;
        }

        // DEL button removes last character
        else if(buttontext==="DEL"){
            currentinput=currentinput.slice(0,-1);
            display.value=currentinput;
        }
        else if(buttontext==="="){
            caleval();
        }
        else if(operators.includes(buttontext)){
            // It allows us to input the "-" at the start of operation (a negative number)
            if(currentinput==="" && buttontext==="-"){
                currentinput+=buttontext;
                display.value=currentinput;
                return;
            }

            // Prevents operators at the beginning except minus.
            if(currentinput===""){
                return;
            }

            // Preventing double operators to be clicked at one time (like ++, **, etc.)
            const lastchar=currentinput.slice(-1);
            if(operators.includes(lastchar))
                return;
            
            currentinput+=buttontext;
            display.value=currentinput;
        }          
        else{
            // If dot/decimal is clicked first, prefix it with zero(0)
            if(buttontext==="." && currentinput===""){
                currentinput="0.";
                display.value=currentinput;
                return;
            }

            // If dot/decimal is comes after the operator then also prefix it with zero(0)
            if (buttontext === "." && operators.includes(currentinput.slice(-1))) {
                currentinput += "0.";
                display.value = currentinput;
                return;
            }
            if (buttontext === "." && currentinput.includes(".")) {
                return; // Prevent multiple decimal points in the single number
            }
            currentinput+=buttontext; 
            display.value=currentinput;
        }
    });  
});


//-----------Keyboard Input Listener-------------

document.addEventListener("keydown",(event)=>{
    const key=event.key;
    // If  the key is not from allowedKeys then block it and exit
    if(!allowedKeys.includes(key)){
        event.preventDefault();
        return;
    }

    // If Enter is pressed then shift the focus to the equals button and Call the evaluation function and evaluate it.
    if(key==="Enter"){
        document.getElementById("equal").focus();
        caleval();
    }
    else if(key>=0 && key<=9 || operators.includes(key)){
        event.preventDefault();  // Prevent any unwanted default behavior of browser
        currentinput+=key;
        display.value=currentinput;
    }

     // If Backspace is pressed, delete last character
    else if(key==="Backspace"){
        event.preventDefault();// Prevent any unwanted default behavior of browser
        currentinput=currentinput.slice(0,-1);
        display.value=currentinput;
    }

    else if(key==="Delete"){
        event.preventDefault();
        currentinput="";
        display.value=currentinput;
    }
});

//  Cadillac CT5-V Blackwing




