interface Maze {
    addRoom(r: Room): this;
}
interface Room {}
interface Wall {}
interface Door {}

class MazeImpl implements Maze {
    addRoom(r: Room): this {
        console.log(`Adding room ${r}`)
        return this
    }
}
class RoomImpl implements Room {
    constructor(public n: number) {
    }
}
class WallImpl implements Wall {}
class DoorImpl implements Door {
    constructor(public r1: Room, public r2: Room) { }
}

/**
 * FactoryMethod, métodos que implementam a versão mais simples do método. Mantemos a classe abstrata para apenas termos
 * métodos com implementações minimas, para funcionar é necessśario de uma classe mais especializada estendendo MazeGame.
 * makeMaze, makeRoom, makeWall, makeDoor
 */
abstract class MazeGame {
    makeMaze(): Maze {
        console.log(`Creating Maze`)
        return new MazeImpl()
    }
    makeRoom(n: number): Room {
        console.log(`Creating room ${n}`)
        return new RoomImpl(1)
    }
    makeWall(): Wall {
        console.log(`Creating Wall`)
        return new WallImpl();
    }
    makeDoor(r1: Room, r2: Room): Door {
        console.log(`Creating door ${r1} to ${r2}`)
        return new DoorImpl(r1, r2);
    }

    createMaze(): Maze {
        const aMaze: Maze = this.makeMaze();

        const r1: Room = this.makeRoom(1);
        const r2: Room = this.makeRoom(2);
        const theDoor: Door = this.makeDoor(r1, r2);

        return aMaze;
    }
}


/* Extension */
class BombedWall implements Wall {}
class RoomWithABomb implements Room {
    constructor(n: number) {
    }
}

class BombedMazeGame extends MazeGame {
    makeWall(): Wall {
        console.log(`Creating bombed wall`)
        return new BombedWall()
    }

    makeRoom(n: number): Room {
        console.log(`Creating room with a bomb ${n}`)
        return new RoomWithABomb(n)
    }
}

const mazeGame2 = new BombedMazeGame()
mazeGame2.createMaze()
