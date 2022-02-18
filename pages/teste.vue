<template>
    <v-card max-width="1080" min-height="700" class="mx-auto pa-10">
        <h2 class="mb-5">Importar Lei</h2>
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
            <v-textarea
            label="texto da lei"
            v-model="textLaw"
            :rules="[rules.required]"    
            outlined
            dense
            ></v-textarea>
            <v-btn type="submit" color="success">Converter</v-btn>
            <v-btn color="success" @click="clearField" outlined>Limpar</v-btn>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        middleware:'auth',
        data(){
            return{
                textLaw: "",
                lawdata: {
                    art: "",
                    law: "",
                   // text_law:"",
                    text: "",
                    org: 1,
                    //filtrado: ""
                },
                rules: {
                    required: (value) => !!value || "Este campo é obrigatório",
                },     
            }
        },

        computed: {

        },

        methods: {
            async onsubmit(){
            if (this.$refs.form.validate()) {
                this.lawdata.law = Number(this.lawdata.law)
                const separador = /\n/;
                this.textLaw = this.textLaw.split(separador)
                this.textLaw = this.textLaw.filter(i => i.trim())

                let title = []
                let titleComplete = ""
                
                    this.textLaw.forEach( i => {

                        this.lawdata.text = i.trim()

                        let start = ["1)", "2)", "3)", "4)", "5)", "6)", "7)", "8)", "9)", "1-", "2-", "3-", "4-", "5-", "6-", "7-", "8-", "9-", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "1 ", "2 ", "3 ", "4 ", "5 ", "6 ", "7 ", "8 ", "9 ", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "Ar", "ar", "Ar", "ar", "§ ", "§1", "§2", "§3", "§4", "§5", "§6", "§7", "§8", "§9", "a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)", "k)", "l)", "m)", "n)", "o)", "p)", "q)", "r)", "s)", "t)", "u)", "v)", "x)", "z)", "w)", "y)", "Pa", "Pa", "pa", "pa", "I-", "I ", "II ", "II", "IV", "V ", "VI", "VII", "VIII", "IX", "X ", "XI", "XV", "XX", "XL", "L ", "L-", "LI", "LV", "LX"]   
                        const titulo = ["livro", "títul", "titul", "capít", "capit", "seção", "seçao", "secça", "secçã", "subse"]

            
                        if(this.lawdata.text.toLowerCase().startsWith('livro') || this.lawdata.text.toLowerCase().startsWith('títul') || 
                        this.lawdata.text.toLowerCase().startsWith('titul') || this.lawdata.text.toLowerCase().startsWith('capít') || 
                        this.lawdata.text.toLowerCase().startsWith('capit') || this.lawdata.text.toLowerCase().startsWith('seção') || 
                        this.lawdata.text.toLowerCase().startsWith('seçao') || this.lawdata.text.toLowerCase().startsWith('secça') || 
                        this.lawdata.text.toLowerCase().startsWith('secçã') || this.lawdata.text.toLowerCase().startsWith('subse')
                        ){
                            if(!this.lawdata.structura){
                                 this.lawdata.art ? this.lawdata.art++ : this.lawdata.art = 1
                            }
                            
                            this.lawdata.structura = true

                            title.push(this.lawdata.text)
                        }
                
                        else if(!start.includes(this.lawdata.text.substr(0, 2))){                           
 
                            if(title){
                                title.push(this.lawdata.text)
                                titleComplete = title.join(' - ')
                            } else {
                                if(this.lawdata.text.toLowerCase().startsWith('disposição') || 
                                this.lawdata.text.toLowerCase().startsWith('disposições')){
                                    if(!this.lawdata.structura){
                                        this.lawdata.art ? this.lawdata.art++ : this.lawdata.art = 1
                                    }
                                    titleComplete = this.lawdata.text
                                    this.lawdata.structura = true
                                }
                            }    

                            if(titleComplete){

                                this.lawdata.text = titleComplete

                                let titu = this.lawdata.text.substr(0,5).toLowerCase()

                                    switch(titu){
                                        case 'dispo':
                                                this.lawdata.org = 0;
                                                break;
                                        case 'livro':
                                                this.lawdata.org = 1;
                                                break;
                                        case 'títul':
                                        case 'titul':
                                                this.lawdata.org = 2;
                                                break;
                                        case 'capít':
                                        case 'capit':
                                                this.lawdata.org = 3;
                                                break;
                                        case 'seção':
                                        case 'seçao':
                                        case 'secça':
                                        case 'secçã':
                                                this.lawdata.org = 4;
                                                break;
                                        case 'subse':
                                                this.lawdata.org = 5;
                                                break;
                                    }
                                
                                this.$apollo.mutate({
                                mutation:require('../graphql/createLawText.gql'),
                                variables: this.lawdata
                                })
                                .then(data => {
                                    console.log(data)
                                })
                                .catch( e => {
                                    console.log(e)
                                })

                                title = []
                                titleComplete = ""
                            }
                        }           
                                     
                        else if (start.includes(this.lawdata.text.substr(0, 2))){

                            this.lawdata.structura = false

                            if(this.lawdata.text.startsWith("Art.")) {

                                this.lawdata.art = parseInt(this.lawdata.text.substr(0, 10).replace(/[^0-9]/g,''))

                                if(this.lawdata.text.substr(5, 5).includes("º")){
                                    this.lawdata.text = this.lawdata.text.split("º")
                                    this.lawdata.text[0] = "<b>" + this.lawdata.text[0] + "</b>"
                                    this.lawdata.text = this.lawdata.text.join("º")
                                }else{
                                    this.lawdata.text = this.lawdata.text.split(".")
                                    this.lawdata.text[0] = "<b>" + this.lawdata.text[0]
                                    this.lawdata.text[1] = this.lawdata.text[1] + "</b>"
                                    this.lawdata.text = this.lawdata.text.join(".")
                                } 
                                
                             
                                let startLetter = ["-A<", "-A</", "-B<", "-B</", "-C<", "-C</", "-D<", "-D</", "-E<", "-E</", "-F<", "-F</", "-G<", "-H</", "-I<", "-I</", "-J<", "-J</", "-K<", "-K</", "-L<", "-L</", "-A.", "-A.", "-A", "-B", "-C", "-D", "-E", "-F", "-G", "-H", "-I", "-J", "-K", "-L","-M", "-N", "-O", "-P", "-Q", "-R", "-S", "-T", "-U", "-V", "-X", "-Z", "-Y", "-W", "-a", "-b", "-c", "-d", "-e", "-f", "-g", "-h", "-i", "-j", "-k", "-l", "-m", "-n", "-o", "-p", "-q", "-r", "-s", "-t", "-u", "-v", "-x", "-z", "-y", "-w"]

                                if(startLetter.includes(this.lawdata.text.substr(8,5).replace(/[0-9]/g, ""))){
                                    let ref = this.lawdata.text.substr(8,5).replace(/[0-9]/g, "")
                                    ref = ref.replace(/[^A-Za]/g,'')

                                    switch (ref) {
                                        case 'A':
                                            this.lawdata.org = 100;
                                            break;
                                        case 'B':
                                            this.lawdata.org = 200;
                                            break;
                                        case 'C':
                                            this.lawdata.org = 300;
                                            break;
                                        case 'D':
                                            this.lawdata.org = 400;
                                            break;
                                        case 'E':
                                            this.lawdata.org = 500;
                                            break;
                                        case 'F':
                                            this.lawdata.org = 600;
                                            break;
                                        case 'G':
                                            this.lawdata.org = 700;
                                            break;
                                        case 'H':
                                            this.lawdata.org = 800;
                                            break;
                                        case 'I':
                                            this.lawdata.org = 900;
                                            break;
                                        case 'J':
                                            this.lawdata.org = 1000;
                                            break;
                                        case 'K':
                                            this.lawdata.org = 1100;
                                            break;
                                        case 'L':
                                            this.lawdata.org = 1200;
                                            break;
                                        case 'M':
                                            this.lawdata.org = 1300;
                                            break;
                                        case 'N':
                                            this.lawdata.org = 1400;
                                            break;
                                        case 'O':
                                            this.lawdata.org = 1500;
                                            break;
                                        case 'P':
                                            this.lawdata.org = 1600;
                                            break;
                                        case 'Q':
                                            this.lawdata.org = 1700;
                                            break;
                                        case 'R':
                                            this.lawdata.org = 1800;
                                            break;
                                        case 'S':
                                            this.lawdata.org = 1900;
                                            break;
                                        case 'T':
                                            this.lawdata.org = 2000;
                                            break;
                                        case 'U':
                                            this.lawdata.org = 2100;
                                            break;
                                        case 'V':
                                            this.lawdata.org = 2200;
                                            break;
                                        case 'X':
                                            this.lawdata.org = 2300;
                                            break;
                                        case 'Y':
                                            this.lawdata.org = 2400;
                                            break;
                                        case 'W':
                                            this.lawdata.org = 2500;
                                            break;
                                        case 'Z':
                                            this.lawdata.org = 2600;
                                            break;
                                    }
                                }else {    
                                    this.lawdata.org = 10
                                }

                            }  else {
                                this.lawdata.org++
                            }

                            if(this.lawdata.text.startsWith("Parágrafo único.")) {
                                this.lawdata.text = this.lawdata.text.split(".")
                                this.lawdata.text[0] = "<b>" + this.lawdata.text[0] + "</b>"
                                this.lawdata.text = this.lawdata.text.join(".")
                            }

                                this.$apollo.mutate({
                                mutation:require('../graphql/createLawText.gql'),
                                variables: this.lawdata
                                })
                                .then(data => {
                                    console.log(data)
                                })
                                .catch( e => {
                                    console.log(e)
                                })
                        }
                    }) 
                }
            },

            clearField(){
                this.textLaw = "",
                this.lawdata.art = "",
                this.lawdata.law = "",
                this.lawdata.text_law= "",
                this.lawdata.text = "",
                this.lawdata.org = 1
            }
        },
        
        async asyncData(context){
            const client = context.app.apolloProvider.defaultClient
            
            const query = {
            query:require("../graphql/laws.gql")
            }

            let laws = []
            await client.query(query).then(data => {
            laws = data.data.laws
            })

            return{ laws }
        }
    }
</script>