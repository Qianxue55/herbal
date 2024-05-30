
    function z(e,n,p,c){
        var len = document.getElementById(c).value.length
        var maxlen = document.getElementById(c).getAttribute("maxlength")
        if(len==maxlen){
            if(n!=='')
            {
                document.getElementById(n).focus();
            }
        }
        if(e.key === "Backspace")
        {
            if(p !== '')
            {
                document.getElementById(p).focus();
            }
        }
    }
    function x(e,n,p,c){
        var len = document.getElementById(c).value.length
        var maxlen = document.getElementById(c).getAttribute("maxlength")
        if(len==maxlen){
            if(n!=='')
            {
                document.getElementById(n).focus();
            }
        }
        if(e.key === "Backspace")
        {
            if(p !== '')
            {
                document.getElementById(p).focus();
            }
        }
    }


    document.addEventListener("DOMContentLoaded", function() {
        // Get the login button element
        var loginButton = document.querySelector('.header-login-btn');
        
        // Get the main login/signup section
        var mainLoginSection = document.getElementById('main');
        
        // Add click event listener to the login button
        loginButton.addEventListener('click', function() {
          // Toggle the display of the main login/signup section
          mainLoginSection.style.display = 'block';
        });
      });
      

    document.querySelector("#close").addEventListener("click",close)
    function close(){
        var main = document.querySelector("#main")
        main.style.display = "none"
    }
