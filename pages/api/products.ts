// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import prisma from '@/prisma/client'
import prisma from '@/prisma/client';
import Joi, { ValidationError } from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const schema = Joi.object({
      body: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.any().equal(Joi.ref('password')).required(),
      }),
      // files: Joi.object({
      //   image: Joi.object({
      //     mimetype: Joi.string().valid('image/png', 'image/jpeg').required(),
      //     size: Joi.number().max(1024 * 1024).required() //1mb max
      //   }).required(),
      // })
    });

    req.headers = {
      "content-type": 'application/json'
    }

    try {
      const value = await schema.validateAsync(req);
    } catch (error) {
      return res.status(422).json(error);
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });

  // try {
  //   const value = 
  //   return res.status(200).json(value);
  // } catch (error) {
  //   return res.status(200).json({ message: "Error", error });
  // }
  // const product = await prisma.products.create({
  //   data: {
  //     title: 'Mango',
  //     description: "I love this app",
  //     photo: "/images/nde.jpg",
  //     price: 20.0,
  //   }
  // });
  // res.status(200).json(product);
}
