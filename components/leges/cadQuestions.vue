<template>
  <v-row justify="center">
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        max-height="1080"
      >
        <template v-slot:activator="{ on, attrs }">

        <v-btn
          x-small
          fab
          dark
          color="purple"
          v-bind="attrs"
          v-on="on"
        ><v-icon small>mdi-frequently-asked-questions</v-icon>
        </v-btn>

      </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-form @submit.prevent="onsubmit" ref="form">
            <v-toolbar
              color="primary"
              dark>Cadastrar Questões</v-toolbar>
              <v-card-subtitle :title="textData.art"><span v-html="textData.text"></span> </v-card-subtitle>
                <v-card-text>
                    <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-select
                              label="Prova"
                              outlined
                              v-model="question_info"
                              :items="questionInfos"
                              item-text="institute"
                              item-value='id'
                              dense
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                              <v-textarea
                              label="Texto da Questão"
                              required
                              dense
                              outlined
                              v-model="questions.textQuestion"
                              :rules="[rules.required]"
                              ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-radio-group v-model="questions.response">
                              <v-radio
                                label="Verdadeiro"
                                :value="response"
                              ></v-radio>
                              <v-radio
                                label="Falso"
                                :value="!response"
                              ></v-radio>
                            </v-radio-group>    
                          </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                    <v-card-actions class="justify-end mr-5">
                        <v-btn small color="success" type="submit">Salvar</v-btn>
                        <v-btn small color="success" outlined @click="dialog.value = false">Cancelar</v-btn>
                    </v-card-actions>
            </v-form>
            <v-card-text>
              <v-list dense>
                <v-subheader>QUESTÕES CADASTRADAS</v-subheader>
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in textData.questions"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.response"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.textQuestion"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-row align="center" justify="center">
                        <leges-editComment :comment="item" @comment="editQuestion($event)" />
                        <leges-deleteComment @choice="deleteQuestion($event, item.id)" />
                      </v-row>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>   
            </v-card-text>
                </v-card>
                </template>
            </v-dialog>
        </v-row>
</template>

<script>
  export default {
    data () {
      return {
        question_info: null,
        dialog: false,
        response: true,
        questionInfos: null,
        questions:{
          textQuestion: "",
          response: null,
        },
        rules: { required: (value) => !!value || "Este campo é obrigatório"}, 
        selectedItem: 1,
      }
    },
    props:{
      textData: {
        required: true
      },
    },
    methods:{
      onsubmit(){
        if (this.$refs.form.validate()) {

            this.questions["id"] = parseInt(this.textData.id)
            this.questions["question_info"] = parseInt(this.question_info)

            this.questions.textQuestion = this.questions.textQuestion.replace('\n', '<br><br>')

            this.$apollo.mutate({
            mutation:require('../../graphql/createQuestion.gql'),
            variables: this.questions,
            })
            .then(data => {
                console.log(data)
                this.textData.questions.push(this.questions)
                this.questions = []
            })
            .catch( e => {
                console.log(e)
            })
        }
      },
      deleteQuestion(choice, id){
        if(choice){
          this.$apollo.mutate({
            mutation:require('../../graphql/deleteQuestion.gql'),
            variables:{id}
          }).then(res => {
            console.log("Questao apagada")
            const idQuestion = this.textData.questions.find(question => question.id == id)
            const index = this.textData.questions.indexOf(idQuestion)
            this.textData.questions.splice(index, 1)
          })
        }
      },
      editQuestion(){
        console.log("editar questao")
      }
    },
    async fetch(){
      const client = this.$apollo.getClient()
      const query = {
        query: require("../../graphql/questionInfos.gql")
      }

      await client.query(query).then(data => {
        this.questionInfos = data.data.questionInfos
      })
    }
  }
</script>