import { Request, Response } from "express"
import { UserBusiness } from "../bussiness/UserBusiness"
import { SignupInputDTO } from './../dtos/userDTO'
import { BaseError } from "../errors/BaseError"


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}
    
    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const Output = await this.userBusiness.signup(input)

            res.status(201).send(Output)
        
        } catch (error) {
            if(error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Ops! Algo deu errado!")

            }
        }
    }

}