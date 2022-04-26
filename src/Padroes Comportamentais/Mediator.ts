/**
 * Declara o método a ser usado por componentes para notificar o mediador os eventos. O mediador reage aos events
 * e passa a execução para outros componentes.
 */
interface Mediator {
    notify(sender: object, event: string): void;
}

/**
 * Coordena os componentes.
 */
class MediatorImpl implements Mediator {
    constructor(private component1: Component1, private component2: Component2) {
        this.component1.setMediator(this)
        this.component2.setMediator(this)
    }

    notify(sender: object, event: string) {
        if (event === 'A') {
            console.log(`Mediator reacts on A`)
            this.component2.doC()
        }

        if (event === 'D') {
            console.log(`Mediator reacts on D`)
            this.component1.doB()
            this.component2.doC()
        }
    }
}

class BaseComponent {
    constructor(protected mediator: Mediator | null  = null) {}

    setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

class Component1 extends BaseComponent {
    doA(): void {
        console.log(`Component 1 does A.`)
        this.mediator?.notify(this, 'A');
    }

    doB(): void {
        console.log(`Component 1 does B.`)
        this.mediator?.notify(this, 'B')
    }
}

class Component2 extends BaseComponent {
    doC(): void {
        console.log(`Component 1 does C.`)
        this.mediator?.notify(this, 'C');
    }

    doD(): void {
        console.log(`Componente 1 does D.`)
        this.mediator?.notify(this, 'D')
    }
}

const c1 = new Component1()
const  c2 = new Component2()
const mediator = new MediatorImpl(c1, c2)
c1.doA()
c2.doD()
