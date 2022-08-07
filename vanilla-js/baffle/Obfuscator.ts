import { getTruthyIndices, mapString, sample } from "./utils";

class ObfuscatorModule {
    private value;
    private bitmap: { [x: string]: number } | undefined;

    constructor(str: any) {
        this.value = str;
        this.init();
    }

    init() {
        this.bitmap = this.value.split("").map(() => 1);
        return this;
    }

    render(characters = [], exclude = []) {
        if (!characters.length) return this.value;
        return mapString(this.value, (char: never, index: string | number) => {
            if (exclude.indexOf(char) > -1) return char;

            return this.bitmap![index] ? sample(characters) : char;
        });
    }

    decay(count = 1) {
        while (count--) {
            let on = getTruthyIndices(this.bitmap);
            this.bitmap![sample(on)] = 0;
        }
        return this;
    }

    text(str = this.value) {
        this.value = str;
        this.init();
        return this;
    }
}

class ObfuscatorElementModule extends ObfuscatorModule {
    private element;

    constructor(element: any) {
        super(element.textContent);
        this.element = element;
    }

    write(chars: never[] | undefined, exclude: never[] | undefined) {
        this.element.textContent = this.render(chars, exclude);
        return this;
    }
}

export default function Obfuscator(element: string): ObfuscatorElementModule | undefined {
    class ObfuscatorElement extends ObfuscatorElementModule {}

    return new ObfuscatorElement(element);
}
