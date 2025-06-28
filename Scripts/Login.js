const errorMsg = document.getElementById("error");
const succMsg = document.getElementById("success");
const emailReg = 
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ;
const nameReg = /^[a-zA-Z0-9_]{3,20}$/;
const phpControllers = "http://localhost/Cinema-Project/Cinema-Project-Backend/Controllers/";
const MoviePageHTML = "../Pages/Movie.html";


document.getElementById("loginForm")
        .addEventListener("submit", function(event) {
            event.preventDefault();

            const data = new FormData(this);
            const name = data.get('usernameInput');
            const email = data.get('emailInput').toLowerCase();

            //handle errors
            hideSucc();
            if(name=="" || email=="")
                showError("Please fill all the fields");
            else if(!name.toLowerCase().match(nameReg))
                showError("Please enter a valid Username between 3-20 characters");
            else if(!email.match(emailReg))
                showError("Please enter a valid Email");
            else
                hideError();

            if(errorMsg.style.display != "none")
                return;

            //handle Login
            if(event.submitter.value === "Login"){
                axios.get(phpControllers+"get_users.php?email="+email)
                .then((res) => {
                    console.log(res.data);
                    
                    if(res.data.status == "404"){
                        showError("User not found");
                        return;
                    }

                    showSucc("Successful Login!");
                    window.location.href = MoviePageHTML;
                    })
                .catch((err) => console.log(err));
            }
            
            //handle Sign Up
            else if(event.submitter.value === "Sign Up"){
                axios.post(phpControllers+"create_users.php",{email: email, name: name})
                .then((res) => {
                    console.log(res.data);
                    showSucc("Sign Up Successful!");
                    window.location.href = MoviePageHTML;
                    })
                .catch((err) => {
                    if(err.response.data.error == "Duplicate Entry"){
                        console.log("Error: Duplicate entry");
                        showError("User Already Exists");
                    }else{
                        console.log(err);
                        showError("Failed");
                    }
                })
            }
        })

function showError(msg){
    errorMsg.style.display = "inline-block";
    errorMsg.innerHTML = msg;
}

function showSucc(msg){
    succMsg.style.display = "inline-block";
    succMsg.innerHTML = msg;
}

function hideError(){
    errorMsg.style.display = "none";
}

function hideSucc(){
    succMsg.style.display = "none";
}