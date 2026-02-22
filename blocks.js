/**
 * blocks.js
 * Defines the available blocks, their categories, and structure.
 */

const BLOCK_DEFINITIONS = [
    // --- Events ---
    {
        type: 'event_flag',
        category: 'events',
        label: 'Quando 🏳️ for clicado',
        isStarter: true,
        nextConnection: true
    },
    {
        type: 'event_key',
        category: 'events',
        label: 'Quando a tecla %s for pressionada',
        params: [
            { type: 'text', default: 'espaço', name: 'key' }
        ],
        isStarter: true,
        nextConnection: true
    },
    {
        type: 'event_touch_goal',
        category: 'events',
        label: 'Quando tocar na meta 🏁',
        isStarter: true,
        nextConnection: true
    },
    {
        type: 'event_death',
        category: 'events',
        label: 'Quando morrer 💀',
        isStarter: true,
        nextConnection: true
    },

    // --- Motion ---
    {
        type: 'motion_move',
        category: 'motion',
        label: 'Mova %n passos',
        params: [
            { type: 'number', default: 10, name: 'steps' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_move_back',
        category: 'motion',
        label: 'Ande para trás %n passos',
        params: [
            { type: 'number', default: 10, name: 'steps' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_jump',
        category: 'motion',
        label: 'Pule (Jump)',
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_change_x',
        category: 'motion',
        label: 'Mude x por %n',
        params: [
            { type: 'number', default: 10, name: 'dx' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_set_x',
        category: 'motion',
        label: 'Vá para x: %n',
        params: [
            { type: 'number', default: 0, name: 'x' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_change_y',
        category: 'motion',
        label: 'Mude y por %n',
        params: [
            { type: 'number', default: 10, name: 'dy' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_set_y',
        category: 'motion',
        label: 'Vá para y: %n',
        params: [
            { type: 'number', default: 0, name: 'y' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_turn_right',
        category: 'motion',
        label: 'Gire ↻ %n graus',
        params: [
            { type: 'number', default: 15, name: 'degrees' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_turn_left',
        category: 'motion',
        label: 'Gire ↺ %n graus',
        params: [
            { type: 'number', default: 15, name: 'degrees' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_goto_xy',
        category: 'motion',
        label: 'Vá para x: %n y: %n',
        params: [
            { type: 'number', default: 0, name: 'x' },
            { type: 'number', default: 0, name: 'y' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_glide',
        category: 'motion',
        label: 'Deslize %n segs p/ x: %n y: %n',
        params: [
            { type: 'number', default: 1, name: 'seconds' },
            { type: 'number', default: 0, name: 'x' },
            { type: 'number', default: 0, name: 'y' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'motion_bounce_on_edge',
        category: 'motion',
        label: 'Se tocar na borda, volte',
        prevConnection: true,
        nextConnection: true
    },

    // --- Looks ---
    {
        type: 'looks_say',
        category: 'looks',
        label: 'Diga %s por %n segs',
        params: [
            { type: 'text', default: 'Olá!', name: 'message' },
            { type: 'number', default: 2, name: 'seconds' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'looks_show',
        category: 'looks',
        label: 'Mostre',
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'looks_hide',
        category: 'looks',
        label: 'Esconda',
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'looks_change_color',
        category: 'looks',
        label: 'Mude cor em %n',
        params: [
            { type: 'number', default: 25, name: 'amount' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'looks_set_size',
        category: 'looks',
        label: 'Mude tamanho para %n %',
        params: [
            { type: 'number', default: 100, name: 'size' }
        ],
        prevConnection: true,
        nextConnection: true
    },

    // --- Sound ---
    {
        type: 'sound_play_beep',
        category: 'sound',
        label: 'Tocar som Pop',
        prevConnection: true,
        nextConnection: true
    },

    // --- Control ---
    {
        type: 'control_wait',
        category: 'control',
        label: 'Espere %n segs',
        params: [
            { type: 'number', default: 1, name: 'seconds' }
        ],
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'control_repeat',
        category: 'control',
        label: 'Repita %n vezes',
        params: [
            { type: 'number', default: 10, name: 'times' }
        ],
        hasNested: true, // Can contain other blocks
        prevConnection: true,
        nextConnection: true
    },
    {
        type: 'control_forever',
        category: 'control',
        label: 'Sempre',
        hasNested: true,
        prevConnection: true,
        nextConnection: false // Cannot have blocks after it (usually)
    }
];

class BlockFactory {
    static createBlockElement(blockData) {
        const block = document.createElement('div');
        block.className = 'block';
        block.dataset.type = blockData.type;
        block.dataset.category = blockData.category;

        // Add notches visualally
        if (blockData.prevConnection || !blockData.isStarter) {
            const notchTop = document.createElement('div');
            notchTop.className = 'block-notch-top';
            block.appendChild(notchTop);
        }

        if (blockData.nextConnection !== false) {
            const notchBottom = document.createElement('div');
            notchBottom.className = 'block-notch-bottom';
            block.appendChild(notchBottom);
        }

        // Parse label and inputs
        this.parseLabelParts(blockData, block);

        return block;
    }

    static parseLabelParts(blockData, blockEl) {
        let labelText = blockData.label;
        const params = blockData.params || [];
        let paramIndex = 0;

        // Split by %n or %s placeholders
        const parts = labelText.split(/(%[ns])/g);

        parts.forEach(part => {
            if (part === '%n' || part === '%s') {
                if (paramIndex < params.length) {
                    const paramElement = this.createInputElement(params[paramIndex]);
                    blockEl.appendChild(paramElement);
                    paramIndex++;
                }
            } else if (part !== '') {
                const textSpan = document.createElement('span');
                textSpan.textContent = part;
                blockEl.appendChild(textSpan);
            }
        });
    }

    static createInputElement(param) {
        const input = document.createElement('input');
        input.className = 'block-input';
        input.type = param.type === 'number' ? 'number' : 'text';
        input.value = param.default;
        input.name = param.name;

        // Prevent drag from starting when interacting with inputs
        input.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });

        return input;
    }
}
