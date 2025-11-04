import { ConfigService } from "@nestjs/config";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import "dotenv/config";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    plugins: [expo()],
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: { 
            prompt: "select_account",
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string, 
        },  
    },
    trustedOrigins: ["http://localhost:8081"]
});