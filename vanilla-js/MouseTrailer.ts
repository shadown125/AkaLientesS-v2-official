type options = {
    spring: number;
};

type target = {
    x: number;
    y: number;
};

type settings = {
    friction: number;
    trails: number;
    size: number;
    dampening: number;
    tension: number;
};

class Node {
    public x = 0;
    public y = 0;
    public vy = 0;
    public vx = 0;
}

class Tendril {
    private spring: number = 0;
    private nodes: Array<Node> = [];

    private options: options;
    private target: target;
    private settings: settings;
    private friction: number = 0;

    constructor(options: options, target: target, settings: settings) {
        this.options = options;
        this.target = target;
        this.settings = settings;

        this.init();
    }

    private init() {
        this.spring = this.options.spring + Math.random() * 0.1 - 0.05;
        this.friction = this.settings.friction + Math.random() * 0.01 - 0.005;
        this.nodes = [];

        for (let i = 0, node; i < this.settings.size; i++) {
            node = new Node();
            node.x = this.target.x;
            node.y = this.target.y;

            this.nodes.push(node);
        }
    }

    public update() {
        let spring = this.spring;
        let node = this.nodes[0];

        node.vx += (this.target.x - node.x) * spring;
        node.vy += (this.target.y - node.y) * spring;

        for (let prev, i = 0, n = this.nodes.length; i < n; i++) {
            node = this.nodes[i];

            if (i > 0) {
                prev = this.nodes[i - 1];

                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * this.settings.dampening;
                node.vy += prev.vy * this.settings.dampening;
            }
            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;

            spring *= this.settings.tension;
        }
    }

    public draw(ctx: HTMLCanvasElement | any) {
        let x = this.nodes[0].x,
            y = this.nodes[0].y,
            a,
            b,
            index = 0;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1, n = this.nodes.length - 2; i < n; i++) {
            a = this.nodes[i];
            b = this.nodes[i + 1];
            x = (a.x + b.x) * 0.5;
            y = (a.y + b.y) * 0.5;

            ctx.quadraticCurveTo(a.x, a.y, x, y);
            index = i;
        }
        a = this.nodes[index];
        b = this.nodes[index + 1];

        ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
        ctx.stroke();
        ctx.closePath();
    }
}

class MouseTrailerModule {
    private readonly ctx: HTMLCanvasElement | any;
    private readonly canvas: HTMLCanvasElement;
    private tendrils: Array<Tendril> = [];
    private target: target = { x: 0, y: 0 };

    private settings: settings = {
        friction: 0.5,
        trails: 30,
        size: 30,
        dampening: 0.27,
        tension: 0.98,
    };

    constructor(element: HTMLCanvasElement) {
        this.canvas = element;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.running = true;
        this.ctx.frame = 1;

        this.init();
    }

    private init() {
        document.body.addEventListener("orientationchange", this.resize.bind(this), { passive: true });
        window.addEventListener("resize", this.resize.bind(this), { passive: true });
        document.addEventListener("mousemove", this.mousemove.bind(this), { passive: true });
        document.addEventListener("touchstart", this.touchstart.bind(this), { passive: true });
        window.addEventListener("focus", this.start.bind(this), { passive: true });
        window.addEventListener("blur", this.stop.bind(this), { passive: true });

        this.reset();
        this.loop();
        this.resize();
    }

    private loop() {
        if (!this.ctx.running) return;

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
        this.ctx.globalCompositeOperation = "lighter";
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "rgb(0 255 255 / 87%)";

        for (let i = 0, tendril; i < this.settings.trails; i++) {
            tendril = this.tendrils[i];
            tendril.update();
            tendril.draw(this.ctx);
        }

        this.ctx.frame++;
        requestAnimationFrame(() => this.loop());
    }

    private resize() {
        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private start() {
        if (!this.ctx.running) {
            this.ctx.running = true;
            this.loop();
        }
    }

    private stop() {
        this.ctx.running = false;
    }

    private mousemove(event: any) {
        if (event.touches) {
            this.target.x = event.touches[0].pageX;
            this.target.y = event.touches[0].pageY;
        } else {
            this.target.x = event.clientX;
            this.target.y = event.clientY;
        }
    }

    private touchstart(event: any) {
        if (event.touches.length == 1) {
            this.target.x = event.touches[0].pageX;
            this.target.y = event.touches[0].pageY;
        }
    }

    private reset() {
        this.tendrils = [];

        for (let i = 0; i < this.settings.trails; i++) {
            this.tendrils.push(
                new Tendril(
                    {
                        spring: 0.45 + 0.025 * (i / this.settings.trails),
                    },
                    this.target,
                    this.settings,
                ),
            );
        }
    }
}

export default function mouseTrailer(element: HTMLCanvasElement): MouseTrailerModule | undefined {
    class MouseTrailer extends MouseTrailerModule {}

    if (!element) {
        return;
    }

    return new MouseTrailer(element);
}
