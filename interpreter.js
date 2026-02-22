/**
 * interpreter.js
 * Parses and executes block stacks.
 */

class Interpreter {
    constructor(stage) {
        this.stage = stage;
        this.isRunning = false;
        this.executionQueue = [];
        this.activeTimeouts = [];
    }

    /**
     * Start executing all 'When Flag Clicked' stacks
     */
    run() {
        if (this.isRunning) this.stop();
        this.isRunning = true;
        this.log('Iniciando programa...');

        // 1. Execute "When Flag Clicked"
        const workspace = document.getElementById('workspace-area');
        const flagBlocks = Array.from(workspace.querySelectorAll('.workspace-block'))
            .filter(el => el.dataset.type === 'event_flag');

        flagBlocks.forEach(root => this.executeStack(root));

        // 2. Setup Continuous Key State for "When Key Pressed"
        // Track which keys are currently held down
        this._heldKeys = new Set();
        this._activeKeyStacks = new Set(); // prevent duplicate stack execution

        this.keydownListener = (e) => {
            if (!this.isRunning) return;
            this._heldKeys.add(e.key);
        };
        this.keyupListener = (e) => {
            this._heldKeys.delete(e.key);
        };
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);

        // Poll held keys every frame and fire matching event_key stacks
        this._keyPollRunning = true;
        const KEY_POLL_MS = 60; // Fire stacks every 60ms while key held
        let lastKeyPoll = 0;

        const keyPollLoop = (ts) => {
            if (!this._keyPollRunning || !this.isRunning) return;

            if (ts - lastKeyPoll >= KEY_POLL_MS && this._heldKeys.size > 0) {
                lastKeyPoll = ts;

                const keyMap = {
                    ' ': 'espaço',
                    'ArrowUp': 'seta cima',
                    'ArrowDown': 'seta baixo',
                    'ArrowLeft': 'seta esquerda',
                    'ArrowRight': 'seta direita',
                    'w': 'w', 'a': 'a', 's': 's', 'd': 'd'
                };

                for (const rawKey of this._heldKeys) {
                    const keyName = keyMap[rawKey] || rawKey.toLowerCase();

                    const keyBlocks = Array.from(workspace.querySelectorAll('.workspace-block'))
                        .filter(el => el.dataset.type === 'event_key');

                    keyBlocks.forEach(block => {
                        const params = this.getBlockParams(block);
                        if (params.key.toLowerCase() === keyName) {
                            // Prevent stacking: skip if this block is already executing
                            const blockId = block.dataset.type + '_' + block.style.cssText;
                            if (!this._activeKeyStacks.has(block)) {
                                this._activeKeyStacks.add(block);
                                this.executeStack(block).finally(() => {
                                    this._activeKeyStacks.delete(block);
                                });
                            }
                        }
                    });
                }
            }
            requestAnimationFrame(keyPollLoop);
        };
        requestAnimationFrame(keyPollLoop);

        // 3. Start Goal Collision Checker (polls every frame)
        this.stage.goalReached = false;
        this._goalCheckRunning = true;
        const goalCheckLoop = () => {
            if (!this._goalCheckRunning || !this.isRunning) return;
            if (!this.stage.goalReached && this.stage.checkGoalCollision()) {
                this.stage.goalReached = true;
                this.log('🏁 Meta alcançada!', 'info');
                const goalBlocks = Array.from(workspace.querySelectorAll('.workspace-block'))
                    .filter(el => el.dataset.type === 'event_touch_goal');
                goalBlocks.forEach(root => this.executeStack(root));
            }
            requestAnimationFrame(goalCheckLoop);
        };
        requestAnimationFrame(goalCheckLoop);

