/**
 * A interface de implementação para todas as classes de implementação. Ela não tem que necessariamente ter ligação
 * com a abstração (Abstraction). Geralmente ela tem seus proórios métodos que são chamados na classe de abstração.
 */
interface Implementation {
    operationImplementation(): string;
}

/**
 * A classe de abstração pode ter implementações próprias, porém boa parte dos métodos serão de classes concretas que
 * herdam dessa mesma classe, por isso o "Bridge" já que ela faz a ponte entre implementações
 */
class Abstraction {
    constructor(protected implementation: Implementation) {}

    operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Operation With ${result}`;
    }
}

/**
 * Aqui são as classes que implementam o implementation, podendo ser variações de APIs em cada uma
 */
class ConcreteImplA implements Implementation {
    operationImplementation(): string {
        return `Concrete Impl A: Resultado`
    }
}

class ConcreteImplB implements Implementation {
    operationImplementation(): string {
        return `Concrete Impl B: Resultado.`
    }
}

const clientCode = (abstration: Abstraction) => {
    console.log(abstration.operation())
}

const implA = new ConcreteImplA();
let abstraction = new Abstraction(implA);
clientCode(abstraction)

const implB = new ConcreteImplB();
abstraction = new Abstraction(implB);
clientCode(abstraction)
