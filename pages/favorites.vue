<template>
    <v-container>
        <v-card width="1080" class="mx-auto mb-3" flat>
            <v-card-title>Favoritos</v-card-title>
            <v-card-subtitle>Normas marcadas como favoritas.</v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item-group>
                        <template v-for="(fav, index) in favorites">
                            <v-list-item :key="fav.id" 
                            :to="{
                                name: 'leges',
                                params:{leges: false},
                                query:{id:fav.id}  
                                        }"
                            >
                                <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title>{{fav.name}}</v-list-item-title>
                                        <v-list-item-subtitle class="text--primary">{{fav.law}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{fav.description}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-list-item-action-text></v-list-item-action-text>
                                        <v-icon v-if="!active" color="yellow darken-3">mdi-star</v-icon>
                                        <v-icon v-else color="grey lighten-1">mdi-star-outline</v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                            <v-divider v-if="index < favorites.length - 1" :key="index"></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    middleware:'auth',
    async asyncData({app, store}){
        let client = app.apolloProvider.defaultClient
        let id = app.$auth.user.id
        let query = {
            query: require("../graphql/favoritesUser.gql"),
            fetchPolicy: 'no-cache',
            variables:{id}
        }
        let favorites = null
        await client.query(query).then(data => {
            favorites = data.data.user.favoritesLaw;
            store.commit("user/setFavorites", favorites)
        }).catch(e => console.log(e))
        return{favorites}
    }
}
</script>
