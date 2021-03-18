import { ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { App } from "./App";
import ReactDOM from "react-dom";
import { CompoundLink } from "./apollo/CompoundLink";
import "./index.css"
import { initializeSocket } from "./game-components/socket-methods/initializeSocket";

//TODO: Update typescript version when they fix it!

const client = new ApolloClient({
  link: CompoundLink(),
  cache: new InMemoryCache()
})

initializeSocket();
ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById("root")
);
