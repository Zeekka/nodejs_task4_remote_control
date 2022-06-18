export default class InvalidCommandInput extends Error {
    private context: string[];

    constructor(message: string, context: string[]) {
        super(message);

        this.context = context;
    }

    public getContext(): typeof this.context {
        return this.context
    }
}