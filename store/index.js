export const strict = false

export const state = () => ({
    laws: []
})

export const getters = {
    readLaws(state){
        return state.laws
    },
}

export const mutations = {
    addLaws(state, payload){
        state.laws = payload
    }
}

export const actions = {
    async nuxtServerInit({commit}){
        console.log("Hola Nuxt Server Init")
        // return new Promise((resolve, reject) => {
            const client = this.app.apolloProvider.defaultClient
            const query = {
                query:require("../graphql/laws.gql")
            }

            await client.query(query).then(data => {
                commit('addLaws', data.data.laws)
                // resolve()
            }).catch(error => {
                console.log(error)
                // reject()
            })
        // })
    },
}