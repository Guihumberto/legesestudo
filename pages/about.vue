<template>
    <v-container>
            <v-card max-width="1080" class="mx-auto" dark>
                <v-img
                max-height="300"
                src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
                >
                    <v-card-title>Sobre</v-card-title>
                </v-img>
                <v-card-text 
                    class="text-center"
                    style="position: relative;">
                    <v-btn
                        absolute
                        class="white--text mb-5"
                        fab
                        x-small
                        top>
                        <v-avatar size="164">
                            <img src="@/assets/img/perfil.jpg">
                        </v-avatar>
                    </v-btn>
                    <div class="font-weight-light grey--text text-h6 mb-12">
                    img
                    </div>
                    <h3 class="text-h4 font-weight-light orange--text mb-2">
                    João Humberto Silva Ribeiro Júnior
                    </h3>
                    <div class="text-h6">
                    Auditor Fiscal da Receita Estadual<br>
                        <small class="font-weight-light">Graduado em Ciências Contábeis com Especialização em Contabilidade Pública e Responsabilidade Fiscal e Direito Tributário</small>
                    </div>
                </v-card-text>
                <v-card-text>
                    <h2 class="mb-2">Sobre mim</h2>
                    <p>Pinheirense, filho de João Humberto Silva Ribeiro e Idalina Moreira Sá, pai de 2 meninos, concursando por 10 anos (2008 a 2018). Servidor Público Estadual apaixonado por Direito Tributário. Joga video game nas horas vagas.</p>
                    <v-divider class="mb-2"></v-divider>
                    <h2>Aprovações em Concurso Público</h2>
                     <v-list dense>
                        <v-list-item v-for="aprov in aprovs" :key="aprov.concurso">
                            <v-list-item-avatar><v-icon>mdi-pencil-box-multiple-outline</v-icon></v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{aprov.concurso}}</v-list-item-title>
                                <v-list-item-subtitle>{{aprov.ano}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider class="mb-2"></v-divider>
                    <h2 class="mb-2">PAD e Perseguição no IPREV</h2>
                    <p> Em 2019 assumiu no IPREV-MA e fez diversas denúncias a respeito de irregularidades que acontecia dentro da autarquia. Como troca os Gestores o Instituto perseguiram através de um PAD (processo adminsitrativo disciplinar).<v-btn text>clique aqui para saber mais</v-btn></p>
                    <h2>Contato</h2>
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon><v-icon>mdi-whatsapp</v-icon></v-list-item-icon>
                            <v-list-item-title>(98) 98465-0786</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-icon><v-icon>mdi-email</v-icon></v-list-item-icon>
                            <v-list-item-title>juninho.joao@hotmail.com</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            aprovs:[
                {concurso:"IFMA", ano:"2009"},
                {concurso:"INSS", ano:"2012"},
                {concurso:"TCE-CE", ano:"2015"},
                {concurso:"IPREV", ano:"2018"},
                {concurso:"SEMFAZ-SLZ", ano:"2018"},
                {concurso:"SEFAZ-MA", ano:"2016"},
                {concurso:"TRF 1º", ano:"2018"},
                {concurso:"EBERSERH", ano:"2018"},
                {concurso:"TRT 5º", ano:"2018"},
                {concurso:"Ministério da Saúde", ano:"2018"},
                {concurso:"TJ-AP", ano:"2014"},
                {concurso:"TCM-GO", ano:"2015"},
                {concurso:"TCE-PE", ano:"2017"},
            ]
        }
    }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>>
