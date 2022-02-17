
<template>
  <v-card
    class="mx-auto"
    max-width="1080"
  >
    <v-card-text>
      <div class="d-flex justify-space-between"> 
          <span>{{post.subject.name}}</span>
          <span>{{post.created_at}}</span>
      </div>
      <p class="text-h4 text--primary">
        {{$route.params.posts}}
      </p>
      <p>{{post.subtitle}}</p>
      <div class="text--primary text-justify" v-html="post.text">
      </div>
        <div>
            Tags:
            <v-chip
            class="ma-2"
            color="success"
            outlined
            small
            v-for="tag in post.tags" :key="tag.name"
            >
            <v-icon left>
                mdi-subject
            </v-icon>
                {{tag.name}}
            </v-chip>
        </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        to="/blog"
      >
        Voltar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    async asyncData({app, route }){
    const client = app.apolloProvider.defaultClient
    const id = route.query.id
    
    const query = {
      query:require("../../graphql/postSingle.gql"),
      variables:{id}
    }

    let post = []
    await client.query(query).then(data => {
      console.log(data)
      post = data.data.post
    })

    return{ post }
  }
}
</script>