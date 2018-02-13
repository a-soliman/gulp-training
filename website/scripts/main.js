class Person {
	constructor(name) {
		this.name = name;
	}

	hello() {
		if ( typeof this.name === 'string') {
			return `Hello ${this.name} !`;
		}
		return 'Hello';
	}
}

let person = new Person('Ahmed');

document.write(person.hello());