import { ConfigService } from "@nestjs/config";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        connectionString: new ConfigService().get<string>('DATABASE_URL'),
    })
});