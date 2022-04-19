class Target {
    request(): string {
        return 'Default behavior'
    }
}

class Adaptee {
    anotherRequest(): string {
        return 'something else'
    }
}

/**
 * Recebe uma classe adaptadora que faz a conversão necessária do código usando a sobrescrita de método.
 * Uma outra forma seria de composição de classes, fazendo a herança de múltiplas classes e efetuando a sobrescrita dos métodos chamados
 */
class Adapter extends Target {
    constructor(private adaptee: Adaptee) {
        super();
    }

    request(): string {
        const result = this.adaptee.anotherRequest();
        return `Adapter: ${result}`
    }
}

const client = (target: Target) => {
    console.log(target.request());
}

const target = new Target()
console.log(target.request())

const adaptee = new Adaptee()
const adapter = new Adapter(adaptee)
console.log(adapter.request())
