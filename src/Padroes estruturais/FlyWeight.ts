/**
 * Guarda uma parte comum do estado que pertence a multiplas entidades.
 */
class Flyweight {
    constructor(private sharedState: any) {}

    operation(state: any) {
        const s = JSON.stringify(this.sharedState)
        const u = JSON.stringify(state)
        console.log(`Flyweight: Shared (${s}) and unique (${u})`)
    }
}


/**
 * Cria e gerencia os objetos Flyweight. Garante que os objetos são compartilhados corretamente. Quando o cliente
 * pede um flyweight, o factory retorna uma instancia ou cria uma nova se não existir.
 */
class FlyweightFactory {
    private flyweights: Record<string, Flyweight> = {};

    constructor(initialFlyweights: Array<Array<string>>) {
        initialFlyweights.forEach((state) => {
           this.flyweights[this.getKey(state)] = new Flyweight(state);
        });
    }

    private getKey(state: Array<String>): string {
        return state.join('_')
    }

    /**
     * Retorna um Flyweight com o estado enviado ou cria um novo.
     */
    getFlyweight(sharedState: Array<String>): Flyweight {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log(`Flyweight Factory: Creating a new instance of Flyweight with key ${key}`)
            this.flyweights[key] = new Flyweight(sharedState)
        } else {
            console.log(`Flyweight Factory: Using existing flyweight`)
        }

        return this.flyweights[key];
    }

    listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`Flyweight Factory: I have ${count} flyweights:`)
        for (const key in this.flyweights) {
            console.log(key)
        }
    }
}

const factory = new FlyweightFactory([
    ['Chevrolet', 'Camaro2018', 'pink'],
    ['Mercedes Benz', 'C300', 'black'],
    ['Mercedes Benz', 'C500', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'X6', 'white'],
]);

factory.listFlyweights()

const addCarToPoliceDatabase = (
    ff: FlyweightFactory, plates: string, owner: string,
    brand: string, model: string, color: string
) => {
    console.log(`\nClient: Adding car to database.`)
    const flyweight = ff.getFlyweight([brand, model, color]);

    flyweight.operation([plates, owner])
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyweights();
