// ES6らしくimportを使っている
import {greetings} from "./words";

export default class Hello {
	constructor() {}
	sayHello() {
		return greetings;
	}
}