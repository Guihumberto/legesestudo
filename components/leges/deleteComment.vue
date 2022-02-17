<template>
    <div>
        <v-btn  color="error" icon @click="dialog = true"><v-icon>mdi-delete</v-icon></v-btn>
        <v-dialog v-model="dialog" max-width="590">
            <v-card>
                <v-card-title class="headline">Apagar Comentário</v-card-title>
                <v-card-text>
                    Deseja realmente apagar este comentário?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small color="error" @click="returnChoice(true)">Excluir</v-btn>
                    <v-btn small outlined color="error"  @click="returnChoice(false)">Voltar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false
        }
    },
    methods:{
        returnChoice(choice){
            this.dialog = false
            this.$emit("choice", choice)
        }
    }
}
</script>