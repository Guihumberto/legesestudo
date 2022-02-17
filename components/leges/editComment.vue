<template>
    <div>
        <v-btn small icon> <v-icon color="primary" @click="dialog = true">mdi-pencil</v-icon> </v-btn>
        <v-dialog v-model="dialog" max-width="590">
            <v-card>
                <v-card-title class="headline">Editar Comentário</v-card-title>
                <v-card-text>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
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
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small color="success" @click="returnChoice(true)">Editar</v-btn>
                    <v-btn small outlined color="success"  @click="returnChoice(false)">Voltar</v-btn>
                </v-card-actions>
                {{comments}}
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            rules: { required: (value) => !!value || "Este campo é obrigatório"}, 
            comments:{
                id: parseInt(this.comment.id),
                comments: this.comment.comments,
                type: this.comment.type,
            }
        }
    },
    props:{
        comment: Object
    },
    methods:{
        returnChoice(choice){
            this.dialog = false
            this.$emit("comment", this.comments)
        }
    }
}
</script>