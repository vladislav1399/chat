const checkToken =  async () => {
    const token = localStorage.getItem('token');
    console.log(token)
if(token) {
   const response = await fetch('/token', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
   if(response.status === 200) {
       console.log(response)
   } else {
       window.location.href = "/auth";
   }

} else {
    window.location.href = "/auth";
    }

}

checkToken()


// const jwt = require('jsonwebtoken');
//
// wsServer.on('connection', (ws, req) => {
//
//     const params = new URL(
//         req.url,
//         'http://localhost'
//     );
//
//     const token =
//         params.searchParams.get('token');
//
//     try {
//
//         const user = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );
//
//         ws.user = user;
//
//         console.log(
//             `Connected: ${user.login}`
//         );
//
//     } catch {
//
//         ws.close();
//
//         return;
//     }
//
// });
