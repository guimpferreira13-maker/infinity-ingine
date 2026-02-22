/**
 * stage.js
 * Handles the 2D canvas and sprite rendering.
 */

class Stage {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Sprite state
        this.sprite = {
            x: 0,
            y: 0,
            direction: 90,
            size: 100,
            visible: true,
            colorEffect: 0,
            bubbleText: null,
            bubbleTimer: null,
            visible: true,
            colorEffect: 0,
            bubbleText: null,
            bubbleTimer: null,
            image: null // NEW: Custom image
        };

        this.obstacles = []; // Level Editor Objects
        this.goals = [];     // Goal/Finish tiles
        this.enemies = [];   // Enemy tiles
        this.enemyImage = null; // Custom enemy sprite

        // Grid constants: tiles extend FORWARD (right) from character start
        this.TILE_SIZE = 24;
        this.GRID_COLS = 80;  // Wide grid for long levels
        this.GRID_ROWS = 15;
        this.GRID_OFFSET_X = -(3 * this.TILE_SIZE); // Character starts at ~column 3
        this.GRID_OFFSET_Y = (this.GRID_ROWS * this.TILE_SIZE) / 2;  // Center vertically (Cartesian)

        this.background = {
            image: null,
            color: '#ffffff'
        };

        this.camera = { x: 0, y: 0 }; // Camera

