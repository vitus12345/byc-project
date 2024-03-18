

$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  dots:false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:3
      }
  }
})

function showSearch(event) {
    event.preventDefault();
    const getSearch = document.querySelector(".has-search");
    const getLogo = document.querySelector(".byclogo");
    const searchIcon = document.querySelector(".si");
    
    getSearch.style.display = "block";
    searchIcon.style.display = "none";
    getLogo.style.display = "none"
};


function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.querySelector(".toggle-password i");
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  };


  // login function...................................

  function logIn(event){
    event.preventDefault();

    const getSpin = document.querySelector(".round");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
    console.log(getEmail, getPassword)

    if(getEmail === "" || getPassword === ""){
        Swal.fire({
            icon: "info",
            text: "All Fields are Required!",
            confirmButtonColor: "#D7000F",
          });
          getSpin.style.display = "none"
    }

    else{
        const myHeader = new Headers();

        myHeader.append("Content-Type", "application/json");

        const profile = JSON.stringify({
            "email": getEmail,
            "password" :getPassword
        })

        const signMethod = {
            method: "POST",
            headers: myHeader,
            body: profile
        };
        const url = "http://localhost:4000/api/auths";

        fetch(url , signMethod)
        .then((response) => response.json())
        .then((result) =>{
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result));

            if(result.user.hasOwnProperty("email")){
                Swal.fire({
                    icon: "success",
                    text: `${result.message}`,
                    confirmButtonColor: "#D7000F",
                });

                setTimeout(() => {
                  location.href = "allProduct.html";
                }, 3000)
            }
            else{
                Swal.fire({
                    icon: "info",
                    text: "Login Unsuccessful!",
                    confirmButtonColor: "#D7000F",
                });
                getSpin.style.display = "none"
            }
        })
        .catch((error) => console.log("error", error));
    }

}




// const paymentForm = document.getElementById('paymentForm');
// paymentForm.addEventListener("submit", payWithPaystack, false);

// function payWithPaystack(e) {
//   e.preventDefault();

//   let handler = PaystackPop.setup({
//     key: 'pk_test_xxxxxxxxxx', // Replace with your public key
//     email: document.getElementById("email-address").value,
//     amount: document.getElementById("amount").value * 100,
//     currency:"NGN",
//     ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
//     // label: "Optional string that replaces customer email"
//     onClose: function(){
//       alert('Window closed.');
//     },
//     callback: function(response){
//       let message = 'Payment complete! Reference: ' + response.reference;
//       alert(message);
//     }
//   });

//   handler.openIframe();
// }
