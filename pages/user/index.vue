<template>
    <v-container>
        <v-card width="1080" class="mx-auto mb-3" flat>
            <v-card-title> <v-icon>mdi-tools</v-icon> Perfil e Favoritos</v-card-title>
            <v-card-subtitle>Favoritos</v-card-subtitle>
            <v-card-text>   
                <v-list two-line>
                    <v-list-item-group
                        v-model="selected"
                        active-class="pink--text"
                        multiple
                    >
                        <template v-for="(item, index) in favoritesTextLaw">
                        <v-list-item :key="item.id">
                            <template v-slot:default="{ active }">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.law.name"></v-list-item-title>

                                <v-list-item-subtitle
                                class="text--primary"
                                v-text="item.law.nro_law"
                                ></v-list-item-subtitle>
                                <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-list-item-action-text>art. {{item.art}}º</v-list-item-action-text>

                                <v-icon
                                v-if="!active"
                                color="grey lighten-1"
                                >
                                mdi-star-outline
                                </v-icon>

                                <v-icon
                                v-else
                                color="yellow darken-3"
                                >
                                mdi-star
                                </v-icon>
                            </v-list-item-action>
                            </template>
                        </v-list-item>

                        <v-divider
                            v-if="index < favoritesTextLaw.length - 1"
                            :key="index"
                        ></v-divider>
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
    data(){
        return{
            selected: [2],
        }
    },
    async asyncData({app, store}){
        let client = app.apolloProvider.defaultClient
        let id = app.$auth.user.id
        let query = {
            query: require("../../graphql/favoritesTextLaw.gql"),
            fetchPolicy: 'no-cache',
            variables:{id}
        }
        let favoritesTextLaw = null
        await client.query(query).then(data => {
            favoritesTextLaw = data.data.user.favoritesText;
            store.commit("user/setFavoritesText", favoritesText)
        }).catch(e => console.log(e))
        return{favoritesTextLaw}
    }
}
</script>