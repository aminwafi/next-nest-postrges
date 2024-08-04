import * as jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export function generateToken() {
    const secret = process.env.NESTAUTH_SECRET;

    const adminToken    = jwt.sign({ role: 'admin' }, secret, { expiresIn: '1h' });
    const userToken     = jwt.sign({ role: 'user' }, secret, { expiresIn: '1h' });

    console.log(`Admin token: ${adminToken}`);
    console.log(`User token: ${userToken}`);
}