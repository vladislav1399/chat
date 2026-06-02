const checkToken =  async () => {

    const token = localStorage.getItem('token');
        if(token) {
            const response = await fetch('/token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200) {
                console.log(window.location.pathname)
                console.log("Token has been valid")
                if(window.location.pathname === "/register" || window.location.pathname === "/login" ) {
                    window.location.href = "/"
                }
            } else {
                window.localStorage.removeItem("token");
                window.location.href = "/login";
         }

    } else {
            if(window.location.pathname === "/") {
                window.location.href = "/login"
            }
        }
}

checkToken()
