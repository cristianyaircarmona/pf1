import NextAuth from 'next-auth'
import googleProvider from 'next-auth/providers/github'



export default NextAuth({providers:[googleProvider({
    clientId:'9362d59a1c2ba7126e2a',
    clientSecret: 'bd7d28cc6f511b1cddf0d4d8feed2a50f1f6fa95'
})]})