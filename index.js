import { ApolloServer, gql } from "apollo-server";

import { products, categories, reviews } from "./data.js";

const typeDefs = gql`
    type Query {
        products: [Product!]!
        product(id: ID!): Product
    }

    type Product {
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
    }
`;

const resolvers = {
    Query: {
        products: () => {
            return products
        },
        product: (parent, args, context) => {
            products.find(product => product.id === args.id)
        },
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${url}`);
});