/**
 * Interface responsável pela abstração dos iterators.
 */
interface Iterator<T> {
    current(): string;
    next(): string;
    key(): number;
    valid(): boolean;
    rewind(): void;
}

interface Aggregator {
    getIterator(): AlphabeticalOrderIterator
}

class AlphabeticalOrderIterator implements Iterator<WordsCollection> {
    /**
     * Armazena a posição atual.
     * @private
     */
    private position: number = 0;
    constructor(private collection: WordsCollection, private reverse: boolean = false) {
        if (this.reverse) this.position = collection.getCount() - 1;
    }

    rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    current(): string {
        return this.collection.getItems()[this.position];
    }

    key(): number {
        return this.position;
    }

    // @ts-ignore
    next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

class WordsCollection implements Aggregator {
    private items: string[] = [];

    getItems(): string[] {
        return this.items;
    }

    getCount(): number {
        return this.items.length;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    getIterator(): AlphabeticalOrderIterator {
        return new AlphabeticalOrderIterator(this);
    }

    getReverseIterator(): AlphabeticalOrderIterator {
        return new AlphabeticalOrderIterator(this, true);
    }
}

const collection = new WordsCollection()
collection.addItem('First');
collection.addItem('Second');
collection.addItem('third');

const iterator = collection.getIterator()
while(iterator.valid()) {
    console.log(iterator.next())
}
