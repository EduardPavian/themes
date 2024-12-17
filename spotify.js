(function(Scratch) {
    'use strict';

    // Register the extension
    class SpotifyExtension {
        getInfo() {
            return {
                id: 'spotify_basic', // Unique identifier
                name: 'Spotify Basic',
                blocks: [
                    {
                        opcode: 'testBlock',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Test Spotify Block',
                        func: 'testBlock'
                    }
                ]
            };
        }

        testBlock() {
            console.log("Test block executed!");
        }
    }

    Scratch.extensions.register(new SpotifyExtension());
})(Scratch);
