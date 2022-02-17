<template>
    <v-card max-width="1080" min-height="700" class="mx-auto pa-10">
        <h2 class="mb-5">Update Leis</h2>
        <v-form @submit.prevent="onsubmit" ref="form">
            <v-select
            label="Lei"
            outlined
            v-model="lawdata.law"
            :items="laws"
            item-text="name"
            item-value="id"
            :rules="[rules.required]"
            dense
            ></v-select>
            <div class="d-flex">
            <v-text-field
            class="pr-2"
            label="id inicio"
            v-model="lawdata.idstart"
            :rules="[rules.required]"    
            outlined
            dense
            ></v-text-field>
            <v-text-field
            label="id final"
            v-model="lawdata.idend"
            :rules="[rules.required]"    
            outlined
            dense
            ></v-text-field>
            </div>
            <div>{{lawdata}}</div>
            <v-btn type="submit" color="success">Alterar</v-btn>
            <v-btn color="success" @click="clearField" outlined>Limpar</v-btn>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                lawdata: {
                    idstart: "",
                    idend: "",
                    law: ""
                },
                rules: {
                    required: (value) => !!value || "Este campo é obrigatório",
                },     
            }
        },

        methods: {
            async onsubmit(){
            if (this.$refs.form.validate()) {
                this.lawdata.law = Number(this.lawdata.law)
                
                    for( let id = this.lawdata.idstart; id <=  this.lawdata.idend; id++) {
                                          
                                this.$apollo.mutate({
                                mutation:require('../graphql/updateLawText.gql'),
                                variables: (id, this.lawdata.law)
                                })
                                .then(data => {
                                    console.log(data)
                                })
                                .catch( e => {
                                    console.log(e)
                                })
                                
                    }
                }
            },

            clearField(){
                this.lawdata.law = "",
                this.lawdata.idstart = "",
                this.lawdata.idend = ""
            }
        },
        
        async asyncData(context){
            const client = context.app.apolloProvider.defaultClient
            
            const query = {
            query:require("../graphql/laws.gql")
            }

            let laws = []
            await client.query(query).then(data => {
            console.log(data)
            laws = data.data.laws
            })

            return{ laws }
        }
    }
</script>