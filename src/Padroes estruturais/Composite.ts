/**
 * Componente base para operaçõse simples e complexos dos objetos de uma composição;
 */
abstract class Component {
    protected parent: Component | null | undefined;

    setParent(parent: Component | null ) {
        this.parent = parent
    }

    getParent(): Component {
        return <Component>this.parent;
    }

    add(component: Component) {}
    remove(component: Component) {}

    /**
     * Identifica se o objeto pode ter filhos
     */
    isComposite(): boolean {
        return false;
    }

    abstract operation(): string ;
}

/**
 * É a menor unidade de uma composição, não pode ter nenhum tipo de filho.
 *
 * Geralmente são esses objetos que fazem de fato o trabalho, enquanto os objetos Composite delegam para os sub-componentes.
 */
class Leaf extends Component {
    operation(): string {
        return "I'm a leaf";
    }
}

/**
 * A classe composite representa componentes complexos que podem ter filhos, geralemnte eles delegam o trabalho para os filhos.
 */
class Composite extends Component {
    protected children: Array<Component> = [];

    add(component: Component) {
        this.children.push(component);
        component.setParent(this);
    }

    remove(component: Component) {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    isComposite(): boolean {
        return true;
    }

    /**
     * A operação de um composite é a somatoria do resultado da operação de todos os filhos
     */
    operation(): string {
        const results: Array<string> = []
        this.children.forEach((child) => {
            results.push(child.operation())
        })
        return `Branch(${results.join('+')})`
    }
}

const clientCode = (component: Component) => {
    console.log(`RESULT: ${component.operation()}`)
}

/**
 * Menor componente ( Simples )
 */
const simple = new Leaf()
clientCode(simple)

/**
 * Composições complexas
 */
const tree = new Composite()
const branch1 = new Composite()
branch1.add(new Leaf())
branch1.add(new Leaf())

const branch2 = new Composite()
branch2.add(new Leaf())

tree.add(branch1)
tree.add(branch2)

clientCode(tree);

