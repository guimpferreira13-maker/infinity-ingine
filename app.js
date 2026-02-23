/**
 * app.js
 * Main application entry point. Handles Drag & Drop and UI wiring.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== INTERNATIONALIZATION (i18n) =====
    const TRANSLATIONS = {
        pt: {
            hero_title: 'CRIE. JOGUE. <span class="gradient-text" data-i18n="hero_highlight">BRILHE.</span>',
            hero_highlight: 'BRILHE.',
            hero_subtitle: 'A plataforma de criação de jogos mais avançada da web.',
            auth_title: 'Entrar na Plataforma',
            ph_username: 'Seu Nome de Usuário',
            ph_password: 'Sua Senha Secreta',
            login_btn: '🚀 Começar Aventura',
            auth_footer: 'Crie uma conta ou entre na sua!',
            choose_style: 'Escolha seu estilo de jogo',
            start_journey: 'Comece sua jornada criando algo incrível',
            rpg_title: 'RPG 2D',
            rpg_desc: 'Crie aventuras top-down com mapas e missões.',
            platform_title: 'Plataforma',
            platform_desc: 'Corra e pule em fases estilo Mario.',
            blank_title: 'Projeto Vazio',
            blank_desc: 'Comece do zero com sua imaginação.',
            my_projects: 'Meus Projetos',
            community: 'Comunidade',
            new_game: 'Novo Jogo',
            save_btn: '💾 Salvar',
            publish_btn: '🌍 Publicar',
            run_btn: '▶ Executar',
            stop_btn: '⏹ Parar',
            reset_btn: '⏮ Reset',
            blocks: 'Blocos',
            cat_motion: 'Movimento',
            cat_looks: 'Aparência',
            cat_sound: 'Som',
            cat_control: 'Controle',
            cat_events: 'Eventos',
            code_area: 'Área de Código',
            clear: 'Limpar',
            drag_hint: 'Arraste blocos para cá para começar',
            stage: 'Palco',
            character_btn: '🎨 Personagem',
            bg_btn: '🖼️ Fundo',
            level_btn: '🧱 Nível',
            direction: 'Direção',
            // Console
            console_title: 'Console',
            clear_console: 'Limpar Console',
            console_ready: 'Pronto para executar.',
            // Sprite Editor
            sprite_editor_title: 'Editor de Personagem',
            import_image: '📂 Importar Imagem',
            save: 'Salvar',
            eraser: 'Borracha',
            // Level Editor
            level_editor_title: 'Editor de Nível',
            level_hint: 'Clique na grade para adicionar/remover paredes.',
            clear_all: 'Limpar Tudo',
            save_level: 'Salvar Nível',
            brush_label: 'Pincel:',
            brush_obstacle: '🧱 Obstáculo',
            brush_goal: '🏁 Meta',
            brush_enemy: '👾 Inimigo',
            edit_enemy: '🎨 Editar Inimigo',
            // Enemy Editor
            enemy_editor_title: 'Editor de Inimigo 👾',
            enemy_import: '📂 Importar Imagem',
            enemy_clear: '🗑️ Limpar',
            enemy_save: 'Salvar',
            // Background
            change_bg: 'Alterar Fundo',
            solid_colors: 'Cores Sólidas',
            themes: 'Temas',
            theme_platform: '🏞️ Plataforma',
            theme_space: '✨ Espaço',
            upload: 'Upload',
            load_image: '📂 Carregar Imagem',
            // Community & Dashboard
            no_community_games: 'Nenhum jogo publicado ainda. Seja o primeiro!',
            no_my_games: 'Você ainda não tem jogos salvos 🕵️‍♂️',
            create_first_game: 'Crie um Novo Jogo para começar!',
            nothing_here: 'Nada por aqui... ainda!',
            error_loading: 'Aparentemente não há jogos para exibir ou ocorreu um erro ao carregá-los.',
            use_new_card: 'Use o cartão <b>+ Novo Jogo</b> para criar o seu!',
            be_first_publish: 'Seja o primeiro a publicar um jogo na comunidade!',
            by_author: 'Por:',
            anon_author: 'Anônimo',
            no_title: 'Sem Título',
            // Alerts
            err_user_not_found: "❌ Usuário não encontrado.",
            err_wrong_pass: "🔒 Senha incorreta!",
            err_fill_auth: "⚠️ Preencha nome e senha!",
            err_save: "❌ Erro ao salvar: Armazenamento cheio ou bloqueado!",
            err_storage_full: "❌ Erro: Espaço de armazenamento cheio! Não foi possível publicar.\nTente excluir alguns projetos antigos.",
            demo_created: "🎮 Demo 'Mario Control' criado com sucesso!\nUse as Setas e Espaço para jogar.",
            // Level Tooltips
            clear_console_tooltip: 'Limpar Console',
            trash_blocks: 'Solte aqui para apagar',
            // Mascot & Tutorial
            tutorial_label: 'Tutorial',
            mascot_skip: 'Pular',
            mascot_next: 'Próximo ➜',
            mascot_start: 'Começar! 🚀',
            tut_step_1: '<span class="emoji-big">👋</span>Olá! Eu sou o <strong>Bit</strong>, o teu guia robô. Vamos aprender a usar o <strong>Infinity Engine</strong> em 1 minuto?',
            tut_step_2: 'Aqui podes ver os teus projetos e os da <strong>comunidade</strong>. Clica em <strong>+ Novo Jogo</strong> para começar!',
            tut_step_3: '<span class="emoji-big">🧩</span>Este é o <strong>Painel de Blocos</strong>! Os blocos são os comandos do teu jogo. Cada categoria tem blocos diferentes:',
            tut_step_4: '🏷️ <strong>Categorias dos blocos:</strong><br>• <strong style="color:#4C97FF">Movimento</strong> — mover, girar, saltar<br>• <strong style="color:#9966FF">Aparência</strong> — mudar visual, falar<br>• <strong style="color:#CF63CF">Som</strong> — tocar sons<br>• <strong style="color:#FFAB19">Controle</strong> — repetir, esperar<br>• <strong style="color:#FFBF00">Eventos</strong> — quando tecla premida, quando morrer',
            tut_step_5: '🖱️ Esta é a <strong>Área de Código</strong>! Arrasta os blocos da esquerda para aqui. Encaixa-os uns nos outros para criar sequências. Por exemplo: "Quando seta direita → Mover 10 passos".',
            tut_step_6: '🎬 Este é o <strong>Palco</strong> — a tela do teu jogo! Aqui vês o personagem e tudo o que acontece quando executas o código.',
            tut_step_7: '🎮 <strong>Botões de controlo:</strong><br>• <strong>▶ Executar</strong> — inicia o jogo<br>• <strong>⏹ Parar</strong> — para a execução<br>• <strong>⏮ Reset</strong> — volta tudo ao início<br><br>💡 <em>Dica: também podes pressionar as teclas do teclado (setas, WASD, espaço) para iniciar automaticamente!</em>',
            tut_step_8: '💾 <strong>Salvar e Publicar:</strong><br>• <strong>💾 Salvar</strong> — guarda o projeto no teu computador<br>• <strong>🌍 Publicar</strong> — partilha o jogo com toda a comunidade!',
            tut_step_9: '🎨 O botão <strong>"🎨 Personagem"</strong> abre o editor de sprite! Podes importar uma imagem ou desenhar o teu personagem pixel a pixel.',
            tut_step_10: '🖼️ O botão <strong>"🖼️ Fundo"</strong> permite mudar o cenário do jogo! Escolhe uma cor, importa uma imagem, ou usa o fundo de plataforma.',
            tut_step_11: '🧱 O botão <strong>"🧱 Nível"</strong> abre o editor de nível! Aqui podes desenhar obstáculos, colocar a meta 🏁, e posicionar inimigos 👾 no mapa.',
            tut_step_12: '📊 As <strong>Propriedades</strong> (X, Y, Direção) mostram a posição atual do personagem. O <strong>Console</strong> abaixo mostra mensagens do programa e erros.',
            tut_step_13: '<span class="emoji-big">🚀</span>É isso! Agora já sabes tudo! Começa por arrastar um bloco <strong>"Quando tecla premida"</strong> e um bloco <strong>"Mover"</strong> para a área de código. <strong>Diverte-te a criar!</strong>'
        },
        en: {
            hero_title: 'CREATE. PLAY. <span class="gradient-text" data-i18n="hero_highlight">SHINE.</span>',
            hero_highlight: 'SHINE.',
            hero_subtitle: 'The most advanced web game creation platform.',
            auth_title: 'Sign In',
            ph_username: 'Your Username',
            ph_password: 'Your Secret Password',
            login_btn: '🚀 Start Adventure',
            auth_footer: 'Create an account or sign in!',
            choose_style: 'Choose your game style',
            start_journey: 'Start your journey creating something amazing',
            rpg_title: 'RPG 2D',
            rpg_desc: 'Create top-down adventures with maps and quests.',
            platform_title: 'Platformer',
            platform_desc: 'Run and jump in Mario-style levels.',
            blank_title: 'Blank Project',
            blank_desc: 'Start from scratch with your imagination.',
            my_projects: 'My Projects',
            community: 'Community',
            new_game: 'New Game',
            save_btn: '💾 Save',
            publish_btn: '🌍 Publish',
            run_btn: '▶ Run',
            stop_btn: '⏹ Stop',
            reset_btn: '⏮ Reset',
            blocks: 'Blocks',
            cat_motion: 'Motion',
            cat_looks: 'Looks',
            cat_sound: 'Sound',
            cat_control: 'Control',
            cat_events: 'Events',
            code_area: 'Code Area',
            clear: 'Clear',
            drag_hint: 'Drag blocks here to start',
            stage: 'Stage',
            character_btn: '🎨 Character',
            bg_btn: '🖼️ Background',
            level_btn: '🧱 Level',
            direction: 'Direction',
            // Console
            console_title: 'Console',
            clear_console: 'Clear Console',
            console_ready: 'Ready to run.',
            // Sprite Editor
            sprite_editor_title: 'Character Editor',
            import_image: '📂 Import Image',
            save: 'Save',
            eraser: 'Eraser',
            // Level Editor
            level_editor_title: 'Level Editor',
            level_hint: 'Click on the grid to add/remove walls.',
            clear_all: 'Clear All',
            save_level: 'Save Level',
            brush_label: 'Brush:',
            brush_obstacle: '🧱 Obstacle',
            brush_goal: '🏁 Goal',
            brush_enemy: '👾 Enemy',
            edit_enemy: '🎨 Edit Enemy',
            // Enemy Editor
            enemy_editor_title: 'Enemy Editor 👾',
            enemy_import: '📂 Import Image',
            enemy_clear: '🗑️ Clear',
            enemy_save: 'Save',
            // Background
            change_bg: 'Change Background',
            solid_colors: 'Solid Colors',
            themes: 'Themes',
            theme_platform: '🏞️ Platformer',
            theme_space: '✨ Space',
            upload: 'Upload',
            load_image: '📂 Load Image',
            // Community & Dashboard
            no_community_games: 'No published games yet. Be the first!',
            no_my_games: 'You have no saved games yet 🕵️‍♂️',
            create_first_game: 'Create a New Game to start!',
            nothing_here: 'Nothing here... yet!',
            error_loading: 'Apparently there are no games to display or an error occurred while loading them.',
            use_new_card: 'Use the <b>+ New Game</b> card to create yours!',
            be_first_publish: 'Be the first to publish a game to the community!',
            by_author: 'By:',
            anon_author: 'Anonymous',
            no_title: 'Untitled',
            // Alerts
            err_user_not_found: "❌ User not found.",
            err_wrong_pass: "🔒 Incorrect password!",
            err_fill_auth: "⚠️ Fill in name and password!",
            err_save: "❌ Error saving: Storage full or blocked!",
            err_storage_full: "❌ Error: Storage space full! Could not publish.\nTry deleting some old projects.",
            demo_created: "🎮 'Mario Control' demo created successfully!\nUse Arrows and Space to play.",
            // Level Tooltips
            clear_console_tooltip: 'Clear Console',
            trash_blocks: 'Drop here to delete',
            // Mascot & Tutorial
            tutorial_label: 'Tutorial',
            mascot_skip: 'Skip',
            mascot_next: 'Next ➜',
            mascot_start: 'Start! 🚀',
            tut_step_1: '<span class="emoji-big">👋</span>Hi! I\'m <strong>Bit</strong>, your robot guide. Let\'s learn how to use <strong>Infinity Engine</strong> in 1 minute?',
            tut_step_2: 'Here you can see your projects and those from the <strong>community</strong>. Click on <strong>+ New Game</strong> to start!',
            tut_step_3: '<span class="emoji-big">🧩</span>This is the <strong>Blocks Panel</strong>! Blocks are your game\'s commands. Each category has different blocks:',
            tut_step_4: '🏷️ <strong>Block categories:</strong><br>• <strong style="color:#4C97FF">Motion</strong> — move, turn, jump<br>• <strong style="color:#9966FF">Looks</strong> — change appearance, speak<br>• <strong style="color:#CF63CF">Sound</strong> — play sounds<br>• <strong style="color:#FFAB19">Control</strong> — repeat, wait<br>• <strong style="color:#FFBF00">Events</strong> — when key pressed, when death',
            tut_step_5: '🖱️ This is the <strong>Code Area</strong>! Drag blocks from the left to here. Snap them together to create sequences. For example: "When right arrow → Move 10 steps".',
            tut_step_6: '🎬 This is the <strong>Stage</strong> — your game\'s screen! Here you see the character and everything that happens when you run the code.',
            tut_step_7: '🎮 <strong>Control buttons:</strong><br>• <strong>▶ Run</strong> — starts the game<br>• <strong>⏹ Stop</strong> — stops execution<br>• <strong>⏮ Reset</strong> — resets everything<br><br>💡 <em>Tip: you can also press keyboard keys (arrows, WASD, space) to start automatically!</em>',
            tut_step_8: '💾 <strong>Save and Publish:</strong><br>• <strong>💾 Save</strong> — saves the project to your computer<br>• <strong>🌍 Publish</strong> — shares the game with the entire community!',
            tut_step_9: '🎨 The <strong>"🎨 Character"</strong> button opens the sprite editor! You can import an image or draw your character pixel by pixel.',
            tut_step_10: '🖼️ The <strong>"🖼️ Background"</strong> button allows you to change the game scenery! Choose a color, import an image, or use the platformer background.',
            tut_step_11: '🧱 The <strong>"🧱 Level"</strong> button opens the level editor! Here you can draw obstacles, place the goal 🏁, and position enemies 👾 on the map.',
            tut_step_12: '📊 <strong>Properties</strong> (X, Y, Direction) show the character\'s current position. The <strong>Console</strong> below shows program messages and errors.',
            tut_step_13: '<span class="emoji-big">🚀</span>That\'s it! Now you know everything! Start by dragging a <strong>"When key pressed"</strong> block and a <strong>"Move"</strong> block to the code area. <strong>Have fun creating!</strong>'
        },
        es: {
            hero_title: 'CREA. JUEGA. <span class="gradient-text" data-i18n="hero_highlight">BRILLA.</span>',
            hero_highlight: 'BRILLA.',
            hero_subtitle: 'La plataforma de creación de juegos más avanzada de la web.',
            auth_title: 'Iniciar Sesión',
            ph_username: 'Tu Nombre de Usuario',
            ph_password: 'Tu Contraseña Secreta',
            login_btn: '🚀 Comenzar Aventura',
            auth_footer: '¡Crea una cuenta o inicia sesión!',
            choose_style: 'Elige tu estilo de juego',
            start_journey: 'Comienza tu aventura creando algo increíble',
            rpg_title: 'RPG 2D',
            rpg_desc: 'Crea aventuras top-down con mapas y misiones.',
            platform_title: 'Plataforma',
            platform_desc: 'Corre y salta en niveles estilo Mario.',
            blank_title: 'Proyecto Vacío',
            blank_desc: 'Empieza desde cero con tu imaginación.',
            my_projects: 'Mis Proyectos',
            community: 'Comunidad',
            new_game: 'Nuevo Juego',
            save_btn: '💾 Guardar',
            publish_btn: '🌍 Publicar',
            run_btn: '▶ Ejecutar',
            stop_btn: '⏹ Parar',
            reset_btn: '⏮ Reset',
            blocks: 'Bloques',
            cat_motion: 'Movimiento',
            cat_looks: 'Apariencia',
            cat_sound: 'Sonido',
            cat_control: 'Control',
            cat_events: 'Eventos',
            code_area: 'Área de Código',
            clear: 'Limpar',
            drag_hint: 'Arrastra bloques aquí para empezar',
            stage: 'Escenario',
            character_btn: '🎨 Personaje',
            bg_btn: '🖼️ Fondo',
            level_btn: '🧱 Nivel',
            direction: 'Dirección',
            // Console
            console_title: 'Consola',
            clear_console: 'Limpiar Consola',
            console_ready: 'Listo para ejecutar.',
            // Sprite Editor
            sprite_editor_title: 'Editor de Personaje',
            import_image: '📂 Importar Imagen',
            save: 'Guardar',
            eraser: 'Borrador',
            // Level Editor
            level_editor_title: 'Editor de Nivel',
            level_hint: 'Haz clic en la cuadrícula para añadir/quitar paredes.',
            clear_all: 'Limpiar Todo',
            save_level: 'Guardar Nivel',
            brush_label: 'Pincel:',
            brush_obstacle: '🧱 Obstáculo',
            brush_goal: '🏁 Meta',
            brush_enemy: '👾 Enemigo',
            edit_enemy: '🎨 Editar Enemigo',
            // Enemy Editor
            enemy_editor_title: 'Editor de Enemigo 👾',
            enemy_import: '📂 Importar Imagen',
            enemy_clear: '🗑️ Limpiar',
            enemy_save: 'Guardar',
            // Background
            change_bg: 'Cambiar Fondo',
            solid_colors: 'Colores Sólidos',
            themes: 'Temas',
            theme_platform: '🏞️ Plataforma',
            theme_space: '✨ Espacio',
            upload: 'Subir',
            load_image: '📂 Cargar Imagen',
            // Community & Dashboard
            no_community_games: '¡No hay juegos publicados aún. ¡Sé el primero!',
            no_my_games: 'Aún no tienes juegos guardados 🕵️‍♂️',
            create_first_game: '¡Crea un Nuevo Juego para empezar!',
            nothing_here: '¡Nada por aquí... aún!',
            error_loading: 'Al parecer no hay juegos para mostrar o ocurrió un error al cargarlos.',
            use_new_card: '¡Usa la tarjeta <b>+ Nuevo Juego</b> para crear el tuyo!',
            be_first_publish: '¡Sé el primero en publicar un juego en la comunidad!',
            by_author: 'Por:',
            anon_author: 'Anónimo',
            no_title: 'Sin Título',
            // Alerts
            err_user_not_found: "❌ Usuario no encontrado.",
            err_wrong_pass: "🔒 ¡Contraseña incorrecta!",
            err_fill_auth: "⚠️ ¡Completa nombre y contraseña!",
            err_save: "❌ ¡Error al guardar: Almacenamiento lleno o bloqueado!",
            err_storage_full: "❌ ¡Error: Espacio de almacenamiento lleno! No se pudo publicar.\nIntenta eliminar algunos proyectos antiguos.",
            demo_created: "🎮 ¡Demo 'Mario Control' creado con éxito!\nUsa las Flechas y el Espacio para jugar.",
            // Level Tooltips
            clear_console_tooltip: 'Limpiar Consola',
            trash_blocks: 'Suelta aquí para borrar',
            // Mascot & Tutorial
            tutorial_label: 'Tutorial',
            mascot_skip: 'Saltar',
            mascot_next: 'Siguiente ➜',
            mascot_start: '¡Empezar! 🚀',
            tut_step_1: '<span class="emoji-big">👋</span>¡Hola! Soy <strong>Bit</strong>, tu guía robot. ¿Aprendemos a usar <strong>Infinity Engine</strong> en 1 minuto?',
            tut_step_2: 'Aquí puedes ver tus proyectos y los de la <strong>comunidad</strong>. ¡Haz clic en <strong>+ Nuevo Juego</strong> para empezar!',
            tut_step_3: '<span class="emoji-big">🧩</span>¡Este es el <strong>Panel de Bloques</strong>! Los bloques son los comandos de tu juego. Cada categoría tiene bloques diferentes:',
            tut_step_4: '🏷️ <strong>Categorías de bloques:</strong><br>• <strong style="color:#4C97FF">Movimiento</strong> — mover, girar, saltar<br>• <strong style="color:#9966FF">Apariencia</strong> — cambiar aspecto, hablar<br>• <strong style="color:#CF63CF">Sonido</strong> — reproducir sonidos<br>• <strong style="color:#FFAB19">Control</strong> — repetir, esperar<br>• <strong style="color:#FFBF00">Eventos</strong> — cuando se pulsa tecla, cuando muere',
            tut_step_5: '🖱️ ¡Esta es el <strong>Área de Código</strong>! Arrastra los bloques de la izquierda aquí. Encájalos entre sí para crear secuencias. Por ejemplo: "Cuando flecha derecha → Mover 10 pasos".',
            tut_step_6: '🎬 ¡Este es el <strong>Escenario</strong> — la pantalla de tu juego! Aquí ves al personaje y todo lo que sucede cuando ejecutas el código.',
            tut_step_7: '🎮 <strong>Botones de control:</strong><br>• <strong>▶ Ejecutar</strong> — inicia el juego<br>• <strong>⏹ Parar</strong> — detiene la ejecución<br>• <strong>⏮ Reset</strong> — vuelve todo al inicio<br><br>💡 <em>Consejo: ¡también puedes pulsar las teclas del teclado (flechas, WASD, espacio) para iniciar automáticamente!</em>',
            tut_step_8: '💾 <strong>Guardar y Publicar:</strong><br>• <strong>💾 Guardar</strong> — guarda el proyecto en tu ordenador<br>• <strong>🌍 Publicar</strong> — ¡comparte el juego con toda la comunidad!',
            tut_step_9: '🎨 ¡El botón <strong>"🎨 Personaje"</strong> abre el editor de sprites! Puedes importar una imagen o dibujar tu personaje píxel a píxel.',
            tut_step_10: '🖼️ ¡El botón <strong>"🖼️ Fondo"</strong> permite cambiar el escenario del juego! Elige un color, importa una imagen o usa el fondo de plataforma.',
            tut_step_11: '🧱 ¡El botón <strong>"🧱 Nivel"</strong> abre el editor de niveles! Aquí puedes dibujar obstáculos, colocar la meta 🏁 y posicionar enemigos 👾 en el mapa.',
            tut_step_12: '📊 Las <strong>Propiedades</strong> (X, Y, Dirección) muestran la posición actual del personaje. La <strong>Consola</strong> de abajo muestra mensajes del programa y errores.',
            tut_step_13: '<span class="emoji-big">🚀</span>¡Eso es todo! ¡Ahora ya lo sabes todo! Empieza arrastrando un bloque <strong>"Cuando se pulsa tecla"</strong> y un bloque <strong>"Mover"</strong> al área de código. <strong>¡Diviértete creando!</strong>'
        }
    };

    // Block label translations
    const BLOCK_TRANSLATIONS = {
        pt: {
            event_flag: 'Quando 🏳️ for clicado',
            event_key: 'Quando a tecla %s for pressionada',
            event_key_default: 'espaço',
            event_touch_goal: 'Quando tocar na meta 🏁',
            event_death: 'Quando morrer 💀',
            motion_move: 'Mova %n passos',
            motion_move_back: 'Ande para trás %n passos',
            motion_jump: 'Pule (Jump)',
            motion_change_x: 'Mude x por %n',
            motion_set_x: 'Vá para x: %n',
            motion_change_y: 'Mude y por %n',
            motion_set_y: 'Vá para y: %n',
            motion_turn_right: 'Gire ↻ %n graus',
            motion_turn_left: 'Gire ↺ %n graus',
            motion_goto_xy: 'Vá para x: %n y: %n',
            motion_glide: 'Deslize %n segs p/ x: %n y: %n',
            motion_bounce_on_edge: 'Se tocar na borda, volte',
            looks_say: 'Diga %s por %n segs',
            looks_say_default: 'Olá!',
            looks_show: 'Mostre',
            looks_hide: 'Esconda',
            looks_change_color: 'Mude cor em %n',
            looks_set_size: 'Mude tamanho para %n %',
            sound_play_beep: 'Tocar som Pop',
            control_wait: 'Espere %n segs',
            control_repeat: 'Repita %n vezes',
            control_forever: 'Sempre'
        },
        en: {
            event_flag: 'When 🏳️ clicked',
            event_key: 'When %s key pressed',
            event_key_default: 'space',
            event_touch_goal: 'When touching goal 🏁',
            event_death: 'When dead 💀',
            motion_move: 'Move %n steps',
            motion_move_back: 'Move back %n steps',
            motion_jump: 'Jump',
            motion_change_x: 'Change x by %n',
            motion_set_x: 'Set x to %n',
            motion_change_y: 'Change y by %n',
            motion_set_y: 'Set y to %n',
            motion_turn_right: 'Turn ↻ %n degrees',
            motion_turn_left: 'Turn ↺ %n degrees',
            motion_goto_xy: 'Go to x: %n y: %n',
            motion_glide: 'Glide %n secs to x: %n y: %n',
            motion_bounce_on_edge: 'If on edge, bounce',
            looks_say: 'Say %s for %n secs',
            looks_say_default: 'Hello!',
            looks_show: 'Show',
            looks_hide: 'Hide',
            looks_change_color: 'Change color by %n',
            looks_set_size: 'Set size to %n %',
            sound_play_beep: 'Play Pop sound',
            control_wait: 'Wait %n secs',
            control_repeat: 'Repeat %n times',
            control_forever: 'Forever'
        },
        es: {
            event_flag: 'Cuando 🏳️ sea pulsado',
            event_key: 'Cuando tecla %s sea pulsada',
            event_key_default: 'espacio',
            event_touch_goal: 'Cuando toque la meta 🏁',
            event_death: 'Cuando muera 💀',
            motion_move: 'Mover %n pasos',
            motion_move_back: 'Retroceder %n pasos',
            motion_jump: 'Saltar',
            motion_change_x: 'Cambiar x en %n',
            motion_set_x: 'Fijar x a %n',
            motion_change_y: 'Cambiar y en %n',
            motion_set_y: 'Fijar y a %n',
            motion_turn_right: 'Girar ↻ %n grados',
            motion_turn_left: 'Girar ↺ %n grados',
            motion_goto_xy: 'Ir a x: %n y: %n',
            motion_glide: 'Deslizar %n segs a x: %n y: %n',
            motion_bounce_on_edge: 'Si toca el borde, rebotar',
            looks_say: 'Decir %s por %n segs',
            looks_say_default: '¡Hola!',
            looks_show: 'Mostrar',
            looks_hide: 'Esconder',
            looks_change_color: 'Cambiar color en %n',
            looks_set_size: 'Fijar tamaño a %n %',
            sound_play_beep: 'Tocar sonido Pop',
            control_wait: 'Esperar %n segs',
            control_repeat: 'Repetir %n veces',
            control_forever: 'Siempre'
        }
    };

    let currentLang = localStorage.getItem('infinity_lang') || 'pt';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('infinity_lang', lang);
        const t = TRANSLATIONS[lang];
        if (!t) return;

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                if (key === 'hero_title') {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) {
                el.placeholder = t[key];
            }
        });

        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (t[key] !== undefined) {
                el.title = t[key];
            }
        });

        // Update active state on dropdown
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });

        // Update block translations
        const bt = BLOCK_TRANSLATIONS[lang];
        if (bt) {
            BLOCK_DEFINITIONS.forEach(block => {
                if (bt[block.type]) {
                    block.label = bt[block.type];
                }
                // Update text defaults for specific blocks
                if (block.params) {
                    block.params.forEach(p => {
                        if (p.name === 'key' && bt[block.type + '_default']) {
                            p.default = bt[block.type + '_default'];
                        }
                        if (p.name === 'message' && bt[block.type + '_default']) {
                            p.default = bt[block.type + '_default'];
                        }
                    });
                }
            });
            // Re-render palette if it exists
            const paletteEl = document.getElementById('block-palette');
            if (paletteEl && paletteEl.children.length > 0) {
                const activeCategory = document.querySelector('.cat-btn.active');
                if (activeCategory) {
                    initPalette(activeCategory.dataset.category);
                }
            }

            // Update BRUSH_COLORS labels and re-inject level bar if open
            if (BRUSH_COLORS) {
                BRUSH_COLORS.obstacle.label = t.brush_obstacle;
                BRUSH_COLORS.goal.label = t.brush_goal;
                BRUSH_COLORS.enemy.label = t.brush_enemy;

                if (document.getElementById('level-brush-bar')) {
                    initLevelGrid(); // Refresh the bar labels
                }
            }
        }

        // Update tutorial if active
        if (typeof showTutorialStep === 'function' && typeof tutorialMascot !== 'undefined' && tutorialMascot && !tutorialMascot.classList.contains('hidden')) {
            showTutorialStep(tutorialCurrentStep);
        }
    }

    // Language button & dropdown (Multiple instances)
    const langBtns = document.querySelectorAll('.lang-btn-toggle');

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = btn.closest('.lang-selector-container').querySelector('.lang-dropdown');

            // Close all other dropdowns first
            document.querySelectorAll('.lang-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.add('hidden');
            });

            dropdown.classList.toggle('hidden');
        });
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            applyLanguage(opt.dataset.lang);
            // Close all dropdowns
            document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.add('hidden'));
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.add('hidden'));
    });

    // Initialize Stage
    const stage = new Stage('stage-canvas');

    // Initialize Interpreter
    const interpreter = new Interpreter(stage);

    // UI References
    const paletteEl = document.getElementById('block-palette');
    const workspaceEl = document.getElementById('workspace-area');
    const dragContainer = document.getElementById('drag-container');

    // State
    let draggedBlock = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let isDraggingFromPalette = false;
    let currentProjectID = null;

    // --- VIEW MANAGER (SPA) ---
    const views = {
        landing: document.getElementById('view-landing'),
        dashboard: document.getElementById('view-dashboard'),
        editor: document.getElementById('view-editor'),
        player: document.getElementById('view-player')
    };

    function switchView(viewName) {
        Object.values(views).forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden');
        });

        const target = views[viewName];
        target.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            target.classList.add('active-view');
        }, 10);
    }

    // --- DATA MANAGERS ---

    class UserManager {
        constructor() {
            // Users are now objects: { username: "name", password: "pwd" }
            const rawUsers = JSON.parse(localStorage.getItem('infinity_users') || '[]');
            // Migration check: if array of strings, convert or reset
            if (rawUsers.length > 0 && typeof rawUsers[0] === 'string') {
                this.users = []; // Reset legacy data for safety
            } else {
                this.users = rawUsers;
            }

            // Ensure admin account exists with correct password
            const adminUser = this.users.find(u => u.username === 'admin');
            if (adminUser) {
                adminUser.password = 'admin123'; // Always reset admin password
            } else {
                this.users.push({ username: 'admin', password: 'admin123' });
            }
            this.save();

            this.currentUser = localStorage.getItem('infinity_current_user');
        }

        register(username, password) {
            if (this.users.find(u => u.username === username)) {
                return { success: false, message: "⚠️ Este nome já está em uso!" };
            }

            const newUser = { username, password };
            this.users.push(newUser);
            this.save();
            this.login(username, password);
            return { success: true };
        }

        login(username, password) {
            const user = this.users.find(u => u.username === username);
            const t = TRANSLATIONS[currentLang];

            if (!user) {
                return { success: false, message: t.err_user_not_found || "❌ Usuário não encontrado." };
            }

            if (user.password !== password) {
                return { success: false, message: t.err_wrong_pass || "🔒 Senha incorreta!" };
            }

            this.currentUser = username;
            localStorage.setItem('infinity_current_user', username);
            return { success: true };
        }

        logout() {
            this.currentUser = null;
            localStorage.removeItem('infinity_current_user');
            switchView('landing');
        }

        save() {
            localStorage.setItem('infinity_users', JSON.stringify(this.users));
        }

        isLoggedIn() {
            return !!this.currentUser;
        }

        isAdmin() {
            return this.currentUser === 'admin';
        }
    }

    class ProjectManager {
        constructor() {
            // Projects structure: { id, title, author, type, thumb, data }
            try {
                this.communityProjects = JSON.parse(localStorage.getItem('infinity_community') || '[]');
                if (!Array.isArray(this.communityProjects)) this.communityProjects = [];
            } catch (e) {
                console.error("Community Data Corrupt:", e);
                this.communityProjects = [];
            }

            try {
                this.myProjects = JSON.parse(localStorage.getItem('infinity_my_projects') || '[]');
                if (!Array.isArray(this.myProjects)) this.myProjects = [];
            } catch (e) {
                console.error("MyProjects Data Corrupt:", e);
                this.myProjects = [];
            }
        }

        saveLocal(project) {
            const index = this.myProjects.findIndex(p => p.id === project.id);
            if (index >= 0) {
                this.myProjects[index] = project;
            } else {
                this.myProjects.unshift(project);
            }
            try {
                localStorage.setItem('infinity_my_projects', JSON.stringify(this.myProjects));
                return true;
            } catch (e) {
                const t = TRANSLATIONS[currentLang];
                console.error("Storage Save Error:", e);
                alert(t.err_save || "❌ Erro ao salvar: Armazenamento cheio ou bloqueado!");
                return false;
            }
        }

        getMyProjects() {
            if (userMgr.currentUser) {
                return this.myProjects.filter(p => p.author === userMgr.currentUser);
            }
            return [];
        }

        publish(project) {
            try {
                this.communityProjects.unshift(project);
                localStorage.setItem('infinity_community', JSON.stringify(this.communityProjects));
                return true;
            } catch (e) {
                const t = TRANSLATIONS[currentLang];
                console.error("Storage Limit Reached:", e);
                alert(t.err_storage_full || "❌ Erro: Espaço de armazenamento cheio! Não foi possível publicar.\nTente excluir alguns projetos antigos.");
                this.communityProjects.shift(); // Rollback
                return false;
            }
        }

        delete(projectId, isCommunity = false) {
            if (isCommunity) {
                this.communityProjects = this.communityProjects.filter(p => p.id !== projectId);
                localStorage.setItem('infinity_community', JSON.stringify(this.communityProjects));
            } else {
                this.myProjects = this.myProjects.filter(p => p.id !== projectId);
                localStorage.setItem('infinity_my_projects', JSON.stringify(this.myProjects));
            }
        }

        getCommunityProjects() {
            return this.communityProjects;
        }
    }

    const userMgr = new UserManager();
    const projectMgr = new ProjectManager();

    // SECRET DEBUG: Click logo 5 times to show storage info
    let logoClicks = 0;
    document.querySelector('.logo').addEventListener('click', () => {
        logoClicks++;
        if (logoClicks === 5) {
            logoClicks = 0;
            const mySize = (localStorage.getItem('infinity_my_projects') || '').length;
            const commSize = (localStorage.getItem('infinity_community') || '').length;

            const msg = `🛠️ DIAGNÓSTICO:\n` +
                `- Projetos Locais: ${projectMgr.myProjects.length} (${(mySize / 1024).toFixed(2)} KB)\n` +
                `- Projetos Comunidade: ${projectMgr.communityProjects.length} (${(commSize / 1024).toFixed(2)} KB)\n` +
                `- Total Storage: ${((mySize + commSize) / 1024).toFixed(2)} KB\n` +
                `- User: ${userMgr.currentUser}\n\n` +
                `Deseja resetar e criar dados de teste na Comunidade?`;

            if (confirm(msg)) {
                reseedCommunity();
            }
        }
    });

    function reseedCommunity() {
        // Helper to generate block HTML
        const b = (type, cat, label, inputs = {}) => {
            let html = `<div class="block workspace-block" data-type="${type}" data-category="${cat}">`;

            // Notches
            if (type.startsWith('motion') || type.startsWith('looks')) html += `<div class="block-notch-top"></div>`;
            if (type !== 'control_forever') html += `<div class="block-notch-bottom"></div>`;

            // Content
            // Quick-n-dirty parser for label with inputs
            let parts = label.split(/(%[ns])/g);
            let pIdx = 0;
            const paramKeys = Object.keys(inputs);

            parts.forEach(part => {
                if (part === '%n' || part === '%s') {
                    const val = inputs[paramKeys[pIdx]] || 0;
                    const name = paramKeys[pIdx];
                    html += `<input class="block-input" name="${name}" value="${val}">`;
                    pIdx++;
                } else {
                    html += `<span>${part}</span>`;
                }
            });

            html += `</div>`;
            return html;
        };

        // Construct "Super Mario Control" workspace
        // We need 3 stacks: Right, Left, Jump

        let demoWorkspace = "";

        // Stack 1: Right Arrow
        demoWorkspace += `<div style="position:absolute; top:50px; left:50px;">`;
        demoWorkspace += b('event_key', 'events', 'Quando a tecla %s for pressionada', { key: 'seta direita' });
        demoWorkspace += b('motion_change_x', 'motion', 'Mude x por %n', { dx: '10' });
        demoWorkspace += b('looks_change_color', 'looks', 'Mude cor em %n', { amount: '5' }); // Visual feedback
        demoWorkspace += `</div>`;

        // Stack 2: Left Arrow
        demoWorkspace += `<div style="position:absolute; top:200px; left:50px;">`;
        demoWorkspace += b('event_key', 'events', 'Quando a tecla %s for pressionada', { key: 'seta esquerda' });
        demoWorkspace += b('motion_change_x', 'motion', 'Mude x por %n', { dx: '-10' });
        demoWorkspace += `</div>`;

        // Stack 3: Jump (Space) - Simple up/down
        demoWorkspace += `<div style="position:absolute; top:50px; left:350px;">`;
        demoWorkspace += b('event_key', 'events', 'Quando a tecla %s for pressionada', { key: 'espaço' });
        demoWorkspace += b('motion_change_y', 'motion', 'Mude y por %n', { dy: '50' });
        demoWorkspace += b('control_wait', 'control', 'Espere %n segs', { seconds: '0.3' });
        demoWorkspace += b('motion_change_y', 'motion', 'Mude y por %n', { dy: '-50' });
        demoWorkspace += `</div>`;

        const samples = [
            {
                id: 'demo1', title: 'Mario Control Demo', author: 'DevTeam', date: 'New',
                data: {
                    workspace: demoWorkspace,
                    sprite: { x: 0, y: 0, direction: 90, size: 100, visible: true },
                    background: { type: 'platformer' }
                }
            },
            {
                id: 'demo2', title: 'Space Adventure', author: 'RocketMan', date: '01/01/2026',
                data: { workspace: '', sprite: {}, background: { type: 'color', color: '#000000' } }
            }
        ];

        localStorage.setItem('infinity_community', JSON.stringify(samples));
        projectMgr.communityProjects = samples;
        const t = TRANSLATIONS[currentLang];
        alert(t.demo_created || "🎮 Demo 'Mario Control' criado com sucesso!\nUse as Setas e Espaço para jogar.");

        // Force refresh
        const commTab = document.querySelector('[data-tab="community"]');
        if (commTab) commTab.click();
    }

    // --- Authentication & Dashboard Logic ---
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const userDisplay = document.getElementById('user-display');
    const authMessage = document.getElementById('auth-message');
    const btnNewProject = document.getElementById('btn-new-project');
    const projectsGrid = document.querySelector('.projects-grid');
    const logoutBtn = document.getElementById('logout-btn');
    const tabs = document.querySelectorAll('.dash-tab');

    // Auto Login Check
    if (userMgr.isLoggedIn()) {
        userDisplay.textContent = userMgr.currentUser;
        switchView('dashboard');
        renderDashboard('my-projects');
    }

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userMgr.logout();
            UiSounds.trash(); // Sound for "exit"
            // Clear inputs
            usernameInput.value = '';
            // Checking if passwordInput exists (it should now)
            if (passwordInput) passwordInput.value = '';
            if (authMessage) authMessage.textContent = '';
        });
    }

    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput ? passwordInput.value.trim() : "";
        const t = TRANSLATIONS[currentLang];

        if (!username || !password) {
            if (authMessage) {
                authMessage.textContent = t.err_fill_auth || "⚠️ Preencha nome e senha!";
                authMessage.style.color = '#f59e0b';
            }
            return;
        }

        const existingUser = userMgr.users.find(u => u.username === username);

        if (existingUser) {
            // Attempt Login
            const result = userMgr.login(username, password);
            if (result.success) {
                userDisplay.textContent = userMgr.currentUser;
                UiSounds.start();
                switchView('dashboard');
                renderDashboard('my-projects');
            } else {
                if (authMessage) {
                    authMessage.textContent = result.message;
                    authMessage.style.color = '#ef4444';
                }
                UiSounds.trash();
            }
        } else {
            // Attempt Register
            const result = userMgr.register(username, password);
            if (result.success) {
                userDisplay.textContent = userMgr.currentUser;
                UiSounds.start();
                switchView('dashboard');
                renderDashboard('my-projects');
            } else {
                if (authMessage) {
                    authMessage.textContent = result.message;
                    UiSounds.trash();
                }
            }
        }
    });

    // Bug 10 Fix: Enter key on login inputs
    [usernameInput, passwordInput].forEach(input => {
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') loginBtn.click();
            });
        }
    });

    // Dashboard Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log("Tab clicked:", tab.dataset.tab);
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            try {
                renderDashboard(tab.dataset.tab);
            } catch (e) {
                alert("Erro ao trocar de aba: " + e.message);
                console.error(e);
            }
        });
    });

    function renderDashboard(tabName) {
        console.log("Rendering Dashboard:", tabName);

        if (!projectsGrid) {
            console.error("Erro Interno: Elemento '.projects-grid' não foi encontrado no HTML!");
            return;
        }

        try {
            // 1. Clear grid safely
            // Remove text nodes and cards, keeping .new-project
            const children = Array.from(projectsGrid.childNodes);
            children.forEach(c => {
                if (c.nodeType === 3) c.remove(); // Text nodes
                if (c.classList && !c.classList.contains('new-project')) c.remove();
            });

            if (tabName === 'community') {
                document.querySelector('.new-project').style.display = 'none';

                let commProjects = projectMgr.getCommunityProjects();

                if (!Array.isArray(commProjects)) commProjects = [];
                const validProjects = commProjects.filter(p => p && p.id && p.title);

                validProjects.forEach(p => {
                    const card = createProjectCard(p, true);
                    if (card) {
                        projectsGrid.appendChild(card);
                    }
                });

                const count = projectsGrid.querySelectorAll('.project-card:not(.new-project)').length;

                if (count === 0) {
                    const t = TRANSLATIONS[currentLang];
                    const msg = document.createElement('div');
                    msg.className = 'empty-state-msg';
                    msg.style.cssText = 'width: 100%; text-align: center; grid-column: 1 / -1; padding: 40px; color: #cbd5e1; font-size: 1.2rem; display: flex; flex-direction: column; align-items: center; gap: 10px;';
                    msg.innerHTML = `
                        <div style="font-size: 3rem;">🕵️</div>
                        <h3>${t.nothing_here}</h3>
                        <p>${t.error_loading}</p>
                        ${tabName === 'my-projects' ? `<p>${t.use_new_card}</p>` : `<p>${t.be_first_publish}</p>`}
                    `;
                    projectsGrid.appendChild(msg);
                }

            } else {
                // ... My Projects Logic ...
                document.querySelector('.new-project').style.display = 'flex';

                let myProjs = projectMgr.getMyProjects();
                const validMyProjs = (myProjs || []).filter(p => p && p.id);

                validMyProjs.forEach(p => {
                    const card = createProjectCard(p, false);
                    if (card) projectsGrid.appendChild(card);
                });

                // Post-render check for My Projects
                const count = projectsGrid.querySelectorAll('.project-card:not(.new-project)').length;
                if (count === 0) {
                    const t = TRANSLATIONS[currentLang];
                    const msg = document.createElement('div');
                    msg.className = 'empty-state-msg';
                    msg.style.cssText = 'width: 100%; text-align: center; grid-column: 1 / -1; padding: 40px; color: #fff; font-size: 1.2rem;';
                    msg.innerHTML = `<h3>${t.no_my_games}</h3><p>${t.create_first_game}</p>`;
                    projectsGrid.appendChild(msg);
                }
            }
        } catch (e) {
            console.error("Dashboard Render Error:", e);
            alert("❌ Erro ao carregar dashboard: " + e.message);
        }
    }

    function createProjectCard(data, isCommunity = true) {
        if (!data) return null; // Safety check
        const div = document.createElement('div');
        div.className = 'project-card';
        // Check ownership OR Admin
        const isOwner = userMgr.currentUser && data.author === userMgr.currentUser;
        const isAdmin = userMgr.isAdmin();
        const canDelete = isOwner || isAdmin;

        const t = TRANSLATIONS[currentLang];
        div.innerHTML = `
            <div class="card-icon">🎮</div>
            <h3>${data.title || t.no_title}</h3>
            <p>${t.by_author} ${data.author || t.anon_author} ${data.author === 'admin' ? '🛡️' : ''}</p>
            <div class="card-footer">
                <button class="card-btn play-btn">▶</button>
                ${canDelete ? '<button class="card-btn delete-btn">🗑️</button>' : ''}
            </div>
        `;

        // Play Handler (Read Only)
        const playBtn = div.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof playProject === 'function') {
                    playProject(data);
                } else {
                    console.error("playProject function is missing!");
                    alert("Erro interno: Função de jogar não encontrada.");
                }
            });
        }

        // Edit Handler
        const editBtn = div.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                loadProject(data);
            });
        }

        // Delete Handler
        if (canDelete) {
            const delBtn = div.querySelector('.delete-btn');
            if (delBtn) {
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const msg = isOwner ? `Excluir "${data.title}"?` : `[ADMIN] Excluir jogo de ${data.author}?`;
                    if (confirm(msg)) {
                        projectMgr.delete(data.id, isCommunity);
                        UiSounds.trash();
                        renderDashboard(isCommunity ? 'community' : 'my-projects');
                    }
                });
            }
        }

        return div;
    }

    btnNewProject.addEventListener('click', () => {
        // RESET STATE for New Project
        currentProjectID = null;
        workspaceEl.innerHTML = '<div class="workspace-grid"></div><div class="start-hint">Arraste blocos para cá para começar</div><div id="drag-container"></div>';
        stage.reset();
        stage.background = { type: 'color', color: '#ffffff' }; // Default BG

        // Re-add listeners to empty workspace (if any needed for drop zones, though generic drag handles it)

        switchView('editor');
        const overlay = document.getElementById('game-selection-overlay');
        if (overlay) overlay.classList.remove('hidden');
    });

    // --- File Import Logic ---
    const fileInput = document.getElementById('import-file');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    // Auto-set as sprite immediately or paint on grid?
                    // Let's set it immediately for "Easy Import"
                    stage.setSpriteImage(dataUrl);

                    // Also close modal
                    document.getElementById('sprite-editor-overlay').classList.add('hidden');
                    console.log('Imagem importada com sucesso!');
                    UiSounds.success(); // Future method
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Audio System (Synthetic) ---
    const UiSounds = {
        ctx: new (window.AudioContext || window.webkitAudioContext)(),

        playTone(freq, type, duration, vol = 0.1) {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        },

        snap() {
            // High pitched click
            this.playTone(800, 'sine', 0.1, 0.15);
            setTimeout(() => this.playTone(1200, 'sine', 0.05, 0.1), 50);
        },

        click() {
            this.playTone(400, 'triangle', 0.05, 0.1);
        },

        trash() {
            this.playTone(150, 'sawtooth', 0.2, 0.1);
            this.playTone(100, 'sawtooth', 0.2, 0.1);
        },

        start() {
            this.playTone(400, 'sine', 0.1, 0.1);
            setTimeout(() => this.playTone(600, 'sine', 0.2, 0.1), 100);
            setTimeout(() => this.playTone(800, 'sine', 0.4, 0.1), 200);
        },

        success() {
            this.playTone(400, 'sine', 0.1, 0.1);
            setTimeout(() => this.playTone(800, 'sine', 0.2, 0.1), 150);
        }
    };

    // --- Initialization ---

    function initPalette(category = 'motion') {
        paletteEl.innerHTML = '';
        const blocks = BLOCK_DEFINITIONS.filter(b => b.category === category);

        blocks.forEach(blockData => {
            const blockEl = BlockFactory.createBlockElement(blockData);
            blockEl.addEventListener('mousedown', startPaletteDrag);
            blockEl.addEventListener('touchstart', startPaletteDrag, { passive: false });
            paletteEl.appendChild(blockEl);
        });
    }

    // Tab switching
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            initPalette(e.currentTarget.dataset.category);
        });
    });

    // Control Buttons
    document.getElementById('run-btn').addEventListener('click', () => {
        UiSounds.start();
        interpreter.run();
    });

    // Auto-start interpreter when a game key is pressed (no need to click Execute)
    const GAME_KEYS = new Set([
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'w', 'a', 's', 'd', ' ', 'b'
    ]);
    document.addEventListener('keydown', (e) => {
        // Only auto-start in editor or player view, and only for game keys
        const editorVisible = !document.getElementById('view-editor').classList.contains('hidden');
        const playerVisible = !document.getElementById('view-player').classList.contains('hidden');
        if ((editorVisible || playerVisible) && GAME_KEYS.has(e.key) && !interpreter.isRunning) {
            interpreter.run();
        }
    });
    document.getElementById('stop-btn').addEventListener('click', () => interpreter.stop());
    document.getElementById('back-to-dash-btn').addEventListener('click', () => {
        interpreter.stop();
        // Move canvas back to editor
        if (editorStageMount && stageCanvas && stageCanvas.parentNode !== editorStageMount) {
            editorStageMount.appendChild(stageCanvas);
        }
        switchView('dashboard');
        renderDashboard('my-projects');
    });

    // --- GAMEPAD LOGIC ---
    const gamepadButtons = document.querySelectorAll('.gp-btn');

    function simulateKey(key, type) {
        const event = new KeyboardEvent(type, {
            key: key,
            code: key === ' ' ? 'Space' : key,
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    gamepadButtons.forEach(btn => {
        const key = btn.dataset.key;

        // Mouse Events
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            simulateKey(key, 'keydown');
        });
        btn.addEventListener('mouseup', (e) => {
            e.preventDefault();
            simulateKey(key, 'keyup');
        });
        btn.addEventListener('mouseleave', (e) => {
            simulateKey(key, 'keyup'); // Safety release
        });

        // Touch Events (Mobile)
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scroll/zoom
            simulateKey(key, 'keydown');
            btn.classList.add('active'); // Visual feedback
        }, { passive: false });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            simulateKey(key, 'keyup');
            btn.classList.remove('active');
        });
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        interpreter.stop();
        stage.reset();
    });
    document.getElementById('clear-workspace').addEventListener('click', () => {
        workspaceEl.innerHTML = '<div class="workspace-grid"></div><div class="start-hint">Arraste blocos para cá para começar</div><div id="drag-container"></div>';
    });

    // --- Drag & Drop Logic ---
    const blockTrash = document.getElementById('block-trash');

    // Helper to get position from mouse or touch event
    function getPointerPos(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        if (e.changedTouches && e.changedTouches.length > 0) {
            return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }

    function startPaletteDrag(e) {
        e.preventDefault();
        const pos = getPointerPos(e);
        const template = e.currentTarget;

        // Clone for dragging
        draggedBlock = template.cloneNode(true);
        draggedBlock.classList.add('dragging');
        draggedBlock.classList.add('workspace-block'); // It will become one

        // Calculate offset to grab from same point
        const rect = template.getBoundingClientRect();
        dragOffsetX = pos.x - rect.left;
        dragOffsetY = pos.y - rect.top;

        // Move to drag container (overlay)
        draggedBlock.style.left = pos.x - dragOffsetX + 'px';
        draggedBlock.style.top = pos.y - dragOffsetY + 'px';

        document.body.appendChild(draggedBlock);
        isDraggingFromPalette = true;

        // Show trash zone
        if (blockTrash) blockTrash.classList.remove('hidden');

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onDrop);
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('touchend', onDrop);
    }

    function startWorkspaceDrag(e) {
        // Only if clicking the block itself, not inputs
        if (e.target.tagName === 'INPUT') return;

        e.preventDefault();
        const pos = getPointerPos(e);
        draggedBlock = e.currentTarget;

        // Detach from workspace temporarily or just move absolute
        draggedBlock.classList.add('dragging');

        const rect = draggedBlock.getBoundingClientRect();
        dragOffsetX = pos.x - rect.left;
        dragOffsetY = pos.y - rect.top;

        // Move to body level to float above everything else? 
        // Actually, better to keep in workspace relative-absolute if just moving.
        // But for consistency let's put in body during drag.
        const oldLeft = rect.left;
        const oldTop = rect.top;
        document.body.appendChild(draggedBlock);
        draggedBlock.style.left = oldLeft + 'px';
        draggedBlock.style.top = oldTop + 'px';

        isDraggingFromPalette = false;

        // Show trash zone
        if (blockTrash) blockTrash.classList.remove('hidden');

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onDrop);
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('touchend', onDrop);
    }

    function onDrag(e) {
        if (!draggedBlock) return;
        e.preventDefault();
        const pos = getPointerPos(e);

        const x = pos.x - dragOffsetX;
        const y = pos.y - dragOffsetY;

        draggedBlock.style.left = x + 'px';
        draggedBlock.style.top = y + 'px';

        // Detect hover over trash zone
        if (blockTrash) {
            const trashRect = blockTrash.getBoundingClientRect();
            const blockRect = draggedBlock.getBoundingClientRect();
            const overTrash = (
                blockRect.left < trashRect.right &&
                blockRect.right > trashRect.left &&
                blockRect.top < trashRect.bottom &&
                blockRect.bottom > trashRect.top
            );
            blockTrash.classList.toggle('drag-over', overTrash);
        }

        checkSnapping(draggedBlock);
    }

    function onDrop(e) {
        if (!draggedBlock) return;

        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onDrop);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', onDrop);

        draggedBlock.classList.remove('dragging');

        // Hide trash zone
        if (blockTrash) {
            blockTrash.classList.add('hidden');
            blockTrash.classList.remove('drag-over');
        }

        // Check if dropped on trash zone
        const blockRect = draggedBlock.getBoundingClientRect();
        let droppedOnTrash = false;
        if (blockTrash) {
            const trashRect = blockTrash.getBoundingClientRect();
            droppedOnTrash = (
                blockRect.left < trashRect.right &&
                blockRect.right > trashRect.left &&
                blockRect.top < trashRect.bottom &&
                blockRect.bottom > trashRect.top
            );
        }

        if (droppedOnTrash) {
            // Delete the block
            draggedBlock.remove();
            UiSounds.trash();
            draggedBlock = null;
            return;
        }

        // Check if dropped inside workspace
        const workspaceRect = workspaceEl.getBoundingClientRect();

        // Overlap detection
        const inWorkspace = (
            blockRect.left < workspaceRect.right &&
            blockRect.right > workspaceRect.left &&
            blockRect.top < workspaceRect.bottom &&
            blockRect.bottom > workspaceRect.top
        );

        if (inWorkspace) {
            // Move to workspace container
            workspaceEl.appendChild(draggedBlock);

            // Adjust position relative to workspace
            const relX = blockRect.left - workspaceRect.left + workspaceEl.scrollLeft;
            const relY = blockRect.top - workspaceRect.top + workspaceEl.scrollTop;

            draggedBlock.style.left = relX + 'px';
            draggedBlock.style.top = relY + 'px';

            // Add handler for future drags if new
            if (isDraggingFromPalette) {
                draggedBlock.addEventListener('mousedown', startWorkspaceDrag);
                draggedBlock.addEventListener('touchstart', startWorkspaceDrag, { passive: false });
                UiSounds.click(); // Drop sound
            }

            // Handle Snapping finalization
            const snapTarget = findSnapTarget(draggedBlock);
            if (snapTarget) {
                snapToBlock(draggedBlock, snapTarget);
                UiSounds.snap(); // SNAP SOUND
            }

        } else {
            // Dropped outside (delete)
            draggedBlock.remove();
            UiSounds.trash(); // TRASH SOUND
        }

        draggedBlock = null;
    }

    // --- Snapping Logic ---

    function findSnapTarget(movingBlock) {
        const movingRect = movingBlock.getBoundingClientRect();
        const candidates = Array.from(workspaceEl.querySelectorAll('.workspace-block:not(.dragging)'));

        for (let other of candidates) {
            if (other === movingBlock) continue;

            const otherRect = other.getBoundingClientRect();

            // Tolerance: 40px for easier snapping
            const verticalDist = Math.abs(movingRect.top - otherRect.bottom);
            const horizontalDist = Math.abs(movingRect.left - otherRect.left);

            if (verticalDist < 40 && horizontalDist < 40) {
                return other;
            }
        }
        return null;
    }

    function checkSnapping(movingBlock) {
        // Future: visual snap indicator
    }

    function snapToBlock(movingBlock, targetBlock) {
        // Align visually
        const targetRect = targetBlock.getBoundingClientRect();
        const workspaceRect = workspaceEl.getBoundingClientRect();

        const relX = targetRect.left - workspaceRect.left + workspaceEl.scrollLeft;
        const relY = targetRect.bottom - workspaceRect.top + workspaceEl.scrollTop;

        movingBlock.style.left = relX + 'px';
        movingBlock.style.top = relY + 'px';

        // DOM Structure: Move movingBlock to be immediately after targetBlock
        workspaceEl.insertBefore(movingBlock, targetBlock.nextElementSibling);

        console.log(`🔗 Snap confirmed: ${movingBlock.dataset.type} -> ${targetBlock.dataset.type}`);
    }

    // --- Game Selection & Initialization ---

    const overlay = document.getElementById('game-selection-overlay');
    const appContainer = document.querySelector('.app-container');

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            startGame(type);
        });
    });

    function startGame(type) {
        // Hide overlay (keep in DOM for reuse when creating new projects)
        overlay.classList.add('hidden');
        appContainer.classList.add('active'); // Removes blur

        // Init defaults
        initPalette('motion');

        // Setup based on type (Placeholder for now)
        if (type === 'rpg') {
            console.log('Iniciando modo RPG...');
            // In future: Load specific tilemap blocks or assets
        } else if (type === 'platformer') {
            console.log('Iniciando modo Plataforma...');
            // Set Mario-style procedural background
            stage.background.type = 'platformer';
        }
    }

    // Default init (wait for selection now)
    // initPalette('motion'); // Moved to startGame
    // --- Sprite Editor Logic ---
    const editBtn = document.getElementById('edit-sprite-btn');
    const editorOverlay = document.getElementById('sprite-editor-overlay');
    const closeEditorBtn = document.getElementById('close-editor');
    const saveSpriteBtn = document.getElementById('save-sprite-btn');
    const gridEl = document.getElementById('pixel-grid');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const customColorInput = document.getElementById('custom-color');

    let currentColor = '#000000';
    let isDrawing = false;

    // Init Grid (16x16)
    if (gridEl) { // Check if element exists
        gridEl.innerHTML = ''; // Clear existing
        for (let i = 0; i < 256; i++) {
            const cell = document.createElement('div');
            cell.className = 'pixel-cell';
            cell.addEventListener('mousedown', () => { isDrawing = true; paint(cell); });
            cell.addEventListener('mouseover', () => { if (isDrawing) paint(cell); });
            gridEl.appendChild(cell);
        }
    }

    document.addEventListener('mouseup', () => isDrawing = false);

    function paint(cell) {
        cell.style.backgroundColor = currentColor;
    }

    // Tools
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const active = document.querySelector('.color-swatch.active');
            if (active) active.classList.remove('active');
            swatch.classList.add('active');
            currentColor = swatch.dataset.color;
        });
    });

    if (customColorInput) {
        customColorInput.addEventListener('input', (e) => {
            currentColor = e.target.value;
        });
    }

    // Modal Control
    if (editBtn && editorOverlay) {
        editBtn.addEventListener('click', () => {
            editorOverlay.classList.remove('hidden');
        });

        closeEditorBtn.addEventListener('click', () => {
            editorOverlay.classList.add('hidden');
        });
    }

    // --- Level Editor Logic ---
    const editLevelBtn = document.getElementById('edit-level-btn');
    const levelEditorOverlay = document.getElementById('level-editor-overlay');
    const closeLevelBtn = document.getElementById('close-level-editor');
    const saveLevelBtn = document.getElementById('save-level-btn');
    const clearLevelBtn = document.getElementById('clear-level-btn');
    const levelGridEl = document.getElementById('level-grid');

    let isDrawingLevel = false;
    let levelMode = 'add';
    let levelBrush = 'obstacle'; // 'obstacle', 'goal', or 'enemy'

    const LEVEL_COLS = 80;
    const LEVEL_ROWS = 15;

    const BRUSH_COLORS = {
        obstacle: { bg: '#d97706', border: '#d97706', text: '#fff', label: '🧱 Obstáculo' },
        goal: { bg: '#fbbf24', border: '#fbbf24', text: '#000', label: '🏁 Meta' },
        enemy: { bg: '#dc2626', border: '#dc2626', text: '#fff', label: '👾 Inimigo' }
    };

    function initLevelGrid() {
        if (!levelGridEl) return;
        levelGridEl.innerHTML = '';
        levelGridEl.style.gridTemplateColumns = `repeat(${LEVEL_COLS}, 24px)`;
        levelBrush = 'obstacle'; // Always reset brush when opening editor

        for (let r = 0; r < LEVEL_ROWS; r++) {
            for (let c = 0; c < LEVEL_COLS; c++) {
                const cell = document.createElement('div');
                cell.className = 'level-cell';
                cell.dataset.r = r;
                cell.dataset.c = c;

                // Mark the starting column (character starts here)
                if (c === 3 && r === Math.floor(LEVEL_ROWS / 2)) {
                    cell.style.position = 'relative';
                    const marker = document.createElement('span');
                    marker.textContent = '🏠';
                    marker.style.cssText = 'position:absolute;top:0;left:0;font-size:16px;pointer-events:none;opacity:0.7;z-index:1;';
                    cell.appendChild(marker);
                }

                cell.addEventListener('mousedown', (e) => {
                    isDrawingLevel = true;
                    if (cell.classList.contains('obstacle') || cell.classList.contains('goal') || cell.classList.contains('enemy')) {
                        levelMode = 'remove';
                    } else {
                        levelMode = 'add';
                    }
                    updateLevelCell(cell);
                });

                cell.addEventListener('mouseover', () => {
                    if (isDrawingLevel) updateLevelCell(cell);
                });

                levelGridEl.appendChild(cell);
            }
        }

        // Inject brush toggle bar
        let brushBar = document.getElementById('level-brush-bar');
        if (brushBar) brushBar.remove();

        brushBar = document.createElement('div');
        brushBar.id = 'level-brush-bar';
        brushBar.style.cssText = 'display:flex; gap:8px; margin-bottom:10px; align-items:center; flex-wrap:wrap;';

        const t = TRANSLATIONS[currentLang];
        let brushHTML = `<span style="color:#cbd5e1; font-size:0.9rem;">${t.brush_label}</span>`;
        for (const [key, info] of Object.entries(BRUSH_COLORS)) {
            const isActive = key === 'obstacle';
            brushHTML += `<button class="brush-btn ${isActive ? 'active' : ''}" data-brush="${key}" style="padding:6px 14px; border:2px solid ${info.border}; background:${isActive ? info.bg : 'transparent'}; color:${isActive ? info.text : info.border}; border-radius:8px; cursor:pointer; font-weight:bold;">${info.label}</button>`;
        }
        // Enemy editor button
        brushHTML += `<button id="edit-enemy-btn" style="padding:6px 14px; border:2px solid #ef4444; background:transparent; color:#ef4444; border-radius:8px; cursor:pointer; font-weight:bold; margin-left:auto;">${t.edit_enemy}</button>`;
        brushBar.innerHTML = brushHTML;
        levelGridEl.parentNode.insertBefore(brushBar, levelGridEl);

        // Brush button click handlers
        brushBar.querySelectorAll('.brush-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                brushBar.querySelectorAll('.brush-btn').forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.color = BRUSH_COLORS[b.dataset.brush].border;
                });
                btn.classList.add('active');
                levelBrush = btn.dataset.brush;
                const info = BRUSH_COLORS[levelBrush];
                btn.style.background = info.bg;
                btn.style.color = info.text;
            });
        });

        // Enemy editor button
        document.getElementById('edit-enemy-btn').addEventListener('click', openEnemyEditor);
    }

    function updateLevelCell(cell) {
        if (levelMode === 'add') {
            cell.classList.remove('obstacle', 'goal', 'enemy', 'active');
            cell.classList.add(levelBrush);
            if (levelBrush === 'obstacle') cell.classList.add('active');
            cell.style.backgroundColor = BRUSH_COLORS[levelBrush].bg;
        } else {
            cell.classList.remove('obstacle', 'goal', 'enemy', 'active');
            cell.style.backgroundColor = '';
        }
    }

    document.addEventListener('mouseup', () => isDrawingLevel = false);

    // Open Editor
    if (editLevelBtn) {
        editLevelBtn.addEventListener('click', () => {
            initLevelGrid();

            const cells = levelGridEl.children;
            // Load obstacles
            stage.obstacles.forEach(obs => {
                const index = obs.r * LEVEL_COLS + obs.c;
                if (cells[index]) {
                    cells[index].classList.add('obstacle', 'active');
                    cells[index].style.backgroundColor = '#d97706';
                }
            });
            // Load goals
            (stage.goals || []).forEach(goal => {
                const index = goal.r * LEVEL_COLS + goal.c;
                if (cells[index]) {
                    cells[index].classList.add('goal');
                    cells[index].style.backgroundColor = '#fbbf24';
                }
            });
            // Load enemies
            (stage.enemies || []).forEach(enemy => {
                const index = enemy.r * LEVEL_COLS + enemy.c;
                if (cells[index]) {
                    cells[index].classList.add('enemy');
                    cells[index].style.backgroundColor = '#dc2626';
                }
            });

            levelEditorOverlay.classList.remove('hidden');
        });
    }

    // Close Editor
    if (closeLevelBtn) {
        closeLevelBtn.addEventListener('click', () => {
            levelEditorOverlay.classList.add('hidden');
        });
    }

    // Save Level
    if (saveLevelBtn) {
        saveLevelBtn.addEventListener('click', () => {
            const newObstacles = [];
            const newGoals = [];
            const newEnemies = [];
            const cells = levelGridEl.children;

            for (let i = 0; i < cells.length; i++) {
                const r = parseInt(cells[i].dataset.r);
                const c = parseInt(cells[i].dataset.c);

                if (cells[i].classList.contains('obstacle')) {
                    newObstacles.push({ r, c });
                } else if (cells[i].classList.contains('goal')) {
                    newGoals.push({ r, c });
                } else if (cells[i].classList.contains('enemy')) {
                    newEnemies.push({ r, c });
                }
            }

            stage.setObstacles(newObstacles);
            stage.setGoals(newGoals);
            stage.setEnemies(newEnemies);
            levelEditorOverlay.classList.add('hidden');
            UiSounds.success();
        });
    }

    // Clear Level
    if (clearLevelBtn) {
        clearLevelBtn.addEventListener('click', () => {
            if (confirm('Limpar todo o nível?')) {
                const cells = levelGridEl.querySelectorAll('.level-cell');
                cells.forEach(c => {
                    c.classList.remove('active', 'obstacle', 'goal', 'enemy');
                    c.style.backgroundColor = '';
                });
            }
        });
    }

    // --- Enemy Sprite Editor ---
    function openEnemyEditor() {
        // Remove existing if any
        let existing = document.getElementById('enemy-editor-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'enemy-editor-overlay';
        overlay.className = 'overlay';
        const t = TRANSLATIONS[currentLang];
        overlay.innerHTML = `
            <div class="editor-modal glass-panel" style="max-width:420px;">
                <div class="modal-header">
                    <h2>${t.enemy_editor_title}</h2>
                    <button id="close-enemy-editor" class="icon-btn">✕</button>
                </div>
                <div class="editor-body">
                    <div style="display:flex; gap:10px; margin-bottom:10px;">
                        <label for="enemy-import-file" class="secondary-btn" style="cursor:pointer;">${t.enemy_import}</label>
                        <input type="file" id="enemy-import-file" accept="image/*" style="display:none;">
                        <button id="enemy-clear-btn" class="secondary-btn" style="background:#ef4444;">${t.enemy_clear}</button>
                    </div>
                    <canvas id="enemy-pixel-canvas" width="320" height="320" style="border:2px solid #475569; border-radius:8px; cursor:crosshair; image-rendering:pixelated;"></canvas>
                    <div class="editor-tools" style="margin-top:10px;">
                        <div class="color-palette">
                            <div class="color-swatch active" style="--bg: #dc2626" data-ecolor="#dc2626"></div>
                            <div class="color-swatch" style="--bg: #000000" data-ecolor="#000000"></div>
                            <div class="color-swatch" style="--bg: #ffffff" data-ecolor="#ffffff"></div>
                            <div class="color-swatch" style="--bg: #22c55e" data-ecolor="#22c55e"></div>
                            <div class="color-swatch" style="--bg: #3b82f6" data-ecolor="#3b82f6"></div>
                            <div class="color-swatch" style="--bg: #a855f7" data-ecolor="#a855f7"></div>
                            <div class="color-swatch" style="--bg: #f59e0b" data-ecolor="#f59e0b"></div>
                            <div class="color-swatch eraser" data-ecolor="transparent" title="${t.eraser}">⬜</div>
                        </div>
                        <input type="color" id="enemy-custom-color" value="#dc2626">
                        <button id="save-enemy-btn" class="control-btn run">${t.enemy_save}</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Canvas pixel editor (16x16 grid)
        const canvas = document.getElementById('enemy-pixel-canvas');
        const ctx = canvas.getContext('2d');
        const GRID_SIZE = 16;
        const CELL_SIZE = canvas.width / GRID_SIZE;
        const pixelData = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));

        // Load existing enemy image data if available
        if (stage.enemyImage) {
            ctx.drawImage(stage.enemyImage, 0, 0, canvas.width, canvas.height);
            // Extract pixel data from existing image
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    const imgData = ctx.getImageData(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 1, 1).data;
                    if (imgData[3] > 0) {
                        pixelData[y][x] = `rgb(${imgData[0]},${imgData[1]},${imgData[2]})`;
                    }
                }
            }
        }

        let currentColor = '#dc2626';
        let isDrawing = false;

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    if (pixelData[y][x]) {
                        ctx.fillStyle = pixelData[y][x];
                        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    } else {
                        // Checkerboard for transparency
                        ctx.fillStyle = (x + y) % 2 === 0 ? '#2d3748' : '#1a202c';
                        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
            // Grid lines
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= GRID_SIZE; i++) {
                ctx.beginPath();
                ctx.moveTo(i * CELL_SIZE, 0);
                ctx.lineTo(i * CELL_SIZE, canvas.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * CELL_SIZE);
                ctx.lineTo(canvas.width, i * CELL_SIZE);
                ctx.stroke();
            }
        }

        function paint(e) {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
            const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
            if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
                pixelData[y][x] = currentColor === 'transparent' ? null : currentColor;
                drawGrid();
            }
        }

        canvas.addEventListener('mousedown', (e) => { isDrawing = true; paint(e); });
        canvas.addEventListener('mousemove', (e) => { if (isDrawing) paint(e); });
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseleave', () => isDrawing = false);

        // Color swatches
        overlay.querySelectorAll('[data-ecolor]').forEach(swatch => {
            swatch.addEventListener('click', () => {
                overlay.querySelectorAll('[data-ecolor]').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                currentColor = swatch.dataset.ecolor;
            });
        });

        // Custom color picker
        document.getElementById('enemy-custom-color').addEventListener('input', (e) => {
            currentColor = e.target.value;
        });

        // Import image
        document.getElementById('enemy-import-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Update pixel data
                    for (let y = 0; y < GRID_SIZE; y++) {
                        for (let x = 0; x < GRID_SIZE; x++) {
                            const imgData = ctx.getImageData(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 1, 1).data;
                            if (imgData[3] > 10) {
                                pixelData[y][x] = `rgb(${imgData[0]},${imgData[1]},${imgData[2]})`;
                            } else {
                                pixelData[y][x] = null;
                            }
                        }
                    }
                    drawGrid();
                };
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        });

        // Clear
        document.getElementById('enemy-clear-btn').addEventListener('click', () => {
            for (let y = 0; y < GRID_SIZE; y++)
                for (let x = 0; x < GRID_SIZE; x++)
                    pixelData[y][x] = null;
            drawGrid();
        });

        // Save
        document.getElementById('save-enemy-btn').addEventListener('click', () => {
            // Export pixel data as a small canvas image
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = GRID_SIZE;
            exportCanvas.height = GRID_SIZE;
            const ectx = exportCanvas.getContext('2d');
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    if (pixelData[y][x]) {
                        ectx.fillStyle = pixelData[y][x];
                        ectx.fillRect(x, y, 1, 1);
                    }
                }
            }
            const dataURL = exportCanvas.toDataURL();
            stage.setEnemyImage(dataURL);
            overlay.remove();
            UiSounds.success();
        });

        // Close
        document.getElementById('close-enemy-editor').addEventListener('click', () => {
            overlay.remove();
        });

        drawGrid();
    }

    // --- BACKGROUND SYSTEM ---
    const bgBtn = document.getElementById('bg-change-btn');
    const bgOverlay = document.getElementById('bg-selector-overlay');
    const closeBgBtn = document.getElementById('close-bg-selector');
    const bgColorSwatches = document.querySelectorAll('[data-bg-color]');
    const bgCustomColor = document.getElementById('bg-custom-color');
    const bgThemeBtns = document.querySelectorAll('[data-bg-theme]');
    const bgFileInput = document.getElementById('bg-file-import');

    if (bgBtn && bgOverlay) {
        bgBtn.addEventListener('click', () => bgOverlay.classList.remove('hidden'));
        closeBgBtn.addEventListener('click', () => bgOverlay.classList.add('hidden'));

        // Color Swatches
        bgColorSwatches.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = e.target.dataset.bgColor;
                stage.background = { type: 'color', color: color };
                bgOverlay.classList.add('hidden');
                console.log('Fundo alterado para cor:', color);
            });
        });

        // Custom Color
        if (bgCustomColor) {
            bgCustomColor.addEventListener('change', (e) => {
                stage.background = { type: 'color', color: e.target.value };
                // Don't close immediately to allow tweaking
            });
        }

        // Themes
        bgThemeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.bgTheme;
                if (theme === 'platformer') {
                    stage.background = { type: 'platformer' };
                } else if (theme === 'space') {
                    stage.background = { type: 'color', color: '#000000' };
                    // Could add stars later
                }
                bgOverlay.classList.add('hidden');
            });
        });

        // File Import
        if (bgFileInput) {
            bgFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        stage.setBackground(event.target.result);
                        stage.background.src = event.target.result; // Save for persistence
                        bgOverlay.classList.add('hidden');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // --- HELPERS: Serialization & Rehydration ---
    function serializeProject(title) {
        // Critical Fix: Sync input values to DOM attributes so innerHTML captures them
        workspaceEl.querySelectorAll('input').forEach(input => {
            input.setAttribute('value', input.value);
        });

        // Serialize background state
        const bgState = {
            type: stage.background.type || 'color',
            color: stage.background.color || '#ffffff',
            src: stage.background.src || null
        };

        return {
            id: currentProjectID || Date.now(),
            title: title,
            author: userMgr.currentUser || "Anônimo",
            date: new Date().toLocaleDateString(),
            data: {
                workspace: workspaceEl.innerHTML,
                sprite: { ...stage.sprite, image: stage.sprite.image ? stage.sprite.image.src : null },
                background: bgState,
                obstacles: stage.obstacles,
                goals: stage.goals || [],
                enemies: stage.enemies || [],
                enemyImage: stage.enemyImage ? stage.enemyImage.src : null
            }
        };
    }

    // Bug 3 Fix: loadProject function for Edit button
    function loadProject(project) {
        loadProjectData(project);
        // Move canvas back to editor if needed
        if (editorStageMount && stageCanvas && stageCanvas.parentNode !== editorStageMount) {
            editorStageMount.appendChild(stageCanvas);
        }
        switchView('editor');
        initPalette('motion');
    }

    function restoreWorkspaceListeners() {
        const blocks = workspaceEl.querySelectorAll('.workspace-block');
        blocks.forEach(block => {
            block.addEventListener('mousedown', startWorkspaceDrag);
        });
    }

    // --- PLAYER MODE LOGIC ---
    const playerStageMount = document.getElementById('player-stage-mount');
    const editorStageMount = document.querySelector('.canvas-wrapper');
    const stageCanvas = document.getElementById('stage-canvas');

    function playProject(project) {
        // 1. Load data (silently fills workspace for interpreter)
        loadProjectData(project);

        // 2. Move Canvas to Player View
        if (playerStageMount && stageCanvas) {
            playerStageMount.appendChild(stageCanvas);
        }

        // 3. Update Title
        document.getElementById('player-project-title').textContent = project.title;

        // 4. Switch View
        switchView('player');
        UiSounds.start();

        // 5. Auto-run the game after a short delay for DOM to settle
        setTimeout(() => {
            interpreter.run();
        }, 200);
    }

    // New helper to just load data without switching to editor
    function loadProjectData(project) {
        currentProjectID = project.id;

        // Restore Workspace
        workspaceEl.innerHTML = project.data.workspace;
        restoreWorkspaceListeners(); // Helper defined below

        // Restore Sprite
        const s = project.data.sprite;
        if (s) {
            // Separe image data from other properties to avoid overwriting the Image object with a string
            const { image, ...spriteProps } = s;
            stage.sprite = { ...stage.sprite, ...spriteProps };

            // Re-initialize the image object if it exists
            if (image) {
                stage.setSpriteImage(image);
            } else {
                stage.sprite.image = null; // Revert to default if no image
            }
        }

        // Restore Background
        const bg = project.data.background;
        if (bg) {
            if (bg.type === 'image' && bg.src) {
                stage.setBackground(bg.src);
            } else if (bg.type === 'platformer') {
                stage.background = { type: 'platformer' };
            } else {
                stage.background = { type: 'color', color: bg.color || '#ffffff' };
            }
        }

        // Restore Obstacles (Level)
        if (project.data.obstacles) {
            stage.setObstacles(project.data.obstacles);
        } else {
            stage.setObstacles([]);
        }

        // Restore Goals
        if (project.data.goals) {
            stage.setGoals(project.data.goals);
        } else {
            stage.setGoals([]);
        }

        // Restore Enemies
        if (project.data.enemies) {
            stage.setEnemies(project.data.enemies);
        } else {
            stage.setEnemies([]);
        }

        // Restore Enemy Image
        if (project.data.enemyImage) {
            stage.setEnemyImage(project.data.enemyImage);
        } else {
            stage.setEnemyImage(null);
        }
    }

    // Player Controls
    document.getElementById('player-run-btn').addEventListener('click', () => {
        UiSounds.start();
        interpreter.run();
    });
    document.getElementById('player-stop-btn').addEventListener('click', () => interpreter.stop());

    document.getElementById('player-back-btn').addEventListener('click', () => {
        interpreter.stop();
        // Move Canvas back to Editor
        if (editorStageMount && stageCanvas) {
            editorStageMount.appendChild(stageCanvas);
        }
        switchView('dashboard');
        renderDashboard('community'); // Default return
    });


    // Fullscreen
    function toggleFullscreen(element) {
        if (!document.fullscreenElement) {
            (element || document.documentElement).requestFullscreen().catch(err => {
                console.warn('Fullscreen not available:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    const playerFullscreenBtn = document.getElementById('player-fullscreen-btn');
    if (playerFullscreenBtn) {
        playerFullscreenBtn.addEventListener('click', () => {
            const wrapper = document.querySelector('#view-player .stage-wrapper-large') ||
                document.querySelector('.stage-wrapper-large');
            toggleFullscreen(wrapper);
        });
    }

    // Bug 8 Fix: Console clear button
    const clearConsoleBtn = document.getElementById('clear-console');
    if (clearConsoleBtn) {
        clearConsoleBtn.addEventListener('click', () => {
            const consoleEl = document.getElementById('console-output');
            if (consoleEl) {
                consoleEl.innerHTML = '<div class="log-line system">Console limpo.</div>';
            }
        });
    }

    // --- BUTTON EVENT LISTENERS (Save, Publish, Back) ---

    // Back Button (Editor)
    const backBtn = document.getElementById('editor-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Ensure canvas is in editor (sanity check)
            if (editorStageMount && stageCanvas && stageCanvas.parentNode !== editorStageMount) {
                editorStageMount.appendChild(stageCanvas);
            }
            switchView('dashboard');
            renderDashboard('my-projects');
        });
    }

    // Save Button
    const saveBtn = document.getElementById('save-project-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Default Title logic: existing title if editing, or generic
            // We need to store title in state to pre-fill prompt properly? 
            // For now, prompt blank or generic is fine.
            const title = prompt("Nome do Projeto:", "Meu Jogo Incrível");
            if (!title) return;

            const project = serializeProject(title);
            currentProjectID = project.id;

            if (projectMgr.saveLocal(project)) {
                UiSounds.success();

                // Redirect to Dashboard -> My Projects
                switchView('dashboard');

                // Activate "My Projects" tab visually
                tabs.forEach(t => t.classList.remove('active'));
                const myProjTab = document.querySelector('[data-tab="my-projects"]');
                if (myProjTab) myProjTab.classList.add('active');

                renderDashboard('my-projects');
            }
        });
    }

    // Publish Button
    const publishBtn = document.getElementById('publish-btn');
    if (publishBtn) {
        publishBtn.addEventListener('click', () => {
            const title = prompt("Título para a Comunidade:") || "Jogo Sem Nome";
            const newProject = serializeProject(title);
            // Always new ID for publish to avoid overwriting local draft if we wanted separation, 
            // but here we just publish the snapshot.

            if (projectMgr.publish(newProject)) {
                UiSounds.success();
                alert(`Jogo "${title}" publicado na Comunidade! 🌍`);

                switchView('dashboard');
                // Force refresh community tab
                const commTab = document.querySelector('[data-tab="community"]');
                if (commTab) {
                    commTab.click(); // This triggers the renderDashboard
                }
            }
        });
    }



    // Save Sprite
    if (saveSpriteBtn) {
        saveSpriteBtn.addEventListener('click', () => {
            // Create canvas to export image
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 16;
            tempCanvas.height = 16;
            const ctx = tempCanvas.getContext('2d');

            const cells = document.querySelectorAll('.pixel-cell');
            // Ensure we have exactly 256 cells or handle mismatch
            if (cells.length !== 256) {
                console.warn("Grid size mismatch!", cells.length);
            }

            for (let i = 0; i < 256; i++) {
                const cell = cells[i]; // Access by index 0-255
                if (!cell) continue;

                const x = i % 16;
                const y = Math.floor(i / 16);
                const color = cell.style.backgroundColor;

                if (color && color !== 'transparent' && color !== '') {
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            const dataURL = tempCanvas.toDataURL();
            stage.setSpriteImage(dataURL);

            editorOverlay.classList.add('hidden');
            console.log('Personagem salvo!');
            UiSounds.snap(); // Reuse snap sound for save feeling
        });
    }

    // ===== TUTORIAL MASCOT =====
    const tutorialMascot = document.getElementById('tutorial-mascot');
    const mascotText = document.getElementById('mascot-text');
    const mascotStep = document.getElementById('mascot-step');
    const mascotNext = document.getElementById('mascot-next');
    const mascotSkip = document.getElementById('mascot-skip');

    const TUTORIAL_STEPS = [
        { key: 'tut_step_1', highlight: null, view: 'landing' },
        { key: 'tut_step_2', highlight: '.tab-buttons', view: 'dashboard' },
        { key: 'tut_step_3', highlight: '.palette-panel', view: 'editor' },
        { key: 'tut_step_4', highlight: '.category-tabs', view: 'editor' },
        { key: 'tut_step_5', highlight: '.workspace-panel', view: 'editor' },
        { key: 'tut_step_6', highlight: '.canvas-wrapper', view: 'editor' },
        { key: 'tut_step_7', highlight: '.controls', view: 'editor' },
        { key: 'tut_step_8', highlight: '#save-project-btn', view: 'editor' },
        { key: 'tut_step_9', highlight: '#edit-sprite-btn', view: 'editor' },
        { key: 'tut_step_10', highlight: '#bg-change-btn', view: 'editor' },
        { key: 'tut_step_11', highlight: '#edit-level-btn', view: 'editor' },
        { key: 'tut_step_12', highlight: '.console-panel', view: 'editor' },
        { key: 'tut_step_13', highlight: null, view: null }
    ];

    let tutorialCurrentStep = 0;
    let previousHighlight = null;

    function showTutorialStep(index) {
        if (index >= TUTORIAL_STEPS.length) {
            endTutorial();
            return;
        }

        tutorialCurrentStep = index;
        const step = TUTORIAL_STEPS[index];
        const t = TRANSLATIONS[currentLang];

        // Remove previous highlight
        if (previousHighlight) {
            previousHighlight.classList.remove('tutorial-highlight');
            previousHighlight = null;
        }

        // Update text from translation keys
        mascotText.innerHTML = t[step.key] || "Translation missing";
        mascotStep.textContent = `${index + 1} / ${TUTORIAL_STEPS.length}`;

        // Update button text on last step
        if (index === TUTORIAL_STEPS.length - 1) {
            mascotNext.textContent = t.mascot_start;
        } else {
            mascotNext.textContent = t.mascot_next;
        }

        // Highlight target element
        if (step.highlight) {
            const el = document.querySelector(step.highlight);
            if (el) {
                el.classList.add('tutorial-highlight');
                previousHighlight = el;
                // Scroll element into view
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // Re-animate bubble
        const bubble = document.getElementById('mascot-bubble');
        bubble.style.animation = 'none';
        bubble.offsetHeight; // Force reflow
        bubble.style.animation = 'bubbleFadeIn 0.4s ease-out';
    }

    function endTutorial() {
        tutorialMascot.classList.add('hidden');
        if (previousHighlight) {
            previousHighlight.classList.remove('tutorial-highlight');
            previousHighlight = null;
        }
        localStorage.setItem('infinity_tutorial_done', 'true');
    }

    function startTutorial() {
        tutorialCurrentStep = 0;
        tutorialMascot.classList.remove('hidden');
        showTutorialStep(0);
    }

    // Button handlers
    if (mascotNext) {
        mascotNext.addEventListener('click', () => {
            showTutorialStep(tutorialCurrentStep + 1);
        });
    }

    if (mascotSkip) {
        mascotSkip.addEventListener('click', () => {
            if (confirm('Tens a certeza que queres saltar o tutorial? 🤔')) {
                endTutorial();
            }
        });
    }

    // Start tutorial on first visit
    if (!localStorage.getItem('infinity_tutorial_done')) {
        // Small delay so the page renders first
        setTimeout(() => startTutorial(), 800);
    }

    // Restart tutorial button (🤖 in dashboard header)
    const tutorialRestartBtn = document.getElementById('tutorial-restart-btn');
    if (tutorialRestartBtn) {
        tutorialRestartBtn.addEventListener('click', () => {
            localStorage.removeItem('infinity_tutorial_done');
            startTutorial();
        });
    }

    // Apply saved language on load (moved to end to avoid TDZ errors)
    applyLanguage(currentLang);
});
