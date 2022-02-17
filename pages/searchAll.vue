<template>
    <v-container>
        <v-card width="1080" min-height="580" class="mx-auto pa-2" flat>
            
            <search-form @search="searchField($event)" />
                
            <v-card class="mx-2" min-height="400" v-if="search.length != 0">
                <v-card-title>
                    <span v-if="searchResults.length">Resultados: {{searchResults.length}} dispositivos encontrados.</span>
                    
                    <search-createDoc :textSelect="textSelect" /> 
                    <v-btn text small @click="cleanResults"> limpar resultados </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-list two-line v-for="(laws, index) in lawOrganize" :key="index">
                        <v-list-item-group multiple>
                            <h3 class="text--primary">{{index}}</h3>
                            <template v-for="(law, index) in laws">   
                                <v-list-item :key="law.id">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                            <v-checkbox 
                                                :input-value="active"
                                                value="true"
                                                v-model="law.show"
                                                >
                                            </v-checkbox>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-tooltip bottom max-width="400">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-list-item-title v-bind="attrs"
                                                        v-on="on" class="text--primary" v-html="law.text">
                                                    </v-list-item-title>
                                                </template>
                                                <p v-show="law.text.length > 100" text-justify v-html="law.text"></p>
                                            </v-tooltip>
                                        </v-list-item-content>
                                        <v-tooltip top color="primary">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-list-item-action v-bind="attrs" v-on="on">
                                                        <v-list-item-action-text v-text="`Art. ${law.art}`"></v-list-item-action-text>
                                                        <v-btn icon small :to="{
                                                        name: 'leges',
                                                        params:{leges: law.art},
                                                        query:{id:law.law.id},  
                                                        }"><v-icon 
                                                        >mdi-book-arrow-right</v-icon></v-btn>
                                                    </v-list-item-action>
                                                </template>
                                                <span>ir para o artigo</span>
                                         </v-tooltip>
                                    </template>
                                </v-list-item>
                            <v-divider
                                v-if="index < laws.length - 1"
                                :key="index"
                            ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
            <v-card flat v-else>
                <v-card-text>
                    Faça sua busca na legislação
                </v-card-text>
            </v-card>
        </v-card>
    </v-container>
</template>

<script>
  import gql from "graphql-tag";

  export default {
      data(){
          return{
            search: "",
            subjects:[],
            selected: [2],
            lawOrg: [],
            show: true
          }
      },
      apollo: {
          searchResults: {
          query: gql`
            query($type:JSON $limit:Int $sort: String $start: Int $search: String) {
            lawtexts(
                sort: $sort
                where:{text_contains: $search, law: {subjects:{id:$type}}}
                limit: $limit
                start: $start
            ) {
                id
                art
                text
                show
                law {
                    id
                    law
                    nro_law
                    name
                        subjects{
                            id
                        }
                    }
                }
            }
          `,
          update: data => data.lawtexts,
          variables() {
            return {
              search: this.search.replace(/^[A-Za-z0-9]*\d+[A-Za-z0-9]*$/, ""),
              type: this.subjects
            };
          },
        },
      },
      computed:{
          lawOrganize(){
              return this.searchResults.reduce(function(acumulador, text){
                  if(!acumulador[text.law.name]) {
                      acumulador[text.law.name] = []   
                  }
                  acumulador[text.law.name].push(text)
                  return acumulador
              }, {})
          },
          textSelect(){
              let exp = new RegExp(true, "i")
              let size = this.searchResults.length
              if(size > 50) { this.errorSize(size) }
              return this.searchResults.filter(law => exp.test(law.show)) 
          }
      },
      methods:{
          searchField(index){
              this.subjects = index.fieldCheck
              return this.search = index.searchFieldWord
          },
          errorSize(index){
            this.$store.dispatch("snackbars/setSnackbars", {text:`Mais de ${index} resultados, refine sua busca!`, color:'success', timeout:'3000'})
          },
          cleanResults(){
              this.search = ''
              this.searchResults = []
              this.$store.dispatch("snackbars/setSnackbars", {text:'Resultados da pesquisa foram apagados.', color:'success', timeout:'3000'})
          }
      }
  }
</script>

<style scoped>
</style>