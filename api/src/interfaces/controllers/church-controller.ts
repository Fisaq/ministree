import { Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export class ChurchController {
    constructor(
        private _createChurchUseCase: any,
    ) { }

    public async createChurch(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { churchName } = req.body;
            const { currentUser } = req

            if (!currentUser) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await this._createChurchUseCase.execute(currentUser!, churchName);
            return res.status(200).json({ message: 'Church created successfuly!' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}