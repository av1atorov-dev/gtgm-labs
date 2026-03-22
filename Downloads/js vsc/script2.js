function aprogression(arr) {
    if (arr.length < 2) return 0;
    arr.sort((a, b) => a - b);
    const diff = arr[1] - arr[0];
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] !== diff) {
            return 0; 
        }
    }
    return 1;
}


console.log(aprogression([3, 5, 1]));       
