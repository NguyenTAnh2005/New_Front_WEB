export function priceFormatter(price) {
    const str_arr = price.toString().split("");
    const idx_dot = str_arr.length % 3;
    str_arr.splice(idx_dot, 0, ".");
    str_arr.splice(idx_dot + 4, 0, ".");
    const price_formatted = str_arr.join("");
    return `${price_formatted}`;
}