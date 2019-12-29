import { Flow } from "./Flow";

export class BaseReusable {
	run(flow: Flow, opts: Array<any> = []): void {
		console.log(flow);
		console.log(opts);
	}
}