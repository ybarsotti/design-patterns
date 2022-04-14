class MazeFactory {
    private static instance: MazeFactory | undefined = undefined;

    protected constructor() {}

    static getInstance(): MazeFactory {
        if (!MazeFactory.instance) MazeFactory.instance = new MazeFactory()
        return MazeFactory.instance;
    }
}

const mF = MazeFactory.getInstance()
const mF2 = MazeFactory.getInstance()
console.log(mF);
console.log(mF2)

if (mF === mF2) console.log(`Same instance`)
else console.log(`Different instance`)