        this.init();
    }

    init() {
        // Start render loop
        this.renderLoop = this.renderLoop.bind(this);
        requestAnimationFrame(this.renderLoop);
    }

    // --- Sprite Actions ---

    moveSteps(steps) {
        if (isNaN(steps)) steps = 0;

        // Convert direction to radians
        const radians = (this.sprite.direction - 90) * (Math.PI / 180);
        this.sprite.x += steps * Math.cos(radians);
        this.sprite.y += steps * Math.sin(radians);

        // Safety check
        if (isNaN(this.sprite.x)) this.sprite.x = 0;
        if (isNaN(this.sprite.y)) this.sprite.y = 0;

        // REMOVED: this.clampPosition(); -> Allow infinite movement
        this.updateUI();
    }

    turnRight(degrees) {
        this.sprite.direction += degrees;
        this.updateUI();
    }

    turnLeft(degrees) {
        this.sprite.direction -= degrees;
        this.updateUI();
    }

    gotoXY(x, y) {
        // Prevent NaN poisoning
        if (isNaN(x) || isNaN(y)) {
            console.warn('Attempted to go to NaN coordinates:', x, y);
            return;
        }

        // Standard Scratch/Cartesian: Center is 0,0. Y goes UP.
        // Canvas: Top-Left is 0,0. Y goes DOWN.
        // We maintain Cartesian in sprite.x/y and render logic handles the translation.

        this.sprite.x = x;
        this.sprite.y = y;
        this.updateUI();
    }

    changeColor(amount) {
        this.sprite.colorEffect = (this.sprite.colorEffect + amount) % 360;
    }

    say(text, seconds) {
        this.sprite.bubbleText = text;

        if (this.sprite.bubbleTimer) clearTimeout(this.sprite.bubbleTimer);

        if (seconds > 0) {
            this.sprite.bubbleTimer = setTimeout(() => {
                this.sprite.bubbleText = null;
            }, seconds * 1000);
        }
    }

    show() { this.sprite.visible = true; }
    hide() { this.sprite.visible = false; }

    reset() {
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.camera.x = 0;
        this.camera.y = 0;
        this.sprite.direction = 90;
        this.sprite.visible = true;
        this.sprite.colorEffect = 0;
        this.sprite.bubbleText = null;
        this.goalReached = false;
        this.playerDead = false;
        this.updateUI();
    }

    // --- Camera Logic ---
    updateCamera() {
        // Smoothly follow the sprite (lerp)
        this.camera.x += (this.sprite.x - this.camera.x) * 0.15;
        this.camera.y += (this.sprite.y - this.camera.y) * 0.15;
    }

    // --- New Actions ---

    bounceOnEdge() {
        const bounds = {
            left: -this.width / 2,
            right: this.width / 2,
            top: this.height / 2,
            bottom: -this.height / 2
        };

        // Simple bounding box check (assuming center origin)
        let hit = false;

        if (this.sprite.x < bounds.left) {
            this.sprite.x = bounds.left;
            this.sprite.direction = 90; // Face right
            hit = true;
        } else if (this.sprite.x > bounds.right) {
            this.sprite.x = bounds.right;
            this.sprite.direction = -90; // Face left
            hit = true;
        }

        if (this.sprite.y > bounds.top) {
            this.sprite.y = bounds.top;
            this.sprite.direction = 180; // Face down
            hit = true;
        } else if (this.sprite.y < bounds.bottom) {
            this.sprite.y = bounds.bottom;
            this.sprite.direction = 0; // Face up
            hit = true;
        }

        if (hit) this.updateUI();
    }

    setSize(percent) {
        this.sprite.size = Math.max(1, percent); // Min 1%
        this.updateUI();
    }

    playPop() {
        // Simple oscillator beep
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }

    // --- Helpers ---

    clampPosition() {
        // Optional: Keep sprite within bounds? Scratch allows going off-screen partially.
    }

    updateUI() {
        document.getElementById('prop-x').value = Math.round(this.sprite.x);
        document.getElementById('prop-y').value = Math.round(this.sprite.y);
        document.getElementById('prop-dir').value = Math.round(this.sprite.direction);
    }

    // --- Background ---

    setBackground(url) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            this.background.image = img;
        };
    }

    // --- Rendering ---

    renderLoop() {
        this.updateCamera(); // Update camera every frame

        try {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.drawBackground();
            this.drawObstacles();
            this.drawGoals();
            this.drawEnemies();

            if (this.sprite.visible) {
                this.drawSprite();
            }
        } catch (err) {
            console.error('Render Loop Error:', err);
        }

        requestAnimationFrame(this.renderLoop);
    }

    drawBackground() {
        const W = this.width;
        const H = this.height;
        const cx = W / 2;
        const cy = H / 2;

        if (this.background.image) {
            // --- IMAGE: fill canvas with solid color first, then tile the image ---
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, W, H);

            const bgW = 480;
            const bgH = 360;
            const offX = Math.floor(-(this.camera.x % bgW));
            const offY = Math.floor(this.camera.y % bgH);

            for (let col = -1; col <= 1; col++) {
                for (let row = -1; row <= 1; row++) {
                    this.ctx.drawImage(this.background.image,
                        offX + col * bgW, offY + row * bgH,
                        bgW, bgH);
                }
            }

        } else if (this.background.type === 'platformer') {
            // --- PLATFORMER THEME: scrolling sky + ground ---
            // Sky
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, W, H);

            // Ground: world Y=0 is the origin → ground starts at canvas center
            // Ground top in screen coords: cy - (0 - camera.y) = cy + camera.y
            const groundTopScreen = cy + this.camera.y;
            const groundHeight = 60;

            if (groundTopScreen < H) {
                this.ctx.fillStyle = '#4CAF50';
                this.ctx.fillRect(0, groundTopScreen, W, groundHeight);
                this.ctx.fillStyle = '#388E3C';
                this.ctx.fillRect(0, groundTopScreen, W, 6); // Grass line
            }

            // Clouds (decorative, slow parallax)
            this.ctx.fillStyle = 'rgba(255,255,255,0.85)';
            const cloudOffX = (-(this.camera.x * 0.3) % (W + 120) + W + 120) % (W + 120);
            [[cloudOffX - 60, 60], [cloudOffX + 140, 40], [cloudOffX - 200, 80]].forEach(([cx_, cy_]) => {
                this.ctx.beginPath();
                this.ctx.arc(cx_, cy_, 30, 0, Math.PI * 2);
                this.ctx.arc(cx_ + 35, cy_ - 10, 25, 0, Math.PI * 2);
                this.ctx.arc(cx_ - 25, cy_ + 5, 20, 0, Math.PI * 2);
                this.ctx.fill();
            });

        } else {
            // --- SOLID COLOR (default or custom) with scrolling reference grid ---
            this.ctx.fillStyle = this.background.color || '#ffffff';
            this.ctx.fillRect(0, 0, W, H);

            const GRID = 40;
            const offX = ((-this.camera.x % GRID) + GRID) % GRID;
            const offY = ((this.camera.y % GRID) + GRID) % GRID;

            this.ctx.save();
            this.ctx.strokeStyle = 'rgba(0,0,0,0.07)';
            this.ctx.lineWidth = 1;
            for (let x = offX; x <= W; x += GRID) {
                this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, H); this.ctx.stroke();
            }
            for (let y = offY; y <= H; y += GRID) {
                this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(W, y); this.ctx.stroke();
            }
            this.ctx.restore();
        }
    }

    drawGrid() {
        // Optional: draw faint axis lines
        this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        this.ctx.lineWidth = 1;

        // Center lines
        const cx = this.width / 2;
        const cy = this.height / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, 0);
        this.ctx.lineTo(cx, this.height);
        this.ctx.moveTo(0, cy);
        this.ctx.lineTo(this.width, cy);
        this.ctx.stroke();
    }

    // --- Sprite Customization ---
    setSpriteImage(dataURL) {
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            if (this.sprite.image) this.sprite.image = null; // Clear old
            this.sprite.image = img;
        };
    }

    // --- Obstacles & Goals (Level Editor) ---
    setObstacles(data) {
        this.obstacles = data || [];
    }

    setGoals(data) {
        this.goals = data || [];
    }

    setEnemies(data) {
        this.enemies = data || [];
    }

    setEnemyImage(dataURL) {
        if (!dataURL) { this.enemyImage = null; return; }
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            this.enemyImage = img;
        };
    }

    // Convert tile grid position to Cartesian world position
    tileToWorld(col, row) {
        return {
            x: this.GRID_OFFSET_X + col * this.TILE_SIZE,
            y: this.GRID_OFFSET_Y - row * this.TILE_SIZE
        };
    }

    // Convert Cartesian world position to screen position
    worldToScreen(wx, wy) {
        return {
            x: this.width / 2 + (wx - this.camera.x),
            y: this.height / 2 - (wy - this.camera.y)
        };
    }

    drawObstacles() {
        if (!this.obstacles || this.obstacles.length === 0) return;

        const T = this.TILE_SIZE;

        this.obstacles.forEach(obs => {
            const world = this.tileToWorld(obs.c, obs.r);
            const screen = this.worldToScreen(world.x, world.y);
            // worldToScreen gives the TOP-LEFT of the tile in screen coords
            // because world.y is top edge (Cartesian), and we subtract camera

            // Cull off-screen tiles
            if (screen.x > this.width + T || screen.x < -T) return;
            if (screen.y > this.height + T || screen.y < -T) return;

            // Draw Brick
            this.ctx.fillStyle = '#d97706';
            this.ctx.strokeStyle = '#92400e';
            this.ctx.lineWidth = 1;
            this.ctx.fillRect(screen.x, screen.y, T, T);
            this.ctx.strokeRect(screen.x, screen.y, T, T);

            // Shine detail
            this.ctx.fillStyle = 'rgba(255,255,255,0.15)';
            this.ctx.fillRect(screen.x, screen.y, T, 2);
        });
    }

    drawGoals() {
        if (!this.goals || this.goals.length === 0) return;

        const T = this.TILE_SIZE;

        this.goals.forEach(goal => {
            const world = this.tileToWorld(goal.c, goal.r);
            const screen = this.worldToScreen(world.x, world.y);

            // Cull off-screen
            if (screen.x > this.width + T || screen.x < -T) return;
            if (screen.y > this.height + T || screen.y < -T) return;

            // Draw Flag/House goal tile
            // Base
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.fillRect(screen.x, screen.y, T, T);
            this.ctx.strokeStyle = '#b45309';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(screen.x, screen.y, T, T);

            // Flag pole
            this.ctx.strokeStyle = '#78350f';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(screen.x + T * 0.3, screen.y + T * 0.9);
            this.ctx.lineTo(screen.x + T * 0.3, screen.y + T * 0.1);
            this.ctx.stroke();

            // Flag triangle
            this.ctx.fillStyle = '#ef4444';
            this.ctx.beginPath();
            this.ctx.moveTo(screen.x + T * 0.3, screen.y + T * 0.1);
            this.ctx.lineTo(screen.x + T * 0.8, screen.y + T * 0.3);
            this.ctx.lineTo(screen.x + T * 0.3, screen.y + T * 0.45);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    // Collision check for obstacles (returns true if hitting a wall)
    checkCollision(rect) {
        return this._checkTileCollision(rect, this.obstacles);
    }

    // Collision check for goals (returns true if touching a goal)
    checkGoalCollision() {
        return this._checkTileCollision(
            { x: this.sprite.x, y: this.sprite.y },
            this.goals
        );
    }

    // Shared AABB collision logic for tile arrays
    _checkTileCollision(rect, tiles) {
        if (!tiles || tiles.length === 0) return false;

        const spriteX = rect.x !== undefined ? rect.x : this.sprite.x;
        const spriteY = rect.y !== undefined ? rect.y : this.sprite.y;
        const halfSize = (rect.size || this.sprite.size) / 100 * 64 / 2;
        const padding = 4;

        const sLeft = spriteX - halfSize + padding;
        const sRight = spriteX + halfSize - padding;
        const sBottom = spriteY - halfSize + padding;
        const sTop = spriteY + halfSize - padding;

        const T = this.TILE_SIZE;

        for (let tile of tiles) {
            // Convert tile grid position to Cartesian world position
            const world = this.tileToWorld(tile.c, tile.r);
            // tile covers from world.x to world.x+T horizontally
            // and world.y-T to world.y vertically (y goes up in Cartesian)
            const oLeft = world.x;
            const oRight = world.x + T;
            const oTop = world.y;        // top edge
            const oBottom = world.y - T;    // bottom edge

            if (sLeft < oRight && sRight > oLeft && sBottom < oTop && sTop > oBottom) {
                return true;
            }
        }
        return false;
    }

    drawEnemies() {
        if (!this.enemies || this.enemies.length === 0) return;

        const T = this.TILE_SIZE;

        this.enemies.forEach(enemy => {
            const world = this.tileToWorld(enemy.c, enemy.r);
            const screen = this.worldToScreen(world.x, world.y);

            // Cull off-screen
            if (screen.x > this.width + T || screen.x < -T) return;
            if (screen.y > this.height + T || screen.y < -T) return;

            if (this.enemyImage) {
                // Draw custom enemy sprite
                this.ctx.drawImage(this.enemyImage, screen.x, screen.y, T, T);
            } else {
                // Default enemy: red spiky monster
                // Body
                this.ctx.fillStyle = '#dc2626';
                this.ctx.fillRect(screen.x + 2, screen.y + T * 0.3, T - 4, T * 0.65);

                // Spikes on top
                this.ctx.fillStyle = '#991b1b';
                for (let i = 0; i < 3; i++) {
                    const sx = screen.x + 4 + i * (T - 8) / 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(sx, screen.y + T * 0.35);
                    this.ctx.lineTo(sx + (T - 8) / 4, screen.y + T * 0.05);
                    this.ctx.lineTo(sx + (T - 8) / 2, screen.y + T * 0.35);
                    this.ctx.closePath();
                    this.ctx.fill();
                }

                // Eyes
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(screen.x + T * 0.2, screen.y + T * 0.45, 5, 5);
                this.ctx.fillRect(screen.x + T * 0.6, screen.y + T * 0.45, 5, 5);
                // Pupils
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(screen.x + T * 0.25, screen.y + T * 0.5, 3, 3);
                this.ctx.fillRect(screen.x + T * 0.65, screen.y + T * 0.5, 3, 3);
            }
        });
    }

    // Collision check for enemies
    checkEnemyCollision() {
        return this._checkTileCollision(
            { x: this.sprite.x, y: this.sprite.y },
            this.enemies
        );
    }

    drawSprite() {
        // The sprite is ALWAYS drawn at the center of the canvas.
        // The world (background & obstacles) scrolls around it via the camera.
        const cx = this.width / 2;
        const cy = this.height / 2;

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate((this.sprite.direction - 90) * Math.PI / 180);

        // Filter effect for color
        this.ctx.filter = `hue-rotate(${this.sprite.colorEffect}deg)`;

        if (this.sprite.image) {
            // Draw Custom Sprite
            this.ctx.imageSmoothingEnabled = false; // Pixel art style
            // Scale up (16x16 -> 64x64 roughly)
            const scale = this.sprite.size / 100;
            const size = 64 * scale;
            this.ctx.drawImage(this.sprite.image, -size / 2, -size / 2, size, size);
        } else {
            // Draw Default Arrow
            this.ctx.fillStyle = '#4C97FF';
            this.ctx.beginPath();
            this.ctx.moveTo(0, -20);
            this.ctx.lineTo(15, 20);
            this.ctx.lineTo(0, 15);
            this.ctx.lineTo(-15, 20);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke(); // Outline

            // Draw Eye 
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(0, -5, 4, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = 'black';
            this.ctx.beginPath();
            this.ctx.arc(0, -6, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();

        // Draw Speech Bubble if active
        if (this.sprite.bubbleText) {
            this.drawBubble(cx, cy - 30, this.sprite.bubbleText);
        }
    }

    drawBubble(x, y, text) {
        this.ctx.save();
        this.ctx.font = '14px sans-serif';
        const padding = 10;
        const textWidth = this.ctx.measureText(text).width;
        const boxWidth = textWidth + padding * 2;
        const boxHeight = 30;

        // Bubble shape
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.roundRect(x + 10, y - boxHeight, boxWidth, boxHeight, 10);
        this.ctx.stroke();
        this.ctx.fill();

        // Tail
        this.ctx.beginPath();
        this.ctx.moveTo(x + 10, y - 10);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x + 15, y - 5);
        this.ctx.fill();
        this.ctx.stroke();

        // Text
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(text, x + 10 + padding, y - 10);

        this.ctx.restore();
    }
}
