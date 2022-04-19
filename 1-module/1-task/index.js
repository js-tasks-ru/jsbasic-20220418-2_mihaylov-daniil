function factorial(n) {
    let res = 1;
    for (let i = 0; i <= n; i++) {
        if (i === 0) {
            i = 1;
        }
        res = res * i;
        console.log(res);
    }
    return res;
}