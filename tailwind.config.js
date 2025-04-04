// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    hover: 'var(--primary-hover)',
                    light: 'var(--primary-light)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    hover: 'var(--secondary-hover)',
                    light: 'var(--secondary-light)',
                },
                accent: {
                    yellow: 'var(--accent-yellow)',
                    green: 'var(--accent-green)',
                    blue: 'var(--accent-blue)',
                },
                background: 'var(--background)', /* Nền trắng */
                foreground: 'var(--foreground)', /* Màu chữ đen */
            },
        },
    },
}
