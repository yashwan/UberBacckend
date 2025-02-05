const haversine = (lat1, long1, lat2, long2) => {

    const R = 6371

    const rlat1 = toRadians(lat1)
    const rlat2 = toRadians(lat2)
    const rlong1 = toRadians(long1)
    const rlong2 = toRadians(long2)

    const lat = Math.abs(rlat1 - rlat2);
    const long = Math.abs(rlong1 - rlong2);

    const a = Math.sin(lat / 2) ** 2 +
    Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(long / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
}

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180)
}

module.exports = haversine