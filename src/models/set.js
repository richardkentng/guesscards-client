const urlApi = "http://localhost:4000" || "https://react-guesscards-api.herokuapp.com"

class SetModel {
    static all = () => {
        const fetchOptions = { headers: { authorization: `Bearer ${localStorage.uid}` }}
        const request = fetch(`${urlApi}/sets`, fetchOptions).then(res => res.json())
        return request
    }

    static show = (setId) => {
        const fetchOptions = { headers: { authorization: `Bearer ${localStorage.uid}` }}
        const request = fetch(`${urlApi}/sets/${setId}`, fetchOptions).then(res => res.json())
        return request
    }
    
    static edit = (setId, setName) => {
        const fetchOptions = { 
            method: "PUT",
            headers: { 
                "authorization": `Bearer ${localStorage.uid}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: setName})        }
        const request = fetch(`${urlApi}/sets/${setId}`, fetchOptions).then(res => res.json())
        return request
    }

    static create = (body) => {
        const fetchOptions = { 
            method: "POST",
            headers: { 
                "authorization": `Bearer ${localStorage.uid}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const request = fetch(`${urlApi}/sets`, fetchOptions).then(res => res.json())
        return request
    }

    static delete = (setId) => {
        const fetchOptions = { 
            method: "DELETE",
            headers: {"authorization": `Bearer ${localStorage.uid}`,}
        }
        const request = fetch(`${urlApi}/sets/${setId}`, fetchOptions).then(res => res.json())
        return request
    }

    static createFlashcard = (setId, body) => {
        const fetchOptions = { 
            method: "POST",
            headers: { 
                "authorization": `Bearer ${localStorage.uid}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const request = fetch(`${urlApi}/sets/${setId}/cards`, fetchOptions).then(res => res.json())
        return request
    }

    static editFlashcard = (setId, card) => {
        const fetchOptions = { 
            method: "PUT",
            headers: { 
                "authorization": `Bearer ${localStorage.uid}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)        }
        const request = fetch(`${urlApi}/sets/${setId}/cards/${card._id}`, fetchOptions).then(res => res.json())
        return request
    }

    static deleteFlashcard = (setId, cardId) => {
        const fetchOptions = { 
            method: "DELETE",
            headers: { 
                "authorization": `Bearer ${localStorage.uid}`,
                "Content-Type": "application/json"
            }
        }
        const request = fetch(`${urlApi}/sets/${setId}/cards/${cardId}`, fetchOptions).then(res => res.json())
        return request
    }
}

export default SetModel