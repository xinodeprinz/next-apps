import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const tasks = await prisma.tasks.findMany();
            return res.json(tasks);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    return res.status(405).json({ message: 'Method not Allowed' });
}