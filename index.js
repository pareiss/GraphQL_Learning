import { ApolloServer, gql } from "apollo-server";

import { products, categories, reviews } from "./data.js";

const typeDefs = gql`
    type Query {
        products: [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
    }

    type Category {
        id: ID!
        name: String!
    }
`;

const resolvers = {
    Query: {
        products: () =>  products,
        product: (_, args, _) => {
            const { id } = args;
            return products.find((product) => product.id === id);
        },
        categories: () => categories,
        category: (_, args, _) => {
            const { id } = args;
            return categories.find((category) => category.id === id);
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