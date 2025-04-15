const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { PrismaClient } from '@prisma/client/';

const prisma = new PrismaClient();

export const register  = async  (req, res) => {
    const  {email, password} = req.body;
    try  {
        const  hashedPassword  = await bcrypt.hash(password, 10);
        const  user  = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }

}