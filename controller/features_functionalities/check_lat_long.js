function haversine(lat1, lon1, lat2, lon2) {

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

module.exports.checkAreaChange = (lat1, lon1, lat2, lon2, thresholdKm = 1.0) => {
    /**
     * Check if two sets of latitude and longitude coordinates 
     * represent the same area based on a threshold distance
     */
    const distance = haversine(lat1, lon1, lat2, lon2);
    if (distance <= thresholdKm) {
        return 0; // Same area
    } else {
        return 1; // Area changed
    }
}

