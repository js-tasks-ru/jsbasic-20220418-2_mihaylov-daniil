function filterRange(arr, a, b) {
    return arr
        .filter(item => {
            if (item >= a && item <= b) {
                return true;
            }
        })
}