        // 4. Start Enemy Collision Checker (polls every frame)
        this.stage.playerDead = false;
        this._enemyCheckRunning = true;
        const enemyCheckLoop = () => {
            if (!this._enemyCheckRunning || !this.isRunning) return;
            if (!this.stage.playerDead && this.stage.checkEnemyCollision()) {
                this.stage.playerDead = true;
                this.log('💀 Morreu! Voltando ao início...', 'error');

                this.stage.sprite.x = 0;
                this.stage.sprite.y = 0;
                this.stage.camera.x = 0;
                this.stage.camera.y = 0;

                const deathBlocks = Array.from(workspace.querySelectorAll('.workspace-block'))
                    .filter(el => el.dataset.type === 'event_death');
                deathBlocks.forEach(root => this.executeStack(root));

                setTimeout(() => {
                    this.stage.playerDead = false;
                }, 500);
            }
            requestAnimationFrame(enemyCheckLoop);
        };
        requestAnimationFrame(enemyCheckLoop);

        if (flagBlocks.length === 0) {
            this.log('Info: Aguardando eventos de tecla...', 'info');
        }
    }

    stop() {
        this.isRunning = false;
        this._goalCheckRunning = false;
        this._enemyCheckRunning = false;
        this._keyPollRunning = false;
        this._heldKeys = new Set();
        this._activeKeyStacks = new Set();
        this.activeTimeouts.forEach(t => clearTimeout(t));
        this.activeTimeouts = [];
        if (this.keydownListener) {
            document.removeEventListener('keydown', this.keydownListener);
            this.keydownListener = null;
        }
        if (this.keyupListener) {
            document.removeEventListener('keyup', this.keyupListener);
            this.keyupListener = null;
        }
        this.log('🛑 Programa parado.', 'info');
    }

    log(message, type = 'system') {
        const consoleEl = document.getElementById('console-output');
        if (!consoleEl) return;
        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.textContent = message;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }


    async executeStack(startBlock) {
        let currentBlock = startBlock;

        try {
            while (currentBlock && this.isRunning) {
                // Highlight (Visual feedback)
                this.highlightBlock(currentBlock, true);

                // Execute
                const result = await this.executeBlock(currentBlock);

                if (result === 'LOOP_RESET') {
                    currentBlock = this.getNextBlock(startBlock);
                    await this.wait(0);
                    continue;
                }

                if (result === 'SKIP_REMAINING') {
                    // Repeat block already executed all following siblings
                    break;
                }

                // Unhighlight
                if (this.isRunning) this.highlightBlock(currentBlock, false);

                // Move next
                currentBlock = this.getNextBlock(currentBlock);

                // Yield to UI (Super fast for smooth movement)
                await this.wait(1);
            }
        } catch (err) {
            this.log(`❌ Erro: ${err.message}`, 'error');
            console.error(err);
            this.stop();
        }
    }

    async executeBlock(blockEl) {
        if (!this.isRunning) return;

        const type = blockEl.dataset.type;
        const params = this.getBlockParams(blockEl);

        switch (type) {
            case 'event_flag': break;
            case 'event_key': break; // Trigger handled by listener
            case 'event_touch_goal': break; // Trigger handled by goal checker
            case 'event_death': break; // Trigger handled by enemy checker

            // Motion - Relative
            case 'motion_move': await this.smoothMove(Number(params.steps)); break;
            case 'motion_move_back': await this.smoothMove(-Number(params.steps)); break;
            case 'motion_jump': await this.jump(); break;
            case 'motion_change_x': this.stage.sprite.x += Number(params.dx); this.stage.updateUI(); break;
            case 'motion_change_y': this.stage.sprite.y += Number(params.dy); this.stage.updateUI(); break;

            // Motion - Absolute
            case 'motion_set_x': this.stage.sprite.x = Number(params.x); this.stage.updateUI(); break;
            case 'motion_set_y': this.stage.sprite.y = Number(params.y); this.stage.updateUI(); break;
            case 'motion_goto_xy': this.stage.gotoXY(Number(params.x), Number(params.y)); break;

            // Motion - Rotation
            case 'motion_turn_right': this.stage.turnRight(Number(params.degrees)); break;
            case 'motion_turn_left': this.stage.turnLeft(Number(params.degrees)); break;
            case 'motion_bounce_on_edge': this.stage.bounceOnEdge(); break;

            case 'motion_glide':
                await this.handleGlide(Number(params.seconds), Number(params.x), Number(params.y));
                break;

            // Looks
            case 'looks_say':
                this.stage.say(params.message, Number(params.seconds));
                if (Number(params.seconds) > 0) await this.wait(Number(params.seconds) * 1000);
                break;
            case 'looks_change_color': this.stage.changeColor(Number(params.amount)); break;
            case 'looks_set_size': this.stage.setSize(Number(params.size)); break;
            case 'looks_show': this.stage.show(); break;
            case 'looks_hide': this.stage.hide(); break;

            // Sound
            case 'sound_play_beep': this.stage.playPop(); break;

            // Control
            case 'control_wait': await this.wait(Number(params.seconds) * 1000); break;
            case 'control_repeat': await this.handleRepeat(blockEl, params); break;
            case 'control_forever': return 'LOOP_RESET';
        }
    }

    async smoothMove(steps) {
        // Validation
        if (isNaN(steps)) steps = 0;

        const rad = (this.stage.sprite.direction - 90) * (Math.PI / 180);
        const targetX = this.stage.sprite.x + steps * Math.cos(rad);
        const targetY = this.stage.sprite.y + steps * Math.sin(rad);

        // Glide for 200ms for "smoothness"
        await this.handleGlide(0.2, targetX, targetY);
    }

    async jump() {
        if (this.isJumping) return; // Prevent double jump / flying
        this.isJumping = true;

        // Simple Jump Arc: Up 60px, Wait, Down 60px
        const startY = this.stage.sprite.y;
        const jumpHeight = 60;

        // Up (only affect Y, allow X to change via other blocks)
        await this.glideY(0.3, startY + jumpHeight);

        // Tiny hang time
        await this.wait(50);

        // Down
        await this.glideY(0.3, startY);

        this.isJumping = false;

        // Correction to exact ground
        this.stage.sprite.y = startY;
        this.stage.updateUI();
    }

    async glideY(seconds, targetY) {
        const startY = this.stage.sprite.y;
        const startTime = Date.now();
        const duration = seconds * 1000;

        return new Promise(resolve => {
            const loop = () => {
                if (!this.isRunning) { resolve(); return; }

                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const currentY = startY + (targetY - startY) * progress;

                // Collision Check
                if (this.stage.checkCollision({ x: this.stage.sprite.x, y: currentY })) {
                    // Hit something! Stop immediately.
                    // If moving down, we landed. If moving up, we hit head.
                    resolve();
                    return;
                }

                // Only update Y, preserve current X (allowing movement)
                this.stage.gotoXY(this.stage.sprite.x, currentY);

                if (progress < 1) {
                    requestAnimationFrame(loop);
                } else {
                    resolve();
                }
            };
            loop();
        });
    }

    // Placeholder for loops (simplification for MVP)
    async handleGlide(seconds, targetX, targetY) {
        const startX = this.stage.sprite.x;
        const startY = this.stage.sprite.y;
        const startTime = Date.now();
        const duration = seconds * 1000;

        return new Promise(resolve => {
            const loop = () => {
                if (!this.isRunning) { resolve(); return; }

                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Linear Interpolation
                const currentX = startX + (targetX - startX) * progress;
                const currentY = startY + (targetY - startY) * progress;

                // Collision Check
                if (this.stage.checkCollision({ x: currentX, y: currentY })) {
                    // Hit wall! Stop.
                    resolve();
                    return;
                }

                this.stage.gotoXY(currentX, currentY);

                if (progress < 1) {
                    requestAnimationFrame(loop);
                } else {
                    resolve();
                }
            };
            loop();
        });
    }

    async handleRepeat(blockEl, params) {
        const times = Math.max(0, Math.floor(Number(params.times) || 0));
        this.log(`🔁 Repetindo ${times} vezes...`, 'system');

        // Collect all sibling blocks after this repeat block
        const blocksToRepeat = [];
        let sibling = blockEl.nextElementSibling;
        let previousBlock = blockEl; // validation reference

        while (sibling) {
            if (sibling.classList.contains('workspace-block') && !sibling.classList.contains('dragging')) {
                // STOP if Starter Block
                const type = sibling.dataset.type;
                if (type === 'event_flag' || type === 'event_key' || type === 'event_touch_goal' || type === 'event_death') break;

                // STOP if Disconnected
                const prevRect = previousBlock.getBoundingClientRect();
                const currRect = sibling.getBoundingClientRect();
                const vDist = currRect.top - prevRect.bottom;
                const hDist = Math.abs(currRect.left - prevRect.left);

                if (vDist > 20 || hDist > 20) break;

                blocksToRepeat.push(sibling);
                previousBlock = sibling;
            }
            sibling = sibling.nextElementSibling;
        }

        if (blocksToRepeat.length === 0) {
            this.log('⚠️ Nenhum bloco para repetir.', 'info');
            return;
        }

        for (let i = 0; i < times; i++) {
            if (!this.isRunning) break;

            for (const block of blocksToRepeat) {
                if (!this.isRunning) break;

                this.highlightBlock(block, true);
                await this.executeBlock(block);
                this.highlightBlock(block, false);
                await this.wait(1); // Yield to UI
            }

            // Small yield between iterations
            await this.wait(10);
        }

        // Skip past the blocks we already executed so executeStack doesn't re-run them
        // We do this by removing them from the "next" chain temporarily
        // Actually, the cleaner approach: return a signal to skip remaining siblings
        return 'SKIP_REMAINING';
    }
    async handleForever(blockEl) {
        // Handled in executeStack via return value
    }

    getNextBlock(blockEl) {
        // 1. Get next DOM sibling
        let next = blockEl.nextElementSibling;

        // Loop through siblings until a valid block is found or end of list
        while (next) {
            if (next.classList.contains('workspace-block') && !next.classList.contains('dragging')) {

                // CHECK 1: Is it a Starter Block? (Start of new stack)
                const type = next.dataset.type;
                if (type === 'event_flag' || type === 'event_key' || type === 'event_touch_goal' || type === 'event_death') {
                    return null; // Do not cross into a new stack
                }

                // CHECK 2: Is it visually connected? (Snapped)
                // We use getBoundingClientRect to check if they are "touching"
                const currentRect = blockEl.getBoundingClientRect();
                const nextRect = next.getBoundingClientRect();

                // Check vertical gap (should be close to 0 or overlapping due to notch)
                // We allow a small tolerance (e.g. 25px) to account for notch overlap and CSS specifics
                const verticalDist = nextRect.top - currentRect.bottom;
                const horizontalDist = Math.abs(nextRect.left - currentRect.left);

                // If gap is too large (> 20px) or horizontal misalignment (> 20px), they are not snapped
                // Note: negative verticalDist means overlap, which is fine for notches
                if (verticalDist > 20 || horizontalDist > 20) {
                    return null; // Disconnected
                }

                return next;
            }
            next = next.nextElementSibling;
        }
        return null; // No more blocks
    }

    getBlockParams(blockEl) {
        const inputs = blockEl.querySelectorAll('input');
        const params = {};
        inputs.forEach(input => {
            params[input.name] = input.value;
        });
        return params;
    }

    highlightBlock(blockEl, active) {
        if (active) blockEl.style.boxShadow = '0 0 0 4px rgba(255, 255, 0, 0.5)';
        else blockEl.style.boxShadow = '';
    }

    wait(ms) {
        return new Promise(resolve => {
            if (!this.isRunning) {
                resolve();
                return;
            }
            const t = setTimeout(() => {
                this.activeTimeouts = this.activeTimeouts.filter(id => id !== t); // Cleanup
                resolve();
            }, ms);
            this.activeTimeouts.push(t);
        });
    }
}
