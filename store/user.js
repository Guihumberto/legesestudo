export const state = () => ({
    favorites: null
 })
 
 export const getters = {
    favorites(state){
        return state.favorites
    },
    favoritesGQL(state){
        let favorites = []
        if (Array.isArray(state.favorites)){
            favorites =  state.favorites.map(fav => fav.id)
        }
        return favorites
    }
}

export const mutations = {
    setFavorites(state, payload){
        state.favorites = payload
    },
    addLawFav(state, payload){
        state.favorites.push(payload)
    },
    removeLawFav(state, id){
        const law = state.favorites.find(law => law.id == id)
        const index = state.favorites.indexOf(law)
        state.favorites.splice(index, 1)
    },
    resetFav(state){
        state.favorites = null
    }
}

export const actions = {
    async getFavorites({commit}){
        let client = this.app.apolloProvider.defaultClient
        let id = 1
        const query = {
            query:require("../graphql/favoritesUser.gql"),
            fetchPolicy:"no-cache",
            variables:{id}
        }
        await client.query(query).then(data =>{
            commit("setFavorites", data.data.user.favoritesLaw)
        }).catch(e => console.log("erro"))
    }
  }