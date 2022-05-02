/**
 * A classe abstrata define um método template que contem o esqueleto do algoritmo.
 *
 * As classes que a implementam precisam implementar as operações abstratas.
 */
abstract class AbstractClass {
    templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    /**
     * Operações já implementadas
     * @protected
     */
    protected baseOperation1(): void {
        console.log('AbstractClass says: I am doing the bulk of the work');
    }

    protected baseOperation2(): void {
        console.log('AbstractClass says: But I let subclasses override some operations');
    }

    protected baseOperation3(): void {
        console.log('AbstractClass says: But I am doing the bulk of the work anyway');
    }

    /**
     * Devem ser implementadas
     * @protected
     */
    protected abstract requiredOperations1(): void
    protected abstract requiredOperation2(): void

    /**
     * São opcionais serem implementadas pois já possuem uma implementação (vazia)
     * @protected
     */
    protected hook1(): void { }
    protected hook2(): void { }
}

/**
 * As implementações devem imeplemtar as operações abstratas
 */
class Class1Impl extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('Class1Impl says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('Class1Impl says: Implemented Operation2');
    }
}

class Class2Impl extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('Class2Impl says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('Class2Impl says: Implemented Operation2');
    }

    /**
     * Pode
     * @protected
     */
    protected hook1(): void {
        console.log('Class2Impl says: Overridden Hook1');
    }
}

const clientCode = (abstractClass: AbstractClass) => {
    abstractClass.templateMethod()
}

console.log('Same client code can work with different subclasses:');
clientCode(new Class1Impl());
console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new Class2Impl());
