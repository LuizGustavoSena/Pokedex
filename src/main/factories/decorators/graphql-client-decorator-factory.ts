import { GraphqlClientDecorator } from "@/main/decorators/graphql-client-decorator";
import { makeAxiosHttpClient } from "../http";

export const makeGraphqlClientDecorator = (): GraphqlClientDecorator => new GraphqlClientDecorator(makeAxiosHttpClient());