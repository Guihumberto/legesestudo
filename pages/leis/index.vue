<template>
    <v-container>
        <v-card width="1080" class="mx-auto mb-3" flat>
            <layout-breadcrumbs :law="infolaw.law" />
            <leis-menu-searchBar @sendSearch="dataTextLaw.art = $event" />
            <leis-content-titleLaw :infolaw="infolaw" />
            <leis-content-textLaw :textLawData="dataTextLaw" />
        </v-card>
    </v-container> 
</template>

<script>
    export default {
        data(){
            return{
                dataTextLaw:{
                    idLaw: 1,
                    start: 0,
                    limit: 10,
                    art: null,
                    word: ''
                }
            }
        },
        computed:{
            infolaw(){
                let laws = this.$store.getters.readLaws
                let lawSelect = ''
                laws.forEach(law => {
                    if(law.id == this.dataTextLaw.idLaw){
                    lawSelect = law
                    }
                })
                return lawSelect
            },
        }   
    }
</script>
<style scoped>

</style>