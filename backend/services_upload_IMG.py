import cloudinary
import cloudinary.uploader
import cloudinary.api

# 🔧 1. Cấu hình thông tin Cloudinary
cloudinary.config(
    cloud_name="df5mtvzkn",       # 👉 cloud_name của bạn
    api_key="513165655148753",
    api_secret="gjQueDIkHi5PHvYUOsAiwd0nXqk",
    secure=True
)

# 🔧 2. Hàm upload
def upload_image(image_path,folder_parent):
    list=image_path.split("/")
    folder=list[len(list)-2]
    name_img=list[len(list)-1]
    id=name_img[0:-4:1]
    result = cloudinary.uploader.upload(
        image_path,
        folder=f"WEB_SELL_PHONE__PROJECT/{folder_parent}/{folder}/",
        public_id=f"{id}",
        overwrite=True,
        resource_type="image"
    )
    print("✅ Upload thành công! Link ảnh:")
    print(result["secure_url"])
    return result

# 🔧 3. Chạy thử
if __name__ == "__main__":
    # upload_image("./IMG_T/pdt_1/pdt_1__v1.png","IMG_PRODUCT")
    upload_image("./IMG_T/Test_IMG/eg_article.png","TEST")
    # upload_image("./IMG_T/Test_IMG/eg_phone.png","TEST")

