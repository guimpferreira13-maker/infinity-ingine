/**
 * app.js
 * Main application entry point. Handles Drag & Drop and UI wiring.
 */

document.addEventListener('DOMContentLoaded', async () => {

    // ===== INTERNATIONALIZATION (i18n) =====
    const TRANSLATIONS = {
        pt: {
            hero_title: 'CRIE. JOGUE. <span class="gradient-text" data-i18n="hero_highlight">BRILHE.</span>',
            hero_highlight: 'BRILHE.',
            hero_subtitle: 'A plataforma de criaÃ§Ã£o de jogos mais avanÃ§ada da web.',
            auth_title: 'Entrar na Plataforma',
            ph_username: 'Seu Nome de UsuÃ¡rio',
            ph_password: 'Sua Senha Secreta',
            login_btn: 'ðŸš€ ComeÃ§ar Aventura',
            auth_footer: 'Crie uma conta ou entre na sua!',
            choose_style: 'Escolha seu estilo de jogo',
            start_journey: 'Comece sua jornada criando algo incrÃ­vel',
            rpg_title: 'RPG 2D',
            rpg_desc: 'Crie aventuras top-down com mapas e missÃµes.',
            platform_title: 'Plataforma',
            platform_desc: 'Corra e pule em fases estilo Mario.',
            blank_title: 'Projeto Vazio',
            blank_desc: 'Comece do zero com sua imaginaÃ§Ã£o.',
            my_projects: 'Meus Projetos',
            community: 'Comunidade',
            new_game: 'Novo Jogo',
            save_btn: 'ðŸ’¾ Salvar',
            publish_btn: 'ðŸŒ Publicar',
            run_btn: 'â–¶ Executar',
            stop_btn: 'â¹ Parar',
            reset_btn: 'â® Reset',
            blocks: 'Blocos',
            cat_motion: 'Movimento',
            cat_looks: 'AparÃªncia',
            cat_sound: 'Som',
            cat_control: 'Controle',
            cat_logic: 'LÃ³gica',
            cat_variables: 'VariÃ¡veis',
            cat_events: 'Eventos',
            code_area: 'Ãrea de CÃ³digo',
            clear: 'Limpar',
            drag_hint: 'Arraste blocos para cÃ¡ para comeÃ§ar',
            stage: 'Palco',
            character_btn: 'ðŸŽ¨ Personagem',
            bg_btn: 'ðŸ–¼ï¸ Fundo',
            level_btn: 'ðŸ§± NÃ­vel',
            direction: 'DireÃ§Ã£o',
            // Console
            console_title: 'Console',
            clear_console: 'Limpar Console',
            console_ready: 'Pronto para executar.',
            // Sprite Editor
            sprite_editor_title: 'Editor de Personagem',
            import_image: 'ðŸ“‚ Importar Imagem',
            save: 'Salvar',
            eraser: 'Borracha',
            // Level Editor
            level_editor_title: 'Editor de NÃ­vel',
            level_hint: 'Clique na grade para adicionar/remover paredes.',
            clear_all: 'Limpar Tudo',
            save_level: 'Salvar NÃ­vel',
            brush_label: 'Pincel:',
            brush_obstacle: 'ðŸ§± ObstÃ¡culo',
            brush_goal: 'ðŸ Meta',
            brush_enemy: 'ðŸ‘¾ Inimigo',
            edit_enemy: 'ðŸŽ¨ Editar Inimigo',
            // Enemy Editor
            enemy_editor_title: 'Editor de Inimigo ðŸ‘¾',
            enemy_import: 'ðŸ“‚ Importar Imagem',
            enemy_clear: 'ðŸ—‘ï¸ Limpar',
            enemy_save: 'Salvar',
            // Background
            change_bg: 'Alterar Fundo',
            solid_colors: 'Cores SÃ³lidas',
            themes: 'Temas',
            theme_platform: 'ðŸžï¸ Plataforma',
            theme_space: 'âœ¨ EspaÃ§o',
            upload: 'Upload',
            load_image: 'ðŸ“‚ Carregar Imagem',
            // Community & Dashboard
            no_community_games: 'Nenhum jogo publicado ainda. Seja o primeiro!',
            no_my_games: 'VocÃª ainda nÃ£o tem jogos salvos ðŸ•µï¸â€â™‚ï¸',
            create_first_game: 'Crie um Novo Jogo para comeÃ§ar!',
            nothing_here: 'Nada por aqui... ainda!',
            error_loading: 'Aparentemente nÃ£o hÃ¡ jogos para exibir ou ocorreu um erro ao carregÃ¡-los.',
            use_new_card: 'Use o cartÃ£o <b>+ Novo Jogo</b> para criar o seu!',
            be_first_publish: 'Seja o primeiro a publicar um jogo na comunidade!',
            laptop_warning: 'ðŸ’» Os jogos da comunidade apenas podem ser testados/jogados no computador.',
            note_label: 'NOTA',
            by_author: 'Por:',
            anon_author: 'AnÃ´nimo',
            no_title: 'Sem TÃ­tulo',
            // Alerts
            err_user_not_found: "âŒ UsuÃ¡rio nÃ£o encontrado.",
            err_wrong_pass: "ðŸ”’ Senha incorreta!",
            err_fill_auth: "âš ï¸ Preencha nome e senha!",
            err_save: "âŒ Erro ao salvar: Armazenamento cheio ou bloqueado!",
            err_storage_full: "âŒ Erro: EspaÃ§o de armazenamento cheio! NÃ£o foi possÃ­vel publicar.\nTente excluir alguns projetos antigos.",
            demo_created: "ðŸŽ® Demo 'Mario Control' criado com sucesso!\nUse as Setas e EspaÃ§o para jogar.",
            // Level Tooltips
            clear_console_tooltip: 'Limpar Console',
            trash_blocks: 'Solte aqui para apagar',
            // Mascot & Tutorial
            tutorial_label: 'Tutorial',
            mascot_skip: 'Pular',
            mascot_next: 'PrÃ³ximo âžœ',
            mascot_start: 'ComeÃ§ar! ðŸš€',
            tut_step_1: '<span class="emoji-big">ðŸ‘‹</span>OlÃ¡! Eu sou o <strong>Bit</strong>. Vamos aprender a criar o teu primeiro jogo em 1 minuto?',
            tut_step_2: 'Clica aqui no robÃ´ ðŸ¤– para comeÃ§ares a tua aventura de criador!',
            tut_step_3: '<span class="emoji-big">ðŸ§©</span>Bem-vindo ao Editor. Aqui, estes <strong>Blocos</strong> coloridos sÃ£o as tuas "ordens" para o jogo.',
            tut_step_4: '<div class="tutorial-block-card"><div class="block-preview" style="background:#FFBF00">ðŸ</div><div class="block-info"><span class="block-name">Eventos</span><span class="block-desc">Blocos amarelos decidem QUANDO algo acontece.</span></div></div>Nada comeÃ§a sem um gatilho!',
            tut_step_5: 'Primeiro desafio: Clica na aba amarela e procura o bloco <strong>"Quando tecla seta direita pressionada"</strong>.',
            tut_step_6: '<div class="tutorial-block-card"><div class="block-preview" style="background:#4C97FF">ðŸ‘Ÿ</div><div class="block-info"><span class="block-name">Movimento</span><span class="block-desc">Blocos azuis servem para dar vida e movimento!</span></div></div>Vamos fazer o herÃ³i andar.',
            tut_step_7: 'Segundo desafio: Clica na aba azul e arrasta o bloco <strong>"Mover 10 passos"</strong> para o lado.',
            tut_step_8: 'Agora encaixa os dois! Acabaste de programar: <em>"Quando eu carregar na tecla -> O herÃ³i move-se"</em>. IncrÃ­vel!',
            tut_step_9: 'ðŸŽ¬ Este Ã© o <strong>Palco</strong>. Ã‰ aqui que vÃªs o teu herÃ³i e o teu mundo ganhar vida.',
            tut_step_10: 'Hora do teste! Clica em <strong>â–¶ Executar</strong> para ligar o motor e depois pressiona a tecla que escolheste. EstÃ¡ vivo!',
            tut_step_11: 'ðŸŽ¨ Queres mudar o herÃ³i, o fundo ou desenhar obstÃ¡culos? Usa estes botÃµes mÃ¡gicos.',
            tut_step_12: 'ðŸ’¾ NÃ£o te esqueÃ§as de <strong>Guardar</strong> ou <strong>Publicar</strong> para outros jogarem o teu nÃ­vel!',
            tut_step_13: '<span class="emoji-big">ðŸš€</span>ParabÃ©ns! JÃ¡ Ã©s um programador. Agora o limite Ã© a tua imaginaÃ§Ã£o. Diverte-te!'
        },
        en: {
            hero_title: 'CREATE. PLAY. <span class="gradient-text" data-i18n="hero_highlight">SHINE.</span>',
            hero_highlight: 'SHINE.',
            hero_subtitle: 'The most advanced web game creation platform.',
            auth_title: 'Sign In',
            ph_username: 'Your Username',
            ph_password: 'Your Secret Password',
            login_btn: 'ðŸš€ Start Adventure',
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
            save_btn: 'ðŸ’¾ Save',
            publish_btn: 'ðŸŒ Publish',
            run_btn: 'â–¶ Run',
            stop_btn: 'â¹ Stop',
            reset_btn: 'â® Reset',
            blocks: 'Blocks',
            cat_motion: 'Motion',
            cat_looks: 'Looks',
            cat_sound: 'Sound',
            cat_control: 'Control',
            cat_logic: 'Logic',
            cat_variables: 'Variables',
            cat_events: 'Events',
            code_area: 'Code Area',
            clear: 'Clear',
            drag_hint: 'Drag blocks here to start',
            stage: 'Stage',
            character_btn: 'ðŸŽ¨ Character',
            bg_btn: 'ðŸ–¼ï¸ Background',
            level_btn: 'ðŸ§± Level',
            direction: 'Direction',
            // Console
            console_title: 'Console',
            clear_console: 'Clear Console',
            console_ready: 'Ready to run.',
            // Sprite Editor
            sprite_editor_title: 'Character Editor',
            import_image: 'ðŸ“‚ Import Image',
            save: 'Save',
            eraser: 'Eraser',
            // Level Editor
            level_editor_title: 'Level Editor',
            level_hint: 'Click on the grid to add/remove walls.',
            clear_all: 'Clear All',
            save_level: 'Save Level',
            brush_label: 'Brush:',
            brush_obstacle: 'ðŸ§± Obstacle',
            brush_goal: 'ðŸ Goal',
            brush_enemy: 'ðŸ‘¾ Enemy',
            edit_enemy: 'ðŸŽ¨ Edit Enemy',
            // Enemy Editor
            enemy_editor_title: 'Enemy Editor ðŸ‘¾',
            enemy_import: 'ðŸ“‚ Import Image',
            enemy_clear: 'ðŸ—‘ï¸ Clear',
            enemy_save: 'Save',
            // Background
            change_bg: 'Change Background',
            solid_colors: 'Solid Colors',
            themes: 'Themes',
            theme_platform: 'ðŸžï¸ Platformer',
            theme_space: 'âœ¨ Space',
            upload: 'Upload',
            load_image: 'ðŸ“‚ Load Image',
            // Community & Dashboard
            no_community_games: 'No published games yet. Be the first!',
            no_my_games: 'You have no saved games yet ðŸ•µï¸â€â™‚ï¸',
            create_first_game: 'Create a New Game to start!',
            nothing_here: 'Nothing here... yet!',
            error_loading: 'Apparently there are no games to display or an error occurred while loading them.',
            use_new_card: 'Use the <b>+ New Game</b> card to create yours!',
            be_first_publish: 'Be the first to publish a game to the community!',
            laptop_warning: 'ðŸ’» Community games can only be tested/played on a computer.',
            note_label: 'NOTE',
            by_author: 'By:',
            anon_author: 'Anonymous',
            no_title: 'Untitled',
            // Alerts
            err_user_not_found: "âŒ User not found.",
            err_wrong_pass: "ðŸ”’ Incorrect password!",
            err_fill_auth: "âš ï¸ Fill in name and password!",
            err_save: "âŒ Error saving: Storage full or blocked!",
            err_storage_full: "âŒ Error: Storage space full! Could not publish.\nTry deleting some old projects.",
            demo_created: "ðŸŽ® 'Mario Control' demo created successfully!\nUse Arrows and Space to play.",
            // Level Tooltips
            clear_console_tooltip: 'Clear Console',
            trash_blocks: 'Drop here to delete',
            // Mascot & Tutorial
            tutorial_label: 'Tutorial',
            mascot_skip: 'Skip',
            mascot_next: 'Next âžœ',
            mascot_start: 'Start! ðŸš€',
            tut_step_1: '<span class="emoji-big">ðŸ‘‹</span>Hi! I\'m <strong>Bit</strong>. Let\'s learn how to create your first game in 1 minute?',
            tut_step_2: 'Click here on the robot ðŸ¤– to start your creator adventure!',
            tut_step_3: '<span class="emoji-big">ðŸ§©</span>Welcome to the Editor. Here, these colorido <strong>Blocks</strong> are your "orders" for the game.',
            tut_step_4: '<div class="tutorial-block-card"><div class="block-preview" style="background:#FFBF00">ðŸ</div><div class="block-info"><span class="block-name">Events</span><span class="block-desc">Yellow blocks decide WHEN something happens.</span></div></div>Nothing starts without a trigger!',
            tut_step_5: 'First challenge: Click on the yellow tab and look for the <strong>"When right arrow key pressed"</strong> block.',
            tut_step_6: '<div class="tutorial-block-card"><div class="block-preview" style="background:#4C97FF">ðŸ‘Ÿ</div><div class="block-info"><span class="block-name">Motion</span><span class="block-desc">Blue blocks are for life and movement!</span></div></div>Let\'s make the hero walk.',
            tut_step_7: 'Second challenge: Click on the blue tab and drag the <strong>"Move 10 steps"</strong> block to the side.',
            tut_step_8: 'Now snap them together! You just programmed: <em>"When I press the key -> The hero moves"</em>. Amazing!',
            tut_step_9: 'ðŸŽ¬ This is the <strong>Stage</strong>. This is where you see your hero and your world come to life.',
            tut_step_10: 'Test time! Click <strong>â–¶ Run</strong> to start the engine, then press the key you chose. It\'s alive!',
            tut_step_11: 'ðŸŽ¨ Want to change the hero, the background or draw obstacles? Use these magic buttons.',
            tut_step_12: 'ðŸ’¾ Don\'t forget to <strong>Save</strong> or <strong>Publish</strong> for others to play your level!',
            tut_step_13: '<span class="emoji-big">ðŸš€</span>Congratulations! You\'re officially a programmer. Now your imagination is the limit. Have fun!'
        },
        es: {
            hero_title: 'CREA. JUEGA. <span class="gradient-text" data-i18n="hero_highlight">BRILLA.</span>',
            hero_highlight: 'BRILLA.',
            hero_subtitle: 'La plataforma de creaciÃ³n de juegos mÃ¡s avanzada de la web.',
            auth_title: 'Iniciar SesiÃ³n',
            ph_username: 'Tu Nombre de Usuario',
            ph_password: 'Tu ContraseÃ±a Secreta',
            login_btn: 'ðŸš€ Comenzar Aventura',
            auth_footer: 'Â¡Crea una cuenta o inicia sesiÃ³n!',
            choose_style: 'Elige tu estilo de juego',
            start_journey: 'Comienza tu aventura creando algo increÃ­ble',
            rpg_title: 'RPG 2D',
            rpg_desc: 'Crea aventuras top-down con mapas y misiones.',
            platform_title: 'Plataforma',
            platform_desc: 'Corre y salta en niveles estilo Mario.',
            blank_title: 'Proyecto VacÃ­o',
            blank_desc: 'Empieza desde cero con tu imaginaciÃ³n.',
            my_projects: 'Mis Proyectos',
            community: 'Comunidad',
            new_game: 'Nuevo Juego',
            save_btn: 'ðŸ’¾ Guardar',
            publish_btn: 'ðŸŒ Publicar',
            run_btn: 'â–¶ Ejecutar',
            stop_btn: 'â¹ Parar',
            reset_btn: 'â® Reset',
            blocks: 'Bloques',
            cat_motion: 'Movimiento',
            cat_looks: 'Apariencia',
            cat_sound: 'Sonido',
            cat_control: 'Control',
            cat_logic: 'LÃ³gica',
            cat_variables: 'Variables',
            cat_events: 'Eventos',
            code_area: 'Ãrea de CÃ³digo',
            clear: 'Limpar',
            drag_hint: 'Arrastra bloques aquÃ­ para empezar',
            stage: 'Escenario',
            character_btn: 'ðŸŽ¨ Personaje',
            bg_btn: 'ðŸ–¼ï¸ Fondo',
            level_btn: 'ðŸ§± Nivel',
            direction: 'DirecciÃ³n',
            // Console
            console_title: 'Consola',
            clear_console: 'Limpiar Consola',
            console_ready: 'Listo para ejecutar.',
            // Sprite Editor
            sprite_editor_title: 'Editor de Personaje',
            import_image: 'ðŸ“‚ Importar Imagen',
            save: 'Guardar',
            eraser: 'Borrador',
            // Level Editor
            level_editor_title: 'Editor de Nivel',
            level_hint: 'Haz clic en la cuadrÃ­cula para aÃ±adir/quitar paredes.',
            clear_all: 'Limpiar Todo',
            save_level: 'Guardar Nivel',
            brush_label: 'Pincel:',
            brush_obstacle: 'ðŸ§± ObstÃ¡culo',
            brush_goal: 'ðŸ Meta',
            brush_enemy: 'ðŸ‘¾ Enemigo',
            edit_enemy: 'ðŸŽ¨ Editar Enemigo',
            // Enemy Editor
            enemy_editor_title: 'Editor de Enemigo ðŸ‘¾',
            enemy_import: 'ðŸ“‚ Importar Imagen',
            enemy_clear: 'ðŸ—‘ï¸ Limpiar',
            enemy_save: 'Guardar',
            // Background
            change_bg: 'Cambiar Fondo',
            solid_colors: 'Colores SÃ³lidos',
            themes: 'Temas',
            theme_platform: 'ðŸžï¸ Plataforma',
            theme_space: 'âœ¨ Espacio',
            upload: 'Subir',
            load_image: 'ðŸ“‚ Cargar Imagen',
            // Community & Dashboard
            no_community_games: 'Â¡No hay juegos publicados aÃºn. Â¡SÃ© el primero!',
            no_my_games: 'AÃºn no tienes juegos guardados ðŸ•µï¸â€â™‚ï¸',
            create_first_game: 'Â¡Crea un Nuevo Juego para empezar!',
            nothing_here: 'Â¡Nada por aquÃ­... aÃºn!',
            error_loading: 'Al parecer no hay juegos para mostrar o ocurriÃ³ un error al cargarlos.',
            use_new_card: 'Â¡Usa la tarjeta <b>+ Nuevo Juego</b> para crear el tuyo!',
            be_first_publish: 'Â¡SÃ© el primero en publicar un juego en la comunidad!',
            laptop_warning: 'ðŸ’» Los juegos de la comunidad solo se pueden probar/jugar en la computadora.',
            note_label: 'NOTA',
            by_author: 'Por:',
            anon_author: 'AnÃ³nimo',
            no_title: 'Sin TÃ­tulo',
            // Alerts
            err_user_not_found: "âŒ Usuario no encontrado.",
            err_wrong_pass: "ðŸ”’ Â¡ContraseÃ±a incorrecta!",
            err_fill_auth: "âš ï¸ Â¡Completa nombre y contraseÃ±a!",
            err_save: "âŒ Â¡Error al guardar: Almacenamiento lleno o bloqueado!",
            err_storage_full: "âŒ Â¡Error: Espacio de almacenamiento lleno! No se pudo publicar.\nIntenta eliminar algunos proyectos antiguos.",
            demo_created: "ðŸŽ® Â¡Demo 'Mario Control' creado con Ã©xito!\nUsa las Flechas y el Espacio para jugar.",
            // Level Tooltips
            clear_console_tooltip: 'Limpiar Consola',
            trash_blocks: 'Suelta aquÃ­ para borrar',
            // Mascot & Tutorial
            tutorial_label: 'Tutorial',
            mascot_skip: 'Saltar',
            mascot_next: 'Siguiente âžœ',
            mascot_start: 'Â¡Empezar! ðŸš€',
            tut_step_1: '<span class="emoji-big">ðŸ‘‹</span>Â¡Hola! Soy <strong>Bit</strong>. Â¿Aprendemos a crear tu primer juego en 1 minuto?',
            tut_step_2: 'Â¡Haz clic aquÃ­ en el robot ðŸ¤– para comenzar tu aventura de creador!',
            tut_step_3: '<span class="emoji-big">ðŸ§©</span>Bienvenido al Editor. AquÃ­, estos <strong>Bloques</strong> coloridos son tus "Ã³rdenes" para el juego.',
            tut_step_4: '<div class="tutorial-block-card"><div class="block-preview" style="background:#FFBF00">ðŸ</div><div class="block-info"><span class="block-name">Eventos</span><span class="block-desc">Los bloques amarillos deciden CUÃNDO sucede algo.</span></div></div>Â¡Nada comienza sin un disparador!',
            tut_step_5: 'Primer desafÃ­o: Haz clic en la pestaÃ±a amarilla y busca el bloque <strong>"Cuando tecla flecha derecha presionada"</strong>.',
            tut_step_6: '<div class="tutorial-block-card"><div class="block-preview" style="background:#4C97FF">ðŸ‘Ÿ</div><div class="block-info"><span class="block-name">Movimiento</span><span class="block-desc">Â¡Los bloques azules sirven para dar vida y movimiento!</span></div></div>Vamos a hacer que el hÃ©roe camine.',
            tut_step_7: 'Segundo desafÃ­o: Haz clic en la pestaÃ±a azul e arrastra el bloque <strong>"Mover 10 pasos"</strong> al lado.',
            tut_step_8: 'Â¡Ahora encaja los dos! Acabas de programar: <em>"Cuando presiono la tecla -> El hÃ©roe se mueve"</em>. Â¡IncreÃ­ble!',
            tut_step_9: 'ðŸŽ¬ Este es el <strong>Escenario</strong>. AquÃ­ es donde ves a tu hÃ©roe y tu mundo cobrar vida.',
            tut_step_10: 'Â¡Hora de la prueba! Haz clic en <strong>â–¶ Ejecutar</strong> para encender el motor y luego pulsa la tecla que elegiste. Â¡EstÃ¡ vivo!',
            tut_step_11: 'ðŸŽ¨ Â¿Quieres cambiar el hÃ©roe, el fondo o dibujar obstÃ¡culos? Usa estos botones mÃ¡gicos.',
            tut_step_12: 'ðŸ’¾ Â¡No olvides <strong>Guardar</strong> o <strong>Publicar</strong> para que otros jueguen tu nivel!',
            tut_step_13: '<span class="emoji-big">ðŸš€</span>Â¡Felicidades! Ya eres un programador. Ahora el lÃ­mite es tu imaginaciÃ³n. Â¡DiviÃ©rtete!'
        }
    };

    // Block label translations
    const BLOCK_TRANSLATIONS = {
        pt: {
            event_flag: 'Quando ðŸ³ï¸ for clicado',
            event_key: 'Quando a tecla %s for pressionada',
            event_key_default: 'espaÃ§o',
            event_touch_goal: 'Quando tocar na meta ðŸ',
            event_death: 'Quando morrer ðŸ’€',
            motion_move: 'Mova %n passos',
            motion_move_back: 'Ande para trÃ¡s %n passos',
            motion_jump: 'Pule (Jump)',
            motion_change_x: 'Mude x por %n',
            motion_set_x: 'VÃ¡ para x: %n',
            motion_change_y: 'Mude y por %n',
            motion_set_y: 'VÃ¡ para y: %n',
            motion_turn_right: 'Gire â†» %n graus',
            motion_turn_left: 'Gire â†º %n graus',
            motion_goto_xy: 'VÃ¡ para x: %n y: %n',
            motion_glide: 'Deslize %n segs p/ x: %n y: %n',
            motion_bounce_on_edge: 'Se tocar na borda, volte',
            looks_say: 'Diga %s por %n segs',
            looks_say_default: 'OlÃ¡!',
            looks_show: 'Mostre',
            looks_hide: 'Esconda',
            looks_change_color: 'Mude cor em %n',
            looks_set_size: 'Mude tamanho para %n %',
            sound_play_beep: 'Tocar som Pop',
            control_wait: 'Espere %n segs',
            control_repeat: 'Repita %n vezes',
            control_forever: 'Sempre',
            logic_if: 'Se %s entÃ£o',
            logic_compare: '%s = %s',
            variable_set: 'Defina %s como %n',
            variable_change: 'Mude %s por %n',
            event_clicked: 'Quando este personagem for clicado'
        },
        en: {
            event_flag: 'When ðŸ³ï¸ clicked',
            event_key: 'When %s key pressed',
            event_key_default: 'space',
            event_touch_goal: 'When touching goal ðŸ',
            event_death: 'When dead ðŸ’€',
            motion_move: 'Move %n steps',
            motion_move_back: 'Move back %n steps',
            motion_jump: 'Jump',
            motion_change_x: 'Change x by %n',
            motion_set_x: 'Set x to %n',
            motion_change_y: 'Change y by %n',
            motion_set_y: 'Set y to %n',
            motion_turn_right: 'Turn â†» %n degrees',
            motion_turn_left: 'Turn â†º %n degrees',
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
            control_forever: 'Forever',
            logic_if: 'If %s then',
            logic_compare: '%s = %s',
            variable_set: 'Set %s to %n',
            variable_change: 'Change %s by %n',
            event_clicked: 'When this character clicked'
        },
        es: {
            event_flag: 'Cuando ðŸ³ï¸ sea pulsado',
            event_key: 'Cuando tecla %s sea pulsada',
            event_key_default: 'espacio',
            event_touch_goal: 'Cuando toque la meta ðŸ',
            event_death: 'Cuando muera ðŸ’€',
            motion_move: 'Mover %n pasos',
            motion_move_back: 'Retroceder %n pasos',
            motion_jump: 'Saltar',
            motion_change_x: 'Cambiar x en %n',
            motion_set_x: 'Fijar x a %n',
            motion_change_y: 'Cambiar y en %n',
            motion_set_y: 'Fijar y a %n',
            motion_turn_right: 'Girar â†» %n grados',
            motion_turn_left: 'Girar â†º %n grados',
            motion_goto_xy: 'Ir a x: %n y: %n',
            motion_glide: 'Deslizar %n segs a x: %n y: %n',
            motion_bounce_on_edge: 'Si toca el borde, rebotar',
            looks_say: 'Decir %s por %n segs',
            looks_say_default: 'Â¡Hola!',
            looks_show: 'Mostrar',
            looks_hide: 'Esconder',
            looks_change_color: 'Cambiar color en %n',
            looks_set_size: 'Fijar tamaÃ±o a %n %',
            sound_play_beep: 'Tocar sonido Pop',
            control_wait: 'Esperar %n segs',
            control_repeat: 'Repetir %n veces',
            control_forever: 'Siempre',
            logic_if: 'Si %s entonces',
            logic_compare: '%s = %s',
            variable_set: 'Fijar %s a %n',
            variable_change: 'Cambiar %s por %n',
            event_clicked: 'Al hacer clic en este objeto'
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

    // Handle Sprite Clicks (event_clicked)
    const stageCanvas = document.getElementById('stage-canvas');
    if (stageCanvas) {
        stageCanvas.addEventListener('click', (e) => {
            if (!interpreter.isRunning) return;

            const rect = stageCanvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Convert screen click to Cartesian world (relative to camera)
            // worldToScreen: screen.x = W/2 + (wx - cam.x)
            // wx = screen.x - W/2 + cam.x
            const worldX = (clickX - stageCanvas.width / 2) + stage.camera.x;
            const worldY = (stageCanvas.height / 2 - clickY) + stage.camera.y;

            // Simple Distance check for "click" on sprite center (radius based)
            const dist = Math.sqrt(Math.pow(worldX - stage.sprite.x, 2) + Math.pow(worldY - stage.sprite.y, 2));
            const spriteRadius = (stage.sprite.size / 100) * 32; // Sprite is ~64px base

            if (dist < spriteRadius) {
                const clickedBlocks = Array.from(workspaceEl.querySelectorAll('.workspace-block'))
                    .filter(el => el.dataset.type === 'event_clicked');
                clickedBlocks.forEach(root => interpreter.executeStack(root));
            }
        });
    }

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
            const adminUser = this.users.find(u => u.username.toLowerCase() === 'admin');
            if (adminUser) {
                adminUser.username = 'admin'; // Normalize case to lowercase
                adminUser.password = 'admin123'; // Always reset admin password
            } else {
                this.users.push({ username: 'admin', password: 'admin123' });
            }
            this.save();

            this.currentUser = localStorage.getItem('infinity_current_user');
            if (this.currentUser) this.currentUser = this.currentUser.toLowerCase();
        }

        register(username, password) {
            const normalized = username.trim().toLowerCase();
            if (this.users.find(u => u.username.toLowerCase() === normalized)) {
                return { success: false, message: "âš ï¸ Este nome jÃ¡ estÃ¡ em uso!" };
            }

            const newUser = { username: normalized, password };
            this.users.push(newUser);
            this.save();
            this.login(normalized, password);
            return { success: true };
        }

        login(username, password) {
            const normalized = username.trim().toLowerCase();
            const user = this.users.find(u => u.username.toLowerCase() === normalized);
            const t = TRANSLATIONS[currentLang];

            if (!user) {
                return { success: false, message: t.err_user_not_found || "âŒ UsuÃ¡rio nÃ£o encontrado." };
            }

            if (user.password !== password) {
                return { success: false, message: t.err_wrong_pass || "ðŸ”’ Senha incorreta!" };
            }

            this.currentUser = normalized;
            localStorage.setItem('infinity_current_user', normalized);
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
            // Community projects will now be fetched from Firebase
            this.communityProjects = [];

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
                alert(t.err_save || "âŒ Erro ao salvar: Armazenamento cheio ou bloqueado!");
                return false;
            }
        }

        getMyProjects() {
            if (userMgr.currentUser) {
                const normalizedUser = userMgr.currentUser.toLowerCase();
                return this.myProjects.filter(p => p && p.author && p.author.toLowerCase() === normalizedUser);
            }
            return [];
        }

        async publish(project) {
            try {
                if (!window.FB_DB) {
                    throw new Error("ConexÃ£o com Firebase nÃ£o inicializada.");
                }

                const { ref, push, set } = window.FB_OPS;
                const communityRef = ref(window.FB_DB, 'community_projects');
                const newProjectRef = push(communityRef);

                // Add timestamp for sorting
                project.publishedAt = Date.now();

                await set(newProjectRef, project);
                console.log("Projeto publicado no Firebase com ID:", newProjectRef.key);
                return true;
            } catch (e) {
                const t = TRANSLATIONS[currentLang];
                console.error("Firebase Publish Error:", e);
                alert("Erro ao publicar: " + e.message);
                return false;
            }
        }

        delete(projectId, isCommunity = false) {
            if (isCommunity) {
                console.warn("Community deletion not implemented for Firebase yet.");
            } else {
                this.myProjects = this.myProjects.filter(p => p.id !== projectId);
                localStorage.setItem('infinity_my_projects', JSON.stringify(this.myProjects));
            }
        }

        async getCommunityProjects() {
            try {
                if (!window.FB_DB) return [];

                const { ref, get, child } = window.FB_OPS;
                const dbRef = ref(window.FB_DB);
                const snapshot = await get(child(dbRef, 'community_projects'));

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return Object.values(data).sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
                }
                return [];
            } catch (e) {
                console.error("Firebase Fetch Error:", e);
                return [];
            }
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

            const msg = `ðŸ› ï¸ DIAGNÃ“STICO:\n` +
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
        demoWorkspace += b('event_key', 'events', 'Quando a tecla %s for pressionada', { key: 'espaÃ§o' });
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
        alert(t.demo_created || "ðŸŽ® Demo 'Mario Control' criado com sucesso!\nUse as Setas e EspaÃ§o para jogar.");

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
        await renderDashboard('my-projects');
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

    loginBtn.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        const password = passwordInput ? passwordInput.value.trim() : "";
        const t = TRANSLATIONS[currentLang];

        if (!username || !password) {
            if (authMessage) {
                authMessage.textContent = t.err_fill_auth || "âš ï¸ Preencha nome e senha!";
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
                await renderDashboard('my-projects');
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
        tab.addEventListener('click', async () => {
            console.log("Tab clicked:", tab.dataset.tab);
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            try {
                await renderDashboard(tab.dataset.tab);
            } catch (e) {
                alert("Erro ao trocar de aba: " + e.message);
                console.error(e);
            }
        });
    });

    async function renderDashboard(tabName) {
        console.log("Rendering Dashboard:", tabName);

        if (!projectsGrid) {
            console.error("Erro Interno: Elemento '.projects-grid' nÃ£o foi encontrado no HTML!");
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

                // Add premium laptop warning
                const t = TRANSLATIONS[currentLang];
                const warning = document.createElement('div');
                warning.className = 'community-warning-premium';
                warning.innerHTML = `
                    <div class="warning-badge" data-i18n="note_label">${t.note_label}</div>
                    <div class="warning-icon">ðŸ’»</div>
                    <div class="warning-text" data-i18n="laptop_warning">${t.laptop_warning}</div>
                `;
                projectsGrid.appendChild(warning);

                let commProjects = await projectMgr.getCommunityProjects();

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
                        <div style="font-size: 3rem;">ðŸ•µï¸</div>
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
            alert("âŒ Erro ao carregar dashboard: " + e.message);
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
            <div class="card-icon">ðŸŽ®</div>
            <h3>${data.title || t.no_title}</h3>
            <p>${t.by_author} ${data.author || t.anon_author} ${data.author === 'admin' ? 'ðŸ›¡ï¸' : ''}</p>
            <div class="card-footer">
                <button class="card-btn play-btn">â–¶</button>
                ${canDelete ? '<button class="card-btn delete-btn">ðŸ—‘ï¸</button>' : ''}
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
                    alert("Erro interno: FunÃ§Ã£o de jogar nÃ£o encontrada.");
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
                delBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const msg = isOwner ? `Excluir "${data.title}"?` : `[ADMIN] Excluir jogo de ${data.author}?`;
                    if (confirm(msg)) {
                        projectMgr.delete(data.id, isCommunity);
                        UiSounds.trash();
                        await renderDashboard(isCommunity ? 'community' : 'my-projects');
                    }
                });
            }
        }

        return div;
    }

    // --- Editor Controls (Save/Publish) ---
    const publishBtn = document.getElementById('publish-btn');
    if (publishBtn) {
        publishBtn.addEventListener('click', async () => {
            const t = TRANSLATIONS[currentLang];
            if (!userMgr.isLoggedIn()) {
                alert("Para publicar, precisas de entrar!");
                return;
            }

            const project = {
                id: currentProjectID || Date.now().toString(),
                title: document.getElementById('project-title-input')?.value || t.no_title,
                author: userMgr.currentUser,
                date: new Date().toLocaleDateString(),
                data: {
                    workspace: workspaceEl.innerHTML,
                    sprite: stage.sprite,
                    background: stage.background,
                    levelGrid: stage.levelGrid
                }
            };

            const success = await projectMgr.publish(project);
            if (success) {
                alert("ðŸš€ " + (t.published_msg || "Projeto publicado com sucesso na Comunidade!"));
                UiSounds.success();
            }
        });
    }

    const saveProjectBtn = document.getElementById('save-project-btn');
    if (saveProjectBtn) {
        saveProjectBtn.addEventListener('click', () => {
            const t = TRANSLATIONS[currentLang];
            if (!userMgr.isLoggedIn()) {
                alert("Para guardar, precisas de entrar!");
                return;
            }

            const project = {
                id: currentProjectID || Date.now().toString(),
                title: document.getElementById('project-title-input')?.value || t.no_title,
                author: userMgr.currentUser,
                date: new Date().toLocaleDateString(),
                data: {
                    workspace: workspaceEl.innerHTML,
                    sprite: stage.sprite,
                    background: stage.background,
                    levelGrid: stage.levelGrid
                }
            };

            const success = projectMgr.saveLocal(project);
            if (success) {
                currentProjectID = project.id;
                alert("ðŸ’¾ " + (t.saved_msg || "Projeto guardado localmente!"));
                UiSounds.success();
            }
        });
    }

    btnNewProject.addEventListener('click', () => {
        if (!userMgr.isLoggedIn()) {
            const t = TRANSLATIONS[currentLang];
            alert(t.err_fill_auth || "âš ï¸ Por favor, faÃ§a login primeiro!");
            switchView('landing');
            return;
        }

        // RESET STATE for New Project
        currentProjectID = null;
        workspaceEl.innerHTML = '<div class="workspace-grid"></div><div class="start-hint">Arraste blocos para cÃ¡ para comeÃ§ar</div><div id="drag-container"></div>';
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
    document.getElementById('back-to-dash-btn').addEventListener('click', async () => {
        interpreter.stop();
        // Move canvas back to editor
        if (editorStageMount && stageCanvas && stageCanvas.parentNode !== editorStageMount) {
            editorStageMount.appendChild(stageCanvas);
        }
        switchView('dashboard');
        await renderDashboard('my-projects');
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
        workspaceEl.innerHTML = '<div class="workspace-grid"></div><div class="start-hint">Arraste blocos para cÃ¡ para comeÃ§ar</div><div id="drag-container"></div>';
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

        // Check if dropped on trash zone BEFORE hiding it
        const blockRect = draggedBlock.getBoundingClientRect();
        let droppedOnTrash = false;
        if (blockTrash && !blockTrash.classList.contains('hidden')) {
            const trashRect = blockTrash.getBoundingClientRect();
            droppedOnTrash = (
                blockRect.left < trashRect.right &&
                blockRect.right > trashRect.left &&
                blockRect.top < trashRect.bottom &&
                blockRect.bottom > trashRect.top
            );
        }

        // Now hide trash zone
        if (blockTrash) {
            blockTrash.classList.add('hidden');
            blockTrash.classList.remove('drag-over');
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

        console.log(`ðŸ”— Snap confirmed: ${movingBlock.dataset.type} -> ${targetBlock.dataset.type}`);
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
        obstacle: { bg: '#d97706', border: '#d97706', text: '#fff', label: 'ðŸ§± ObstÃ¡culo' },
        goal: { bg: '#fbbf24', border: '#fbbf24', text: '#000', label: 'ðŸ Meta' },
        enemy: { bg: '#dc2626', border: '#dc2626', text: '#fff', label: 'ðŸ‘¾ Inimigo' }
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
                    marker.textContent = 'ðŸ ';
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
            if (confirm('Limpar todo o nÃ­vel?')) {
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
                    <button id="close-enemy-editor" class="icon-btn">âœ•</button>
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
                            <div class="color-swatch eraser" data-ecolor="transparent" title="${t.eraser}">â¬œ</div>
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
            author: userMgr.currentUser || "AnÃ´nimo",
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
    // stageCanvas already declared above

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

    document.getElementById('player-back-btn').addEventListener('click', async () => {
        interpreter.stop();
        // Move Canvas back to Editor
        if (editorStageMount && stageCanvas) {
            editorStageMount.appendChild(stageCanvas);
        }
        switchView('dashboard');
        await renderDashboard('community'); // Default return
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
        backBtn.addEventListener('click', async () => {
            // Ensure canvas is in editor (sanity check)
            if (editorStageMount && stageCanvas && stageCanvas.parentNode !== editorStageMount) {
                editorStageMount.appendChild(stageCanvas);
            }
            switchView('dashboard');
            await renderDashboard('my-projects');
        });
    }

    // Save Button (Duplicate logic removed)

    // Publish Button (Removed duplicate local publish logic as it is now in Editor Controls section)



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
        { key: 'tut_step_2', highlight: '#tutorial-restart-btn', view: 'dashboard' },
        { key: 'tut_step_3', highlight: '.palette-panel', view: 'editor' },
        { key: 'tut_step_4', highlight: '.cat-btn[data-category="events"]', view: 'editor', category: 'events' },
        { key: 'tut_step_5', highlight: '.palette-content', view: 'editor', category: 'events' },
        { key: 'tut_step_6', highlight: '.cat-btn[data-category="motion"]', view: 'editor', category: 'motion' },
        { key: 'tut_step_7', highlight: '.palette-content', view: 'editor', category: 'motion' },
        { key: 'tut_step_8', highlight: '.workspace-panel', view: 'editor' },
        { key: 'tut_step_9', highlight: '.stage-panel', view: 'editor' },
        { key: 'tut_step_10', highlight: '#run-btn', view: 'editor' },
        { key: 'tut_step_11', highlight: '.asset-controls', view: 'editor' },
        { key: 'tut_step_12', highlight: '.controls', view: 'editor' },
        { key: 'tut_step_13', highlight: null, view: 'editor' }
    ];

    let tutorialCurrentStep = 0;
    let previousHighlight = null;

    async function showTutorialStep(index) {
        if (index >= TUTORIAL_STEPS.length) {
            endTutorial();
            return;
        }

        tutorialCurrentStep = index;
        const step = TUTORIAL_STEPS[index];
        const t = TRANSLATIONS[currentLang];

        // Automatic view switching
        if (step.view === 'dashboard') {
            if (views.dashboard.classList.contains('hidden')) {
                switchView('dashboard');
                await renderDashboard('my-projects');
            }
        } else if (step.view === 'editor') {
            if (views.editor.classList.contains('hidden')) {
                // Mock opening a project if none active
                if (!currentProjectID) {
                    const mockProject = {
                        id: 'tutorial-temp',
                        title: 'Projeto Tutorial',
                        data: { workspace: '', sprite: null, background: { type: 'color', color: '#ffffff' } }
                    };
                    loadProjectData(mockProject);
                }
                switchView('editor');
            }
            if (step.category) {
                initPalette(step.category);
                document.querySelectorAll('.cat-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.category === step.category);
                });
            }
        } else if (step.view === 'landing') {
            // Only switch to landing if we are NOT logged in
            if (!userMgr.isLoggedIn()) {
                switchView('landing');
            }
        }

        // Handle dimming focus
        const dim = document.querySelector('.tutorial-dim');
        if (dim) dim.classList.add('active');

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
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Re-animate bubble
        const bubble = document.getElementById('mascot-bubble');
        if (bubble) {
            bubble.style.animation = 'none';
            bubble.offsetHeight; // Force reflow
            bubble.style.animation = 'bubbleFadeIn 0.4s ease-out';
        }
    }

    function endTutorial() {
        tutorialMascot.classList.add('hidden');
        document.querySelector('.tutorial-dim')?.classList.remove('active');
        if (previousHighlight) {
            previousHighlight.classList.remove('tutorial-highlight');
            previousHighlight = null;
        }
        localStorage.setItem('infinity_tutorial_done', 'true');
    }

    function startTutorial() {
        // Ensure dim element exists
        if (!document.querySelector('.tutorial-dim')) {
            const dim = document.createElement('div');
            dim.className = 'tutorial-dim';
            document.body.appendChild(dim);
        }
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
            if (confirm('Tens a certeza que queres saltar o tutorial? ðŸ¤”')) {
                endTutorial();
            }
        });
    }

    // Start tutorial on first visit
    if (!localStorage.getItem('infinity_tutorial_done')) {
        // Small delay so the page renders first
        setTimeout(() => startTutorial(), 800);
    }

    // Restart tutorial button (ðŸ¤– in dashboard header)
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
