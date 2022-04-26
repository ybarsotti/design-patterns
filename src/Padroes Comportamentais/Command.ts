/**
 * Declaração da interface command
 */
interface Command {
    execute(): void;
}

class SimpleCommand implements Command {
    constructor(private payload: string) {}

    execute() {
        console.log(`SimpleCommand: Printing`)
    }
}

/**
 * Alguns commandos podem receber Receivers para delegar as operações
 */
class ComplexCommand implements Command {
    constructor(private receiver: Receiver, private a: string, private b: string) {}

    execute() {
        console.log(`ComplexCommand: Complexx operation`)
        this.receiver.doSomething(this.a)
        this.receiver.doSomethingElse(this.b)
    }
}

/**
 * Contem algumas regras e processamentos.
 */
class Receiver {
    doSomething(a: string): void {
        console.log(`Receiver: working on (${a}.)`)
    }

    doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`)
    }
}

/**
 * O invoker pode estar associado com um ou varios commandos, enviando a requisição para o command.
 */
class Invoker {
    private onStart: Command | undefined;
    private onFinish: Command | undefined;

    setOnStart(command: Command): void {
        this.onStart = command;
    }

    setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    doSomethingImportant(): void {
        console.log('Invoker: Do something')

        if (this.isCommand(this.onStart)) this.onStart.execute()
        if (this.isCommand(this.onFinish)) this.onFinish.execute()
    }

    isCommand(object: any): object is Command {
        return object.execute !== undefined;
    }
}

const invoker = new Invoker()
invoker.setOnStart(new SimpleCommand('Hi'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'))

invoker.doSomethingImportant()
