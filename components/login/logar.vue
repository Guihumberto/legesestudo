<template>
    <v-card hover>
            <v-toolbar :color="texts.color" dark>
                <v-toolbar-title class="title" >
                    <v-icon>{{texts.icon}}</v-icon>
                    {{texts.toolbar}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-progress-circular
                    indeterminate
                    width="2"
                    color="white"
                    v-if="isLoading"
                ></v-progress-circular>
                <v-btn icon v-else @click="close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-form @submit.prevent="onSubmit" ref="form">
                    <v-text-field
                        v-if="!isLogin"
                        label="email"
                        prepend-icon="mdi-email"
                        type="text"
                        v-model.trim="userInfo.email"
                        :rules="[rules.required, rules.email]"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Login"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model.trim="userInfo.identifier"
                        :rules="[rules.required, rules.minname]"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Senha"
                        prepend-icon="mdi-lock"
                        v-model.trim="userInfo.password"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show = !show"
                        :rules="[rules.required, rules.minname]"
                    >
                    </v-text-field>
                    <v-btn
                        block
                        dark
                        depressed
                        :color="texts.color"
                        type="submit"
                    >{{texts.toolbar}}</v-btn>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="texts.color" dense small text @click="isLogin = !isLogin">{{texts.button}}</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
            <v-snackbar
                v-model="showSnackbar"
                top
            >
                {{msgSnackBar}}
                <v-btn slot="action" icon color="pink" text @click="showSnackbar = false"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-snackbar>
        </v-card>
</template>

<script>
export default {
    data(){
        return{
            show:false,
            isLogin: true, 
            isLoading: false,
            showSnackbar: false,
            msgSnackBar: "",
            userInfo: {
                email:'',
                identifier:'',
                password:'',
            },
            rules: {
                required: (value) => !!value || "Campo obrigatório",
                min: (v) => (v||'').length >= 8 || "Mínimo 8 caracteres",
                minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
                email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
                match: () => (this.userInfo.password === this.userInfo.repassword) || "As senhas devem ser iguais",
            },
        }
    },
    computed:{
        texts (){
            return this.isLogin
            ? {toolbar:"Login", color: "deep-purple accent-5", button:"Criar Conta", icon:"mdi-login-variant"}
            : {toolbar: "Criar Usuário", color:"success", button:"Já tenho uma conta", icon:"mdi-account-plus"}
        },
    },
    methods:{
        close(){
            this.$emit('closeDialog', false)
            this.$refs.form.reset()
        },
        async onSubmit(){
            if (this.$refs.form.validate()) {
                if(this.isLogin){
                    this.isLoading = true
                    await this.$auth.loginWith("local", {data:this.userInfo})
                        .then(()=>{         
                            console.log(this.$auth)
                            this.$emit('closeDialog', false)
                            this.$refs.form.reset()
                            this.$store.dispatch("snackbars/setSnackbars", {text:`Seja bem-vindo ${this.$auth.user.username}!`, color:'success', timeout:'3000'})
                            this.isLoading = false
                        }).catch(e => {
                            console.log(e)
                            this.$store.dispatch("snackbars/setSnackbars", {text:'Login ou senha incorreto(s)', color:'error'})
                            this.isLoading = false
                        })            
                }else {
                    this.$apollo.mutate({
                        mutation:require('../../graphql/createUser.gql'),
                        variables:this.userInfo
                    }).then( res => {
                        this.$auth.loginWith("local", {data:this.userInfo})
                        .then(()=>{
                            this.$emit('closeDialog', false)
                            this.$store.dispatch("snackbars/setSnackbars", {text:'Usuário cadastrado com sucesso!', color:'success'})
                            this.$store.dispatch("snackbars/setSnackbars", {text:`Seja bem-vindo ${this.$auth.user.username}!`, color:'info', timeout:'3000'})
                            this.$refs.form.reset()
                            this.isLoading = false
                        })
                    })
                }
            }
        }
    }
}
</script>