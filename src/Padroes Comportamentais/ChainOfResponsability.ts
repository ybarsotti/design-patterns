/**
 * Declara a interface para construir a corrente e o método para executar alguma requisição.
 */
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string |null;
}

abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | undefined;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}


/**
 * Todos os handlers concretos tratam a requisição ou passam para o próximo da corrente.
 */
class MonkeyHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === 'Banana') {
            return `Monkey: I'll eat the ${request}.`
        }
        return super.handle(request);
    }
}

class SquirrelHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === 'Nut') return `Squirrel: I'll eat the ${request}.`
        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === 'Meatball') return `Dog: I'll eat the ${request}.`
        return super.handle(request);
    }
}

const clientCode = (handler: Handler) => {
    const foods = ['Nut', 'Banana', 'Cup of coffee']

    for (const food of foods) {
        console.log(`Client: Who wants a ${food}?`);

        const result = handler.handle(food);

        if (result) console.log(` ${result}`)
        else console.log(` ${food} was left untouched.`)

    }
}

/**
 * Aqui é construida a corrente / cadeia
 */
const monkey = new MonkeyHandler()
const squirrel = new SquirrelHandler()
const dog = new DogHandler()

monkey.setNext(squirrel).setNext(dog)

console.log(`Chain: Monkey > Squirrel > Dog \n`)
clientCode(monkey);
console.log( '')

console.log(`Subchain: Squirrel > Dog \n`)
clientCode(squirrel)
