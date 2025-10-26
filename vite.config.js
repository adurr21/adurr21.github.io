import tailwindcss from "@tailwindcss/vite"

export default {
    assetsInclude: ['**/*.glb'],
    plugins: [
        tailwindcss(),
    ],
}