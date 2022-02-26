<template>
        <v-card-text>
            <v-btn @click="art = 4">click</v-btn>
            <div v-for="text in textsLaw" :key="text.id">
                <div>
                    <p class="textLaw" v-html="text.text"></p>
                </div>
            </div>
        </v-card-text>
</template>

<script>
    export default {
        data(){
            return{
                textsLaw: [],
                dataTextLaw:{
                    idLaw: this.textLawData.idLaw,
                    start: this.textLawData.start,
                    limit: this.textLawData.limit,
                },
                art: null
            }
        },
        props:{
            textLawData: Object
        },
        async fetch(){
            if(this.art > 0){
                const client = this.$apollo.getClient()
                const idLaw = this.dataTextLaw.idLaw
                let limit = this.dataTextLaw.limit
                let start = this.dataTextLaw.start
                let art = this.art
    
                const query = {
                    query: require("../../../graphql/aTextLaw.gql"),
                        variables:{idLaw, limit, start, art}    
                }
                await client.query(query).then(data => {
                    this.textsLaw = data.data.lawtexts
                })
            } else {
                const client = this.$apollo.getClient()
                const idLaw = this.dataTextLaw.idLaw
                let limit = this.dataTextLaw.limit
                let start = this.dataTextLaw.start
    
                const query = {
                    query: require("../../../graphql/aTextLaw.gql"),
                        variables:{idLaw, limit, start}    
                }
                await client.query(query).then(data => {
                    this.textsLaw = data.data.lawtexts
                })
            }

        }
    }
</script>

<style scoped>
.textLaw{
    line-height: 1.7;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    text-align: justify;
}

</style>