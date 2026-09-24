import {ApolloServer} from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { typeDefs } from "./schema.js"

//import db from "./db.js"
import db from "./db.js";
const resolvers ={
    Query:{
        games(){
            return db.games
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        review(_,args){ // parent , args , context
            return db.reviews.find((review) => review.id === args.id)
        },
        game(_,args){ 
            return db.games.find((game) => game.id === args.id)
        },
        author(_,args){ 
            return db.authors.find((author) => author.id === args.id)
        },
    },
    Game:{
            reviews(parent){
                return db.reviews.filter((r)=> r.game_id === parent.id)
            }
        },
    Author:{
        reviews(parent){
            return db.reviews.filter((r)=> r.author_id === parent.id)
        }
    },// filter One to many schema eke [] ekak ewanwa
    Review:{// many to one thats why find , metana schema eke array ekk ewn na
        author(parent){
            return db.authors.find((a)=> a.author_id === parent.id)
        },
        game(parent){
            return db.games.find((a)=> a.game_id === parent.id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            db.games = db.games.filter((g)=>g.id != args.id)
            return db.games;
        }
    }
}


//server setup
const server = new ApolloServer({
//typeDefinitions - typeDef
typeDefs,
//resolver fuctions 
resolvers
})

const {url} = await startStandaloneServer(server,{
    listen:{port:3000}
});

console.log("Server ready at port ",3000)

// run --npm run run
