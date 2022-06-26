import * as PIXI from 'pixi.js';
import block from '../images/block.jpg';
import background from '../images/background.png';

import { Block } from './test_block';
import { Background } from './background';

export class Game {

    public pixiWidth = 800;
    public pixiHeight = 500;

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    private blocks : Block[];
    private background : Background;

    public gameArray : Array<PIXI.Sprite>;

    constructor() {
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        document.body.appendChild(this.pixi.view);

        this.blocks = [];
        this.gameArray = [];

        this.loader = new PIXI.Loader();
        this.loader.add('blockTexture', block);
        this.loader.add('backgroundTexture', background);
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted() {
        this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixiWidth, this.pixiHeight);
        this.pixi.stage.addChild(this.background);

        // Adding blocks
        this.createBlock(300, 300);
        this.createBlock(100, 100);
        console.log('lol');
    }

    private createBlock(x: number, y: number){
        let block = new Block(this.loader.resources["blockTexture"].texture!);
        block.x = x;
        block.y = y;
        this.blocks.push(block);
        this.gameArray.push(block);
        this.pixi.stage.addChild(block);
    }
}

new Game();