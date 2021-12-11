const axios = require('axios');

const parameters = () => {
    return {
        api_key:'fPESW9Fpc4DsvZwXhYcD4ZcVqKWhb794',
        limit:10
    }
}
const giphy = async(q) => {
    try {
        const instance = axios.create({
            baseURL: 'https://api.giphy.com/v1/gifs/search',
            params:{...parameters(),q}
        })
        const {data} = (await instance.get()).data;
        const datos = data.map(dato => ({
            id: dato.id,
            title: dato.title,
            url : dato.url
        }))
        console.log(datos)
    } catch (error) {
        console.log(error)
    }
}
module.exports = giphy;