    require('dotenv').config()
    const urlApi = process.env.REACT_APP_URL_API || "http://localhost:4000"

    class AuthModel {
        static signup = (body) => {
            const fetchOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            let request = fetch(`${urlApi}/auth/signup`, fetchOptions).then(res => res.json())
            return request
        }
        static login = (body) => {
            const fetchOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            let request = fetch(`${urlApi}/auth/login`, fetchOptions).then(res => res.json())
            return request
        }

        static verify = () => {
            const fetchOptions = {
                method: "GET",
                headers: { authorization: `Bearer ${localStorage.uid}` }
            }
            let request = fetch(`${urlApi}/auth/verify`, fetchOptions).then(res => res.json())
            return request
        }
    }

    export default AuthModel