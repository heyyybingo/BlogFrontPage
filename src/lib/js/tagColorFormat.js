function colorFormat(str, r, g, b) {
    if (typeof (str) != "string" || typeof (r) != "number" || typeof (g) != "number" || typeof (b) != "number") {
        console.log(typeof (str), typeof (r), typeof (g), typeof (b));
        throw TypeError("colorFormat type error,str=string,r=number,g=number,b=number");
    }
    let max = 3;
    let asc = "";

    for (let i = 0; i < str.length && i < max; i++) {
        asc += str.charCodeAt(i);
        asc += str.charCodeAt(str.length - i - 1);
    }
    asc = parseInt(asc);
    let red = parseInt((asc * g) % 150) + 50;
    let green = parseInt((asc * g) % 80) + 20;
    let blue = parseInt((asc * g) % 60) + 150;
    let result = "rgb(" + red.toString() + "," + green.toString() + "," + blue.toString() + ")";
    // console.log(result);
    return result;
}


export default colorFormat