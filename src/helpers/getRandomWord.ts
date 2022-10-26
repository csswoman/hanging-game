let words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'JAVASCRIPT',
    'MARCIANO',
    'VETERINARIO',
    'ABEJA',
    'JARDINERO',
    'XILOFONO',
    'ZAPATO',
    'FRAMBUESA',
    'VENEZUELA'
]

export function getRandomWord () {
    const randomIndex = Math.floor( Math.random() * words. length );

    return words[randomIndex];
}