/* Interfaces */
interface IMazeFactory {
    makeMaze(): Maze;
    makeWall(): IWall;
    makeRoom(n: number): IRoom;
    makeDoor(r1: IRoom, r2: IRoom): Door
}
interface IWall {}
interface IRoom {
    setSide(side: string, wall: IWall): void;
}

/* Classes */
class Maze {
    addRoom(r: IRoom) {
      console.log(`Added room ${r}`)
    }
}
class Wall implements IWall{}
class Room implements IRoom {
    constructor(public i: number) {}

    setSide(side: string, wall: Wall) {
        console.log(`Constructing wall ${wall} on side ${side}`);
    }
}
class Door {
    constructor(public r1: Room, public r2: Room) {}
}
class CastSpell {}

class EnchantedRoom implements IRoom {
    constructor(n: number, spell: CastSpell) {
    }
    setSide(side: string, wall: IWall) {
        console.log(`Constructing enchanted wall ${wall} on side ${side}`);
    }
}

/* Abstract Factory */
/**
 * Um abstract Factory não é necessariamente abstrato, ele pode ser usado como uma classe concreta também e ser estendida
 */
class MazeFactory implements IMazeFactory {
    makeMaze(): Maze {
        return new Maze();
    }

    makeWall(): Wall {
        return new Wall();
    }

    makeRoom(n: number): IRoom {
        return new Room(n)
    }

    makeDoor(r1: Room, r2: Room): Door {
        return new Door(r1, r2)
    }
}

class EnchantedMazeFactory extends MazeFactory {
    constructor() {
        super();
    }

    makeRoom(n: number): EnchantedRoom {
        return new EnchantedRoom(n, new CastSpell())
    }
}

/* ---------------- */
class MazeGame {
    createMaze(factory: IMazeFactory): Maze {
        const aMaze = factory.makeMaze();
        const r1 = factory.makeRoom(1);
        const r2 = factory.makeRoom(2);
        const aDoor = factory.makeDoor(r1, r2);

        aMaze.addRoom(r1);
        aMaze.addRoom(r2);

        r1.setSide('North', factory.makeWall());
        r1.setSide('East', aDoor);

        return aMaze;
    }
}

const mazeGame = new MazeGame()
// const maze = mazeGame.createMaze(new MazeFactory())
const maze = mazeGame.createMaze(new EnchantedMazeFactory())
console.log(maze)
