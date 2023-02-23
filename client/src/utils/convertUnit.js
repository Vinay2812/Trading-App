export default function convertUnit(unit){
    const unitMap = {
        'Q': "Quantal",
        'M': 'Metric Ton',
        'L': "Liter"
    }
    return unitMap[unit];
}