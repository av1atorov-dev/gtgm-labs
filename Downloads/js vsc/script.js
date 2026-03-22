const text = "  rtyr  fghf uiy ghjg  fghf   rtyr  ";
function Words(str) {
    let count = 0;
    let i = 0;
    const len = str.length;
    while (i < len) {
        while (i < len && str[i] === ' ') {
            i++;
        }
        if (i >= len) break;
        let firstChar = str[i];
        let lastChar = str[i];
        while (i < len && str[i] !== ' ') {
            lastChar = str[i]; 
            i++;
        }
        
        if (firstChar === lastChar) {
            count++;
        }
    }
    return count;
}
console.log(Words(text)); 