<template>
    <v-row>
        <v-col cols="auto">
        <v-dialog
            transition="dialog-top-transition"
            max-width="800"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                x-small
                dense
                class="ml-2"
            >Gerar Doc</v-btn>
            </template>
            <template v-slot:default="dialog">
            <v-card>
                <v-toolbar
                color="primary"
                dark
                >Documento Gerado</v-toolbar>
                <v-card-text v-if="textSelect">
                    <v-list two-line v-for="(laws, index) in lawOrganize" :key="index">
                        <v-list-item-group multiple>
                            <h3 class="text--primary index-title">{{index}}</h3>
                            <template v-for="(law, index) in laws">   
                                <v-list-item :key="law.id">
                                        <v-list-item-action>
                                            <v-list-item-action-text v-text="`Art. ${law.art}`"></v-list-item-action-text>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <p class="text--primary text-justify textLaw" v-html="law.text"></p>
                                        </v-list-item-content>
                                </v-list-item>
                            <v-divider
                                v-if="index < laws.length - 1"
                                :key="index"
                            ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
                <v-card-text v-else>
                    <div class="text-h5 pa-12">Não há dispositivos selecionados!</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    >
                    <v-icon
                        left
                        dark
                        >
                            mdi-printer
                        </v-icon>
                    Imprimir
                    </v-btn>
                    <v-btn
                        outlined
                        @click="dialog.value = false"
                    >Fechar</v-btn>
                </v-card-actions>
            </v-card>
            </template>
        </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props:{
            textSelect: {
                required: true
            },
        },
        computed:{
            lawOrganize(){
              return this.textSelect.reduce(function(acumulador, text){
                  if(!acumulador[text.law.name]) {
                      acumulador[text.law.name] = []   
                  }
                  acumulador[text.law.name].push(text)
                  return acumulador
              }, {})
          },
        }
        
    }
</script>

<style scoped>
    .textLaw{
    font-family: 'Century Gothic', Courier, monospace;
    line-height: 1.7
    }

    .index-title{
        margin: 2px 0px;
        padding: 4px 4px;
        background-color: rgb(195, 195, 202);
    }
</style>