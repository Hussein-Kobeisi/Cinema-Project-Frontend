const errorMsg = document.getElementById("error");
const emailReg = 
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ;
const nameReg = /^[a-zA-Z0-9_]{3,20}$/;



document.getElementById("loginForm")
        .addEventListener("submit", function(event) {
            event.preventDefault();

            const data = new FormData(this);
            const name = data.get('usernameInput');
            const email = data.get('emailInput');

            //handle errors
            errorMsg.style.display = "inline-block";
            if(name=="" || email=="")
                errorMsg.innerHTML = "Please fill all the fields";
            else if(!name.toLowerCase().match(nameReg))
                errorMsg.innerHTML = "Please enter a valid Username between 3-20 characters";
            else if(!email.toLowerCase().match(emailReg))
                errorMsg.innerHTML = "Please enter a valid Email";
            else
                errorMsg.style.display = "none";

            if(errorMsg.style.display != "none")
                return;

            //else fecth data
                        
        })