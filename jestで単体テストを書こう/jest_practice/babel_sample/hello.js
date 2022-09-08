// ES6らしくimportを使っている
// Babelを使うとここがrepuireに変換される
import {greetings} from "./words";

export default class Hello {
	constructor() {}
	sayHello() {
		return greetings;
	}
}