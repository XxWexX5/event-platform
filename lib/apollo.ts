import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl503zuv70rax01umabysdlfe/master",
  cache: new InMemoryCache(),
});
