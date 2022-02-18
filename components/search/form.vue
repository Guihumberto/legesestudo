<template>
    <v-card class="ma-2">
        <v-card-text>
            <v-text-field
                outlined
                dense
                label="Busca na legislação"
                v-model="filter.searchFieldWord"
            ></v-text-field>

            <v-expansion-panels
            v-model="panel"
            multiple
            >
                <v-expansion-panel>
                    <v-expansion-panel-header>Filtros</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row>
                            <v-col cols="12" sm="6" md="3" v-for="item in subjects" :key="item.id">
                                <v-checkbox
                                    v-model="filter.fieldCheck"
                                    :label="item.name"
                                    color="primary"
                                    :value="item.id"
                                    hide-details
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            
            
            <!-- <v-row justify="space-around" v-if="filter.fieldCheck.length > 0">
                <v-col
                cols="12"
                sm="12"
                md="12"
                >
                    <v-sheet
                        elevation="2"
                        class="py-4 px-1"
                    >
                        <v-chip-group
                        multiple
                        active-class="primary--text"
                        >
                            <v-chip
                                v-for="tag in filter.fieldCheck"
                                :key="tag"
                            >
                                {{ tag }}
                            </v-chip>
                        </v-chip-group>
                    </v-sheet>
                </v-col>
            </v-row> -->
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined @click="clearFields">Limpar</v-btn>
            <v-btn color="primary" @click="search">Buscar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
       data(){
           return{
               panel: false,
               filter: {
                   searchFieldWord:"",
                   fieldCheck:[]
               },
               subjects: []
           }
       },
       methods:{
           clearFields(){
               this.filter.searchFieldWord = ""
               this.filter.fieldCheck = [] 
           },
           search(){
               if(!this.filter.searchFieldWord){
                   this.$store.dispatch("snackbars/setSnackbars", {text:'Campo de busca está vazio', color:'error', timeout:'3000'})
               }
               else if(this.filter.searchFieldWord.length <=4){
                   this.$store.dispatch("snackbars/setSnackbars", {text:'Mínimo de 5 caracteres', color:'error', timeout:'3000'})
               }
               else {
                   this.$emit('search', this.filter)
               }
           }
       },
        async fetch(){
            const client = this.$apollo.getClient()
            const query = {
                query: require("../../graphql/subjects.gql"),
            }

            await client.query(query).then(data => {
                console.log(data)
                this.subjects = data.data.subjects
            })
        }
    }
</script>