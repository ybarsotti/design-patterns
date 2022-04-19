interface Component {
    operation(): string;
}

/**
 * Classe com a implementação padrão da interface;
 */
class ComponentImpl implements Component {
    operation(): string {
        return `Concrete Component`
    }
}

/**
 * O decorator segue com a implementação da mesma interface, recebendo um componente para envolver o método da implementação
 * inicial com funcionalidades extras.
 */
class Decorator implements Component {
    constructor(protected component: Component) {}

    /**
     * Nesse momento só é passado a chamda para o componente.
     */
    operation(): string {
        return this.component.operation();
    }
}

class DecoratorImplA extends Decorator {
    operation(): string {
        return `Concrete Decorator A (${super.operation()})`
    }
}

class DecoratorImplB extends Decorator {
    operation(): string {
        return `Concrete Decorator B (${super.operation()})`
    }
}

const clientCode = (component: Component) => {
    console.log(`Result: ${component.operation()}`)
}

/**
 * Classe base sem decorator
 */
const simple = new ComponentImpl()
clientCode(simple)

/**
 * Classe decorada
 */
const decoratorA = new DecoratorImplA(simple)
const decoratorB = new DecoratorImplB(decoratorA)
clientCode(decoratorB)
