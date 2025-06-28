const errorMsg = document.getElementById("error");
const succMsg = document.getElementById("success");
const emailReg = 
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ;
const nameReg = /^[a-zA-Z0-9_]{3,20}$/;
const phpControllers = "http://localhost/Cinema-Project/Cinema-Project-Backend/Controllers/";


document.getElementById("loginForm")
        .addEventListener("submit", function(event) {
            event.preventDefault();

            const data = new FormData(this);
            const name = data.get('usernameInput');
            const email = data.get('emailInput').toLowerCase();

            //handle errors
            succMsg.style.display = "none";
            errorMsg.style.display = "inline-block";
            if(name=="" || email=="")
                errorMsg.innerHTML = "Please fill all the fields";
            else if(!name.toLowerCase().match(nameReg))
                errorMsg.innerHTML = "Please enter a valid Username between 3-20 characters";
            else if(!email.match(emailReg))
                errorMsg.innerHTML = "Please enter a valid Email";
            else
                errorMsg.style.display = "none";

            if(errorMsg.style.display != "none")
                return;

            //else fecth data
            if(event.submitter.value === "Login"){
                axios.get(phpControllers+"get_users.php?email="+email)
                .then((res) => {
                    console.log(res.data);
                    
                    if(res.data.status == "404"){
                        errorMsg.style.display = "inline-block";
                        errorMsg.innerHTML = "User not found";
                        return;
                    }

                    succMsg.style.display = "inline-block";
                    succMsg.innerHTML = "Successful Login!";
                    })
                .catch((err) => console.log(err));
            }else if(event.submitter.value === "Sign Up"){
                errorMsg.style.display = "inline-block";
                errorMsg.innerHTML = "Sign up out of service";
            }
        })