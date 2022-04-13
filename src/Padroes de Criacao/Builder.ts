interface Room {}
interface Maze {
    addRoom(r: Room): void;
}

class MazeImpl implements Maze {
    addRoom(r: Room) {
        console.log(`Adding room ${r}`)
    }
}
class RoomImpl implements Room {
    constructor(i: number) {
    }
}

/**
 * Builder
 */
interface MazeBuilder {
    buildMaze(): void;
    buildRoom(room: number): void;
    buildDoor(roomFrom: number, roomTo: number): void;
    getMaze(): Maze | null;

    mazeBuilder(): any;
}

/**
 * Implementação do builder. As principais diferenças entre Abstract Factory e builder é que no builder o foco é em construir um objeto complexo
 * passo a passo e retorna o produto como passo final. O abstract cria familias de objeto produto e retorna imediatamente.
 */
class StandardMazeBuilder implements MazeBuilder {
    private currentMaze: Maze | null;
    constructor() {
        this.currentMaze = null;
    }

    buildMaze() {
        console.log(`Building Maze`);
        this.currentMaze = new MazeImpl();
    }

    buildRoom(room: number) {
        console.log(`Building room ${room}`)
        this.currentMaze?.addRoom(new RoomImpl(room))
    }

    buildDoor(roomFrom: number, roomTo: number) {
        console.log(`Building room from ${roomFrom} to ${roomTo}`);
    }

    getMaze(): Maze | null {
        return this.currentMaze;
    }

    mazeBuilder(): any {
        return 0;
    }
}

class MazeGame {
    createComplextMaze (builder: MazeBuilder): Maze| null {
        builder.buildMaze()
        builder.buildRoom(1);
        builder.buildRoom(2);
        builder.buildDoor(1, 2)
        return builder.getMaze();
    }
}

const mazeGame = new MazeGame();
mazeGame.createComplextMaze(new StandardMazeBuilder())
console.log(mazeGame);
