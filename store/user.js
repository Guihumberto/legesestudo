export const state = () => ({
    favorites: null,
    favoritesText: null
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
    },
    favoritesText(state){
        return state.favoritesText
    },
    favoritesTextGQL(state){
        let favoritesText = []
        if (Array.isArray(state.favoritesText)){
            favoritesText =  state.favoritesText.map(fav => fav.id)
        }
        return favoritesText
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
    },
    setFavoritesText(state, payload){
        state.favoritesText = payload
    },
    addLawFavText(state, payload){
        state.favoritesText.push(payload)
    },
    removeLawFavText(state, id){
        const law = state.favoritesText.find(law => law.id == id)
        const index = state.favoritesText.indexOf(law)
        state.favoritesText.splice(index, 1)
    },
    resetTextLawFav(state){
        state.favoritesText = null
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
    },
    async getFavoritesText({commit}){
        let client = this.app.apolloProvider.defaultClient
        let id = 1
        const query = {
            query:require("../graphql/favoritesTextLaw.gql"),
            fetchPolicy:"no-cache",
            variables:{id}
        }
        await client.query(query).then(data =>{
            commit("setFavoritesText", data.data.user.favoritesText)
        }).catch(e => console.log("erro"))
    }
  }