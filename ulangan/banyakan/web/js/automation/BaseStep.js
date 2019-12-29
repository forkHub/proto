import { Flow } from "./Flow.js";
// import { page } from "../data/Page";
export class BaseStep {
    constructor() {
        this.flow = new Flow();
    }
    getPromise() {
        return this.flow.getPromise();
    }
    run() {
    }
}
