export class SeleniumWrapper {
    static create() {
        return new SeleniumWrapper();
    }
    constructor() {
    }
    async waitTime(n) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, n);
        });
    }
}
