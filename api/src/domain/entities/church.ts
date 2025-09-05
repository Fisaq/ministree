export class Church {
    private readonly _id: number;
    private _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    public changeChurchName(value: string) {
        this._name = value;
    }

    public static create(churchName: string) {
        return new Church(0, churchName);
    }

    public static restore(props: {
        churchId: number,
        name: string,
    }): Church {
        return new Church(
            props.churchId,
            props.name,
        );
    }
}