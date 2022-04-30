interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

/**
 * Declara o método update usado nos subjects;
 */
interface Observer {
    update(subject: Subject): void;
}

class SubjectImpl implements Subject {
    state: number | undefined;
    observers: Array<Observer> = [];

    attach(observer: Observer) {
        const exists = this.observers.includes(observer);
        if (exists) return console.log(`Subject: Observer already attached.`);

        console.log(`Subject: Attached an observer.`);
        this.observers.push(observer);
    }

    detach(observer: Observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1 ) return console.log(`Subject: Nonexistent observer.`)

        this.observers.splice(observerIndex, 1);
        console.log(`Subject: Detached an observer.`)
    }

    notify() {
        console.log(`Subject: Notifying observers...`);
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Os Subjects geralmente contém algumas regras de negócio que ativam os métodos de notificação.
     */
    something(): void {
        console.log(`\nSubject: Doing something`);
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: State changed to ${this.state}`);
        this.notify();
    }
}

class ObserverAImpl implements Observer {
    update(subject: Subject) {
        // @ts-ignore
        if (subject instanceof SubjectImpl && subject.state < 3) {
            console.log(`Observer A: Reacted.`)
        }
    }
}

class ObserverBImpl implements Observer {
    update(subject: Subject) {
        // @ts-ignore
        if (subject instanceof SubjectImpl && (subject.state === 0 || subject.state >= 2)) {
            console.log(`Observer B: Reacted.`)
        }
    }
}


const subject = new SubjectImpl();

const observer1 = new ObserverAImpl();
subject.attach(observer1);

const observer2 = new ObserverBImpl();
subject.attach(observer2);

subject.something();
subject.something();

subject.detach(observer2);

subject.something();

