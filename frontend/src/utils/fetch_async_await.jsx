// HÀM FETCH DATA TỪ JSON VÀ TRẢ VỀ DS THEO CƠ CHẾ ASYNC AWAIT
export async function fetchJsonToListObj(src_fetch) {
    try {
        const response = await fetch(src_fetch);
        !response.ok && { throw: new Error("Loading") }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Loi Fetch DL:" + error);
        return [];
    }
}
// FETCH VE NTN
// useEffect(() => {
//     async function fetchData() {
//         const response = await fetchJsonToListObj("/products.json");
// RESPONSE LÀ ĐANG TRẢ VỀ 1 MẢNG DATA Á
// HÀM SET BÊN DƯỚI LÀ DÙNG CHO STATE ARR TÙY THEO TH CHỨ KO PHẢI QUY ĐỊNH Z
//         setProducts(response);
//     }
//     fetchData();
// }, []);