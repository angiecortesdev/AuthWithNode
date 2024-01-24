import { Request, Response } from "express";
import { Plan } from '../models/plan'

export const getPlans = async(req: Request, res: Response) => {
    const listPlans = await Plan.findAll();

    res.json(listPlans)
}    