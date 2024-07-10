async function handler(request, response) {
    const data = {
        "name": "Pollabot",
        "email": "pollabot@gmail.com",
        "ci": "12345678",
        "password": "123456",
        "phone": "04141234567",
        "repassword": "123456"
    }
    const url = "https://backend-lapolla.vercel.app/api/v1/register"
    const apiRes = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const jsonApiRes = await apiRes.json()
    console.log(jsonApiRes)
   
    return response.json({ jsonApiRes });
  }

  module.exports = handler