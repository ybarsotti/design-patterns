/*
* Principal caracteristia é o método de clonagem e as vezes o lazy initialization com o método initialize, por exemlpo.
* */
interface Prototype<T> {
    clone(): T;
}

interface Maze {
    addRoom(r: Room): this;
}
interface Room extends Prototype<Room> {}
interface Wall extends Prototype<Wall> {
    initialize(): Wall;
}
interface Door extends Prototype<Door> {
    initialize(r1: Room, r2: Room): Door;
}

class MazeImplPrototype implements Maze {
    addRoom(r: Room): this {
        console.log(`Adding room ${r}`)
        return this
    }
}
class RoomImplPrototype implements Room, Prototype<RoomImplPrototype> {
    constructor(public n: number) {}
    clone(): this {
        return Object.create(this)
    }
}

class WallImplPrototype implements Wall, Prototype<WallImplPrototype> {
    clone(): this {
        return Object.create(this)
    }

    initialize(): WallImplPrototype {
        return new WallImplPrototype()
    }
}
class DoorImplPrototype implements Door, Prototype<DoorImplPrototype> {
    constructor(public r1: Room, public r2: Room) { }
    clone(): this {
        return Object.create(this)
    }

    initialize(r1: Room, r2: Room): any {
        return new DoorImplPrototype(r1, r2)
    }
}


class MazePrototypeFactory {
    private prototypeMaze: Maze;
    private prototypeWall: Wall;
    private prototypeRoom: Room;
    private prototypeDoor: Door;

    constructor(m: Maze, w: Wall, r: Room, d: Door) {
        this.prototypeMaze = m;
        this.prototypeWall = w;
        this.prototypeRoom = r;
        this.prototypeDoor = d;
    }

    makeRoom(): Room {
        return this.prototypeRoom.clone()
    }

    makeWall(): Wall {
        console.log(`Creating clone Wall`)
        return this.prototypeWall.clone()
    }

    makeDoor(r1: Room, r2: Room): Door {
        console.log(`Creating clone door`)
        const door: Door = this.prototypeDoor.clone()
        console.log('Is same door: ', this.prototypeDoor === door)
        door.initialize(r1, r2)
        return door;
    }
}

class MazeGame {
    createMaze(factory: MazePrototypeFactory) {
        factory.makeDoor(factory.makeRoom(), factory.makeRoom())
        factory.makeWall()
    }
}

const mg = new MazeGame()
mg.createMaze(new MazePrototypeFactory(
    new MazeImplPrototype(), new WallImplPrototype(), new RoomImplPrototype(1), new DoorImplPrototype(
        new RoomImplPrototype(2), new RoomImplPrototype(3)
    )
))
