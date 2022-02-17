<template>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>{{law}}
      </template>
    </v-breadcrumbs>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          disabled: true,
          to: '/leges',
        },
      ],
    }),
    props:{
      law: {
        require: true
      }
    },
  }
</script>