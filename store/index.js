export const strict = false

export const state = () => ({
    counter: 0,
    favorites: "sim"
})

export const getters = {
    readCounter(state){
        return state.counter
    },
    favorites(state){
        return state.favorites
    },
}

export const mutations = {
    increment(state){
        state.counter++
    }
}

export const actions = {
    increment(context){
        setTimeout(()=>{
            context.commit("increment")
        }, 1000)
    }
}