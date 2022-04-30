interface Memento {
    getState(): string;
    getName(): string;
    getDate(): string;
}

/**
 * Cojntém a infra para armazenar o estado do Originator.
 */
class MementoImpl implements Memento {
    constructor(private state: string,
                private date: string = new Date().toISOString().slice(0, 19).replace('T', '')) {}

    /**
     * O originator usa esse método para restaurar o estado.
     */
    getState(): string {
        return this.state
    }

    getName(): string {
        return `${this.date} / (${this.state}...)`
    }

    getDate(): string {
        return this.date;
    }
}

/**
 * Caretaker armazena os mementos e faz a intermediação entre o originator e o memento.
 */
class Caretaker {
    private mementos: Array<Memento> = [];

    constructor(private originator: Originator) {}

    backup(): void {
        console.log(`\nCaretaker: Saving Originator's state...`);
        this.mementos.push(this.originator.save());
    }

    undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento?.getName()}`);
        // @ts-ignore
        this.originator.restore(memento);
    }

    showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

/**
 * Armazena um estado que pode mudar. Define também o método para salvar o estado.
 */
class Originator {
    constructor(private state: string) {
        console.log(`Originator: Initial state: ${state}`)
    }

    save(): Memento {
        return new MementoImpl(this.state);
    }

    restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: State changed to: ${this.state}`)
    }

    doSomething(): void {
        console.log('Originator: I\'m doing something important.');
        this.state = this.generateRandomString(30);
        console.log(`Originator: and my state has changed to: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array
            .apply(null, [length])
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }
}

const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log('\nClient: Now, let\'s rollback!\n');
caretaker.undo();

console.log('\nClient: Once more!\n');
caretaker.undo();
