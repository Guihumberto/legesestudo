<template>
    <v-container>
        <v-card max-width="1080" class="mx-auto" dark>
            <v-img gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)">
                <v-card-title>Blog Leis para Concurso</v-card-title>
                <v-card-subtitle>Atualização e últimas novidades sobre Direito Tributário na esfera Federal, Estadual e Municipal.</v-card-subtitle>
            </v-img>
        </v-card>
        <v-card max-width="1080" class="mx-auto" flat tile color="#6A76AB" min-height="500">
            <v-img gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)">
                <v-container>
                    <v-row>
                        <v-col cols="12" v-for="post in posts" :key="post.title">
                            <v-card>
                                <div class="d-flex">  
                                    <v-avatar size="100" class="ma-3" color="indigo">
                                        <span class="white--text text-h3" :title="post.subject.name">{{post.subject.abrev}}</span>
                                    </v-avatar>
                                    <v-card-text>
                                        <small>{{post.created_at}}</small><br>
                                        <span class="text-h5 font-weight orange--text mb-2">{{post.title}}</span><br>
                                        <span class="text-h7 font-weight-light mb-2">{{post.subtitle}}</span><br>
                                        <span>{{post.text | truncate(200)}} 
                                            <v-btn small color="primary" :to="{
                                            name: 'posts',
                                            params:{posts: post.title},
                                            query:{id:post.id}
                                            }" text>...Ler mais
                                            </v-btn>
                                        </span>
                                    </v-card-text>
                                </div>
                                <v-card-actions>
                                        <v-row class="mb-1" color="indigo darken-2">
                                            <v-spacer></v-spacer>
                                            <blog-menu />
                                        </v-row>
                                    </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-img>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
        }
    },

    async asyncData(context){
    const client = context.app.apolloProvider.defaultClient
    
    const query = {
      query:require("../graphql/posts.gql")
    }

    let posts = []
    await client.query(query).then(data => {
      console.log(data)
      posts = data.data.posts
    })

    return{ posts }
  },
  computed:{
    
  }
}
</script>