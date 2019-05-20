export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello(name: String): SayHelloResponse!\n}\n\ntype SayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: SayHelloResponse;
}

export interface SayHelloQueryArgs {
  name: string | null;
}

export interface SayHelloResponse {
  text: string;
  error: boolean;
}
