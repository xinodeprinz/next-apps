import Joi from "joi"
import { NextApiRequest } from "next";

const validateSchema = (schema: Joi.ObjectSchema<any>, req: NextApiRequest) => {
    return schema.validate(req.body || {});
}

export const validateCreateTaskSchema = (req: NextApiRequest) => {
    const schema = Joi.object({
        task: Joi.string().min(3).required(),
        date: Joi.date().greater(new Date()).required(),
        remember: Joi.boolean().required(),
    });
    return validateSchema(schema, req);
}