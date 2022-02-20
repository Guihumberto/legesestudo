<template>
    <div>
                <v-tabs v-model="tab">
                  <v-tab v-if="textquestions.length > 0">Questões</v-tab>
                  <v-tab v-if="textcomments.length > 0">Comentários</v-tab>
                  <v-spacer></v-spacer>
                  <v-btn icon color="error" @click="close"> <v-icon>mdi-close</v-icon></v-btn>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item v-if="textquestions.length > 0">
                    <v-card>
                      <v-card-text>
                            <v-alert dense type="info" class="mt-2" outlined>
                            {{questions.question_info.office}} - {{questions.question_info.institute}} - {{questions.question_info.year}} - <strong>{{questions.question_info.organizadora.name}}</strong>
                            </v-alert>
                            <p :style="{ fontSize: fontSizeProp + 'px'}" class="text-justify textQuestions">
                            {{questions.textQuestion}}
                            </p>
                            <v-card-actions v-if="resolution">
                                <v-btn small color="success" @click="resolutionClick(true, questions.response)">Certo</v-btn>
                                <v-btn small outlined color="success" @click="resolutionClick(false, questions.response)">Falso</v-btn>
                            </v-card-actions>
                            <v-card-actions v-else>
                                  <v-btn @click="resolution = !resolution" small text :color="texteResponseChoice == 'Resposta Correta' ? 'success':'error'"> 
                                    <v-icon>{{texteResponseChoice == 'Resposta Correta' ? 'mdi-check' : 'mdi-close'}}</v-icon> {{texteResponseChoice}}
                                  </v-btn>
                            </v-card-actions>
                            <v-card-actions class="text-center mb-2">
                            </v-card-actions>

                            <v-row justify="center">
                              <v-col cols="12" align="center">
                                <v-btn @click="prev" icon> <v-icon>mdi-arrow-left-drop-circle-outline</v-icon> </v-btn> 
                                {{pagination.page}} - {{pagination.totalQts}} 
                                <v-btn @click="next" icon> <v-icon>mdi-arrow-right-drop-circle-outline</v-icon> </v-btn>
                              </v-col>
                            </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-if="textcomments.length > 0">
                    <v-card>
                      <v-card-text v-for="comments in textcomments" :key="comments.comments">
                        <v-divider v-if="comments.type == 1"></v-divider>
                        <h2 v-if="comments.type == 1" class="mb-2">STF</h2>
                        <p v-if="comments.type == 1" v-html="comments.comments"></p>
                        <v-divider v-if="comments.type == 2"></v-divider>
                        <h2 v-if="comments.type == 2" class="my-2">STJ</h2>
                        <p v-if="comments.type == 2" v-html="comments.comments"></p>
                        <v-divider v-if="comments.type == 3"></v-divider>
                        <h2 v-if="comments.type == 3" class="my-2">Comentários</h2>
                        <p v-if="comments.type == 3" v-html="comments.comments"></p>
                        <v-divider v-if="comments.type == 4"></v-divider>
                        <h2 v-if="comments.type == 4" class="my-2">Jurisprudência</h2>
                        <p v-if="comments.type == 4" v-html="comments.comments"></p>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                </v-tabs-items>      
                <v-card-actions class="text-center mb-2">
                  <v-spacer></v-spacer>
                  <v-btn icon color="error" @click="close"> <v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
        </div>
</template>

<script>
export default {
    data(){
        return{
            tab: null,
             page: 1,
             resolution: true,
             fontSizeProp: 15,
             questionsComents: [],
             texteResponseChoice: '',
             pagination:{
               page: 1, 
               perpage: 1,
               totalQts: this.textquestions.length,
               pageIndex: 0
             }
        }
    },
    props:{
        textquestions: Object,
        textcomments: Object,
    },
    computed:{
        questions(){
            return this.textquestions[this.pagination.pageIndex]
        }
    },
    methods:{
        close(){
            this.$emit('close', false)
        },
        next(){
          this.resolution = true
          this.pagination.page++
          this.pagination.pageIndex++
          if(this.pagination.page > this.textquestions.length) {
            this.pagination.page--
            this.pagination.pageIndex--
          }
        },
        prev(){
          this.resolution = true
          this.pagination.page--
          this.pagination.pageIndex--
          if(this.pagination.page < 1) {
            this.pagination.page++
            this.pagination.pageIndex++
          }
        },
        resolutionClick(choice, response){
          this.resolution = false
          if(choice == response){
            this.texteResponseChoice = "Resposta Correta"
          }else{
            this.texteResponseChoice = "Resposta Errada."
          }
        }
    },
    // async fetch(){
    //   const client = this.$apollo.getClient()
    //   const id = 668
    //   const query = {
    //     query: require("../../graphql/questionsSingleTextLaw.gql"),
    //     variables:{id}
    //   }

    //   await client.query(query).then(data => {
    //     console.log(data)
    //     this.questionsComents = data.data.lawtext
    //   })
    // }
}
</script>