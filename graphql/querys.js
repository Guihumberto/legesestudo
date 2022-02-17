import gql from "graphql-tag"

export const lawText = gql `
    query {
        lawtexts{
            text
        }
    }
`