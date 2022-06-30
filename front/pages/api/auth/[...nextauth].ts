import NextAuth from 'next-auth'
import googleProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../lib/mongodb'



export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers:[googleProvider({
        clientId:'9362d59a1c2ba7126e2a',
        clientSecret: 'bd7d28cc6f511b1cddf0d4d8feed2a50f1f6fa95'
}
)]})

/*
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...
})

*/