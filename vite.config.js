import { defineConfig } from 'vite';

export default defineConfig({
    // Set base to your repository name for GitHub Pages
    // Change this to '/' if deploying to a custom domain
    base: '/',

    build: {
        // Output directory for built files
        outDir: 'dist',

        // Generate sourcemaps for debugging
        sourcemap: false,

        // Ensure assets are properly handled
        assetsDir: 'assets',

        rollupOptions: {
            output: {
                // Ensure consistent asset naming
                assetFileNames: 'assets/[name].[hash][extname]',
                chunkFileNames: 'assets/[name].[hash].js',
                entryFileNames: 'assets/[name].[hash].js'
            }
        }
    },

    // Ensure public directory is properly copied
    publicDir: 'public'
});
