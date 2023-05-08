import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const id = <string>req.query.id;
        try {
            await prisma.tasks.delete({ where: { id } });
            const tasks = await prisma.tasks.findMany();
            return res.json(tasks);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    return res.status(405).json({ message: 'Method not Allowed' });
}