function isTriangle(a, b, c) {
    let longestSide = Math.max(a, b, c)
    let perimeter = a + b + c
    if ((perimeter - longestSide) > longestSide) {
        return true
    } else {
        return false
    }
}
