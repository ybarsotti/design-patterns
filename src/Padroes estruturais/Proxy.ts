/**
 * A interface declara as operações comuns.
 */
interface Subject {
    request(): void;
}

/**
 * Essa classe contem as logicas de negócio. Pode conter processamento lento ou sensivel, por isso o Proxy resolve
 * esses problemas sem alterar o código dessa classe.
 */
class RealSubject implements Subject {
    request() {
        console.log(`RealSubject: Request`)
    }
}

/**
 * O proxy é exatamente igual a classe original
 */
class ProxyImpl implements Subject {
    /**
     * O proxy pode ter a referencia do objeto Real mas tambem pode ser carregado depois (ex. o objeto real é pesado
     * de carregar e não é necessário que seja carregado até determinado momento).
     */
    constructor(private realSubject?: RealSubject ) {}

    request() {
        if (!this.realSubject) this.initialize()

        if (this.checkAccess() && this.realSubject) {
            this.realSubject.request()
        }
    }

    private checkAccess(): boolean {
        console.log("Proxy: checking access");
        return true;
    }

    private initialize(): void {
        this.realSubject = new RealSubject()
    }
}

const clientCode = (subject: Subject) => {
    subject.request()
}

console.log(`Client: Executing client code with real subject: `)
const realSubject = new RealSubject()
clientCode(realSubject)

console.log(`Client: Executing client code with a Proxy: `)
const proxy = new ProxyImpl(realSubject)
clientCode(proxy)

console.log(`Client: Executing client code with a Lazy Proxy: `)
const proxyLazy = new ProxyImpl()
clientCode(proxyLazy)
