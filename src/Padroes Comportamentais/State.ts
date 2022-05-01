class Context {
    constructor(private state: State) {
        this.transitionTo(state);
    }

    transitionTo(state: State) {
        console.log(`Context: Transition to ${state.constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    request1() {
        this.state.handle1();
    }

    request2() {
        this.state.handle2();
    }
}

/**
 * Classe base do State declara todos os estados que quem herdar deve implementar e também a referência ao contexto.
 */
abstract class State {
    protected context: Context | undefined;

    setContext(context: Context) {
        this.context = context;
    }

    abstract handle1(): void;
    abstract handle2(): void;
}

class StateA extends State {
    handle1() {
        console.log(`StateA handles request1.`)
        this.context?.transitionTo(new StateB())
    }

    handle2() {
        console.log(`StateA handles request2.`)
    }
}

class StateB extends State {
    handle1() {
        console.log(`StateB handles request1.`)
    }

    handle2() {
        console.log(`StateA handles request1.`)
        this.context?.transitionTo(new StateA())
    }
}

const context = new Context(new StateA());
context.request1();
context.request2();
context.request2();
