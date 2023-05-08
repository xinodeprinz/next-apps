import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { validateCreateTaskSchema } from "./schemas";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { error, value } = validateCreateTaskSchema(req);
        if (error) {
            const message = error.details[0].message;
            return res.status(422).json({ message });
        }

        try {
            await prisma.tasks.create({ data: value });
            const tasks = await prisma.tasks.findMany();
            return res.status(201).json(tasks);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    return res.status(405).json({ message: 'Method not Allowed' });
}