<template>
    <v-card-text>
        <div v-for="text in textLaw" :key="text.id">
            <p v-html="text.text"></p>
        </div>
    </v-card-text>
</template>

<script>
    export default {
        data(){
            return{
                textLaw: []
            }
        },
        async fetch(){
            const client = this.$apollo.getClient()
            const id = 1
            const query = {
                query: require("../../graphql/textlawSingle.gql"),
                variables:{id}
            }

            await client.query(query).then(data => {
                this.textLaw = data.data.lawtexts
            })
        }
    }
</script>