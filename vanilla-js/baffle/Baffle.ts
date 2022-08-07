import { each, extend, getElements } from "./utils";
import Obfuscator from "./Obfuscator";

class BaffleModule {
    private readonly elements: any;
    private defaults = {
        characters: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",
        exclude: [" "],
        speed: 50,
    };
    private readonly options: any;
    private running: boolean;
    private interval: NodeJS.Timer | undefined;

    constructor(element: string, options?: object) {
        this.options = extend(Object.create(this.defaults), options);
        this.elements = getElements(element).map(Obfuscator);
        this.running = false;
    }

    private once() {
        each(this.elements, (el: any) => el.write(this.options.characters, this.options.exclude));
        this.running = true;
        return this;
    }

    public start() {
        clearInterval(this.interval);
        each(this.elements, (el: any) => el.init());
        this.interval = setInterval(() => this.once(), this.options.speed);
        this.running = true;
        return this;
    }

    private stop() {
        clearInterval(this.interval);
        this.running = false;
        return this;
    }

    public set(opts: object) {
        extend(this.options, opts);
        if (this.running) this.start();
        return this;
    }

    public reveal(duration = 0, delay = 0) {
        let cycles = duration / this.options.speed || 1;

        const run = () => {
            clearInterval(this.interval);
            this.running = true;
            this.interval = setInterval(() => {
                let elements = this.elements.filter((el: any) => !el.bitmap.every((bit: any) => !bit));

                each(elements, (el: any) => {
                    let pace = Math.ceil(el.value.length / cycles);
                    el.decay(pace).write(this.options.characters, this.options.exclude);
                });

                if (!elements.length) {
                    this.stop();
                    each(this.elements, (el: any) => el.init());
                }
            }, this.options.speed);
        };

        setTimeout(run, delay);
        return this;
    }
}

export default function baffle(element: string, options?: object): BaffleModule | undefined {
    class baffle extends BaffleModule {}

    return new baffle(element, options);
}
