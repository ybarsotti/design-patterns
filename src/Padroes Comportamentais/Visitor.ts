/**
 * O componente declara o método accept que recebe o visitor.
 */
interface Component {
    accept(visitor: Visitor): void;
}

/**
 * Cada componente implementa o método accept chamando o método do visitor.
 */
class ConcreteComponentA implements Component {
    accept(visitor: Visitor) {
        visitor.visitConcreteComponentA(this);
    }

    exclusiveMethodOfConcreteComponentA(): string {
        return 'A';
    }
}

class ConcreteComponentB implements Component {
    accept(visitor: Visitor) {
        visitor.visitConcreteComponentB(this);
    }

    specialMethodOfConcreteComponentB(): string {
        return 'B';
    }
}


/**
 * Visitor declara os métodos de visita correspondente as classes. A assinatura do método permite o visitor
 * identificar a classe de componente que está lidando
 */
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;
    visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
 * As implementações de Visitor implementam varias versões do mesmo algoritmo.
 */
class ConcreteVisitor1 implements Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
    }

    visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
    }
}

class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
    }
}

const clientCode = (components: Array<Component>, visitor: Visitor) => {
    for (const component of components) component.accept(visitor);
}

const components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
]

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');

console.log('It allows the same client code to work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
