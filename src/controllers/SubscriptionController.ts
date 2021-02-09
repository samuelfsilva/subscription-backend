import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";

import Subscription from '../models/Subscription';

interface ValidationErrors {
    [key: string]: string[];
}

interface DataType {
    name: string;
    email:string;
    nascimento?:Date;
}

export default {
    async index(request: Request, response: Response) {
        const subscriptionRepository = getRepository(Subscription);

        const subscription = await subscriptionRepository.find();

        return response.json(subscription);
    },

    async create(request: Request, response: Response) {
        
        const transformData = (value: any, originalValue: any) => {
            const parsedDate = isDate(originalValue)
                ? originalValue
                : parse(originalValue, "dd/MM/yyyy", new Date());
                
            return parsedDate;
        }

        const testDate = (nascimento?: Date) => {
            const cutoff = new Date();
            let data = new Date();
            
            cutoff.setFullYear(cutoff.getFullYear() - 18);
            
            if (nascimento)
                data = nascimento;
            
            return data <= cutoff;
        }

        const {
            name,
            email,
            nascimento
        } = request.body as DataType;

        const subscriptionRepository = getRepository(Subscription);

        const data = {
            name,
            email,
            nascimento
        }

        try {
            const schema = Yup.object().shape({
                name: Yup
                    .string()
                    .strict(false)
                    .trim('O nome não pode começar ou acabar com espaço')
                    .required("O nome é obrigatório"),
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required("O e-mail é obrigatório"),
                nascimento: Yup
                    .date()
                    .transform(transformData)
                    .test('nascimento', 'Você deve ser maior de 18 anos', testDate)
                    .max(new Date(), 'Não é possível incluir uma data futura')
                    .required('Informe a sua data de nascimento'),
            });
    
            const validatedData = await schema.validate(data, {
                abortEarly: false,
            });

            const subscription = subscriptionRepository.create({
                name: validatedData.name,
                email: validatedData.email,
                nascimento: validatedData.nascimento
            });
        
            await subscriptionRepository.save(subscription);
        
            return response.status(201).json();
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                let errors: ValidationErrors = {};

                error.inner.forEach(err => {
                    if (err.path)
                        errors[err.path] = err.errors;
                });

                return response.status(400).json({ message: 'Validation fails', errors });
            }
        }
    }
}