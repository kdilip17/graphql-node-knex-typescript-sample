import express from "express";
import bodyParser from "body-parser";
import graphqlHttp from "express-graphql";
const cors = require('cors')
const schema = require("./schema/schema")

const app = express();
app.use(bodyParser.json());
// cross orgin
app.use(cors());
const port = 8085; // default port to listen

// define a route handler for the default home page
app.get( "/", async ( req, res ) => {
    // let books = await bookCntrl.getBooks()
    res.send("App is healthy...");
});

app.use('/graphql',
    graphqlHttp({
        schema,
        graphiql: true
}))

// function clear() {
//     process.stdout.write("\033c")
// }
// clear();

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
