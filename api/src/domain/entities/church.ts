import { IIdGenerator } from "../services/id-generator";

export class Church {
    private readonly _id: string;
    private _name: string;
    private _ministriesAmount: number;

    constructor(name: string, idGenerator: IIdGenerator, id?: string) {
        this._id = id ?? idGenerator.generate();
        this._name = name;
        this._ministriesAmount = 5;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get ministrieAmount() {
        return this._ministriesAmount;
    }

    public changeChurchName(value: string) {
        this._name = value;
    }

    public changeMinistriesAmount(value: number) {
        this._ministriesAmount = value;
    }
}