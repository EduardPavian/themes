class SpriteEffects {
    getInfo() {
        return {
            id: 'spriteEffects',
            name: 'Sprite Effects',
            blocks: [
                {
                    opcode: 'setEffect',
                    blockType: 'command',
                    text: 'set [EFFECT] to [VALUE]',
                    arguments: {
                        EFFECT: {
                            type: 'string',
                            menu: 'effectsMenu'
                        },
                        VALUE: {
                            type: 'number',
                            defaultValue: 50
                        }
                    }
                },
                {
                    opcode: 'clearEffects',
                    blockType: 'command',
                    text: 'clear all effects'
                }
            ],
            menus: {
                effectsMenu: {
                    acceptReporters: true,
                    items: ['blur', 'contrast', 'brightness', 'saturation', 'invert', 'sepia']
                }
            }
        };
    }

    setEffect(args, util) {
        const effectName = args.EFFECT.toLowerCase();
        const value = args.VALUE;
        const target = util.target;

        // Ensure the sprite has a reference to its drawable and renderer
        if (!target.drawableID || !target.runtime.renderer) return;

        const drawable = target.runtime.renderer._allDrawables[target.drawableID];
        if (!drawable) return;

        // Initialize filters if needed
        if (!drawable.filters) {
            drawable.filters = [];
        }

        switch (effectName) {
            case 'blur': {
                let blurFilter = drawable.filters.find(f => f instanceof PIXI.filters.BlurFilter);
                if (!blurFilter) {
                    blurFilter = new PIXI.filters.BlurFilter();
                    drawable.filters.push(blurFilter);
                }
                blurFilter.blur = value / 10; // Adjust scale
                break;
            }
            case 'contrast':
            case 'brightness':
            case 'saturation':
            case 'invert':
            case 'sepia': {
                let colorFilter = drawable.filters.find(f => f instanceof PIXI.filters.ColorMatrixFilter);
                if (!colorFilter) {
                    colorFilter = new PIXI.filters.ColorMatrixFilter();
                    drawable.filters.push(colorFilter);
                }

                switch (effectName) {
                    case 'contrast':
                        colorFilter.contrast(value / 100, false);
                        break;
                    case 'brightness':
                        colorFilter.brightness(value / 100, false);
                        break;
                    case 'saturation':
                        colorFilter.saturate(value / 100, false);
                        break;
                    case 'invert':
                        colorFilter.negative(value / 100, false);
                        break;
                    case 'sepia':
                        colorFilter.sepia(value / 100, false);
                        break;
                }
                break;
            }
            default:
                console.warn(`Unsupported effect: ${effectName}`);
                break;
        }

        target.runtime.renderer.updateDrawableProperties(target.drawableID);
    }

    clearEffects(args, util) {
        const target = util.target;

        if (!target.drawableID || !target.runtime.renderer) return;

        const drawable = target.runtime.renderer._allDrawables[target.drawableID];
        if (!drawable) return;

        drawable.filters = [];
        target.runtime.renderer.updateDrawableProperties(target.drawableID);
    }
}

// Register the extension
Scratch.extensions.register(new SpriteEffects());
