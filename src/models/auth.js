    const urlApi = "http://localhost:4000"

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

        static sayHi = () => {
            console.log('hi!');
        }
    }

    export default AuthModel