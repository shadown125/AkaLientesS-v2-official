import * as PIXI from 'pixi.js'
import {RGBSplitFilter} from '@pixi/filter-rgb-split';
import '@pixi/filter-displacement';
import type {AbstractRenderer} from "pixi.js";

class AnimatedImagesModule {
    private element: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private canvasWidth: number | undefined;
    private canvasHeight: number | undefined;
    private readonly image: string;
    private app;
    private container = new PIXI.Container();
    private spriteImage: PIXI.Sprite | undefined;
    private renderer: AbstractRenderer | undefined;

    private options = {
        displacementImage: "/displacement.webp",
        displacementScale: 1.35,
        speed: 1.3,
        intensityX: 1.75,
        intensityY: 1.75,
    }

    constructor(element: HTMLDivElement, canvas: HTMLCanvasElement, image: string) {
        this.element = element;
        this.canvas = canvas;
        this.image = image;

        this.app = this.initialisePixi(element)

        this.init();
    }

    private init () {
        PIXI.utils.skipHello();

        window.addEventListener('resize', this.resizeImages.bind(this), {passive: true});
        this.canvas.replaceWith(this.app.view);

        this.canvasWidth = this.element.clientWidth;
        this.canvasHeight = this.element.clientHeight;

        this.renderer = PIXI.autoDetectRenderer({antialias: false, transparent: false, resolution: 1, view: this.app.view});

        this.app.renderer.plugins.interaction.moveWhenInside = true;
        this.app.stage.interactive = true;

        this.app.stage.addChild(this.container);
        this.spriteImage = PIXI.Sprite.from(this.image);

        this.setImage(this.container, this.spriteImage, this.canvasWidth, this.canvasHeight);

        const displacementSprite = PIXI.Sprite.from(this.options.displacementImage);
        displacementSprite.scale.set(this.options.displacementScale);
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        displacementSprite.position = this.spriteImage.position;
        this.app.stage.addChild(displacementSprite);

        const graphics = this.graphics(this.canvasWidth, this.canvasHeight);

        const displacementFilter = new PIXI.filters.DisplacementFilter(
            displacementSprite
        );
        displacementFilter.padding = 20;

        const rgbFilter = new RGBSplitFilter();
        this.spriteImage.filters = [displacementFilter, rgbFilter];

        displacementFilter.scale.x = 15 * this.options.intensityX;
        displacementFilter.scale.y = 25 * this.options.intensityY;

        rgbFilter.red = [0, 0];
        rgbFilter.green = [0, 0];
        rgbFilter.blue = [0, 0];

        let rgbRatio = 0;

        this.app.ticker.add(() => this.ticker(graphics, rgbRatio, rgbFilter, displacementSprite));
    }

    private setImage(container: PIXI.Container<PIXI.DisplayObject>, image: PIXI.Sprite, canvasWidth: number, canvasHeight: number) {
        container.removeChild();
        container.addChild(image);

        image.x = canvasWidth / 2;
        image.y = canvasHeight / 2;
        image.anchor.set(0.5);
        image.scale.x = 0.75;
        image.scale.y = 0.75;

        this.renderer!.resize(canvasWidth, canvasHeight);
    }

    private graphics(canvasWidth: number, canvasHeight: number) {
        const graphics = new PIXI.Graphics();
        graphics.interactive = true;
        graphics.buttonMode = false;

        this.app.stage.addChild(graphics);
        graphics.beginFill(0, 0.001);
        graphics.drawRect(10, 10, canvasWidth - 20, canvasHeight - 20);
        graphics.endFill();

        return graphics;
    }

    private ticker(graphics: PIXI.Graphics, rgbRatio: number, rgbFilter: RGBSplitFilter, displacementSprite: PIXI.Sprite) {
        graphics.on("pointermove", (e) => {
            rgbRatio = e.data.global.x / e.data.global.y;
            rgbFilter.red = [rgbRatio * 2, 0];
            rgbFilter.green = [0, 1];
            rgbFilter.blue = [rgbRatio * 2, 0];
        });
        graphics.on("pointerout", (e) => {
            rgbFilter.red = [0, 0];
            rgbFilter.green = [0, 0];
            rgbFilter.blue = [0, 0];
        });

        displacementSprite.x += this.options.speed;
        if (displacementSprite.x > displacementSprite.width)
            displacementSprite.x = 0;
    }

    private initialisePixi (element: HTMLDivElement) {
        return new PIXI.Application({
            width: element.clientWidth,
            height: element.clientHeight,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1,
            resizeTo: this.element
        });
    }

    private resizeImages () {
        this.app.view.width = this.element.clientWidth;
        this.app.view.height = this.element.clientHeight;

        this.canvasWidth = this.element.clientWidth;
        this.canvasHeight = this.element.clientHeight;

        this.setImage(this.container, this.spriteImage!, this.canvasWidth, this.canvasHeight);
    }
}

export default function animatedImages(element: HTMLDivElement, canvas: HTMLCanvasElement, image: string): AnimatedImagesModule | undefined {
    class AnimatedImages extends AnimatedImagesModule {}

    if (!element) return;

    return new AnimatedImages(element, canvas, image);
}
