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
              dark>Cadastrar Comentários</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                            :items="['', 1, 2, 3, 4]"
                            label="Comentário"
                            required
                            v-model="comments.type"
                            :rules="[rules.required]"
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                            label="Comentários"
                            required
                            dense
                            outlined
                            v-model="comments.comments"
                            :rules="[rules.required]"
                            ></v-textarea>
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
                <v-subheader>COMENTÁRIOS CADASTRADOS</v-subheader>
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in commentList"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.type"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.comments"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-row align="center" justify="center">
                        <leges-editComment :comment="item" @comment="editComment($event)" />
                        <leges-deleteComment @choice="deleteComment($event, item.id)" />
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
        dialog: false,
        comments:{
          comments: "",
          type: "",
        },
        rules: { required: (value) => !!value || "Este campo é obrigatório"}, 
        selectedItem: 1,
      }
    },
    props:{
      id: {
        required: true
      },
      commentList:{
        required: false
      },
    },
    methods:{
      onsubmit(){
        if (this.$refs.form.validate()) {

            this.comments["id"] = this.id

            this.comments.comments = this.comments.comments.replace('\n', '<br><br>')

            this.dialog = false

            this.$apollo.mutate({
            mutation:require('../../graphql/createComments.gql'),
            variables: this.comments,
            })
            .then(data => {
                console.log(data)
                this.commentList.push(this.comments)
                this.comments = []
            })
            .catch( e => {
                console.log(e)
            })
        }
      },
      deleteComment(choice, id){
        if(choice){
          this.$apollo.mutate({
            mutation:require('../../graphql/deleteComment.gql'),
            variables:{id}
          }).then(res => {
            console.log("item apagado")
            const idComment = this.commentList.find(comment => comment.id == id)
            const index = this.commentList.indexOf(idComment)
            this.commentList.splice(index, 1)
          })
        }
      },
      editComment(comment){
        if(comment){
          this.$apollo.mutate({
            mutation:require('../../graphql/editComment.gql'),
            variables:{comment}
          }).then((data) => {
          console.log(data)
          })
        }
      }
    }
  }
</script>