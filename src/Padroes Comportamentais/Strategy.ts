interface Strategy {
    executeA(data: Array<string>): Array<string>;
}

/**
 * Implementam o algoritmo da Strategy
 */
class StrategyImplA implements Strategy {
    executeA(data: Array<string>): Array<string> {
        return data.sort();
    }
}

class StrategyImplB implements Strategy {
    executeA(data: Array<string>): Array<string> {
        return data.reverse();
    }
}

/**
 * Armazena a referência á algum Strategy sem saber a implementação, usando apenas interface.
 */
class Context {
    constructor(private strategy: Strategy) {}

    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    execute(): void {
        console.log(`Context: sorting data using the strategy`)
        const result = this.strategy.executeA(['a', 'b', 'c', 'd', 'e'])
        console.log(result.join(','));
    }
}

const context = new Context(new StrategyImplA());
console.log('Client: Strategy is set to normal sorting.');
context.execute();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new StrategyImplB());
context.execute();
