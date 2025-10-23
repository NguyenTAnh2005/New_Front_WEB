import { fetchJsonToListObj } from "./fetch_async_await.jsx";
// HÀM FLAT MẢNG ĐỐI TƯỢNG THEO KEY PHONE
export async function flatArrObjPhone(path_json) {
    const list = await fetchJsonToListObj(path_json);
    const flat_list = list.flatMap(product => {
        const commonData = {
            product_id: product.product_id,
            phone_name: product.phone_name,
            phone_release_year: product.phone_release_year,
            phone_chip: product.phone_chip,
            phone_screen_size: product.phone_screen_size,
            phone_front_cam: product.phone_front_cam,
            phone_behind_cam: product.phone_behind_cam,
            phone_battery: product.phone_battery,
            phone_system: product.phone_system,
            phone_charging_port: product.phone_charging_port,
            phone_sim_card: product.phone_sim_card,
            phone_nfc: product.phone_nfc,
            phone_ear_phone: product.phone_ear_phone,
            phone_memory_card: product.phone_memory_card,
            phone_desc: product.phone_desc,
            company_id: product.company_id
        }

        return product.variants.map(version => ({
            ...commonData,
            variant_id: version.variant_id,
            variant_ph_ram: version.variant_ph_ram,
            variant_ph_rom: version.variant_ph_rom,
            variant_ph_color: version.variant_ph_color,
            variant_ph_org_price: version.variant_ph_org_price,
            variant_ph_new_price: version.variant_ph_new_price,
            variant_img: version.variant_img,
            variant_discount: `${Math.round((1 - (version.variant_ph_new_price / version.variant_ph_org_price)) * 100)}`,
            variant_key: `${product.product_id}-${version.variant_id}`
        }));
    })
    return flat_list;
}