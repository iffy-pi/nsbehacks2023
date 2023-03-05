const HairTypes = [
    '1',
    '2A',
    '2B',
    '2C',
    '3A',
    '3B',
    '3C',
    '4A',
    '4B',
    '4C'
]

// NaN is the only value that is not equal to itself
const isNaN = (maybeNaN) => maybeNaN!=maybeNaN;

export {
    HairTypes,
    isNaN
}