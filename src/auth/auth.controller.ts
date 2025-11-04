import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import "dotenv/config";

@Controller()
export class AuthController {
  @Get('auth/social/callback')
  async forwardToFrontend(@Req() req: Request, @Res() res: Response) {
    //console.log('cookies on server after oauth:', req.cookies);

    const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:8081';

    // // If you have a condition (no session) you can redirect to an error or login page:
    // const hasSession = !!req.cookies?.['better-auth.session_token'];

    // if (!hasSession) {
    //   // No session — send to frontend login or error
    //   return res.redirect(`${FRONTEND}/auth/error`);
    // }

    // Redirect to the frontend route — the cookie is already set for host 'localhost'
    return res.redirect(`${FRONTEND}/dashboard/nutrition`);
  }
}
