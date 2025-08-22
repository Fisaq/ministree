import { Request, Response } from "express";

export class UserController {
    constructor(
        private _createUserUseCase: any,
        private _updateUserUseCase: any,
        private _verifyUserUseCase: any
    ) { }

    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            await this._createUserUseCase.execute({ name, email, password });
            return res.status(200).json({ message: 'User created successfuly!' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            await this._updateUserUseCase.execute({ id, name, email, password });
            return res.status(200).json({ message: `User with id: [${id}] updated successfuly!` });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async verifyEmail(req: Request, res: Response): Promise<any> {
        const token = req.query.token as string;
        if (!token) return res.status(400).send('Token not found!');

        try {
            await this._verifyUserUseCase.execute(token);
            res.send('Email verified successfully');
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}