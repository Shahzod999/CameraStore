import CardBox from "./CardBox";
import Header from "../header/Header";
import Brand from "../brand/Brand";
import { useFetchAllProductsQuery } from "../../app/api/productsApiSlice";
const card = () => {
  const { data: product } = useFetchAllProductsQuery({});

  // const product = [
  //   {
  //     title: "Camera Rapoo C200",
  //     description: "Rapoo C200 is a compact HD webcam with a built-in microphone, perfect for video calls.",
  //     brand: "Rapoo",
  //     price: "410 000 so'm",
  //     image: "6.png",
  //   },
  //   {
  //     title: "Web-Camera Trust Trino",
  //     description: "Trust Trino is an affordable HD webcam with built-in mic, perfect for video calls.",
  //     brand: "Trust Trino",
  //     price: "99 000 so'm",
  //     image: "4.png",
  //   },
  //   {
  //     title: "Camera Grandstream",
  //     description: "Grandstream GUV3100 is a high-quality HD webcam ideal for video conferencing and streaming.",
  //     brand: "Grandstream",
  //     price: "293 000 so'm",
  //     image: "5.png",
  //   },
  //   {
  //     title: "Camera A4Tech",
  //     description: "A4Tech PK-910H is an HD webcam with a built-in mic, ideal for video chats.",
  //     brand: "A4Tech",
  //     price: "417 000 so'm",
  //     image: "7.png",
  //   },
  //   {
  //     title: "Camera Logitech C270",
  //     description: "Logitech C270 is an affordable HD webcam with a built-in microphone for clear video calls.",
  //     brand: "Logitech",
  //     price: "429 000 so'm",
  //     image: "8.png",
  //   },
  //   {
  //     title: "Camera HP 320 FHD",
  //     description: "HP 320 FHD webcam offers 1080p video quality and a built-in microphone for clear communication.",
  //     brand: "Hp",
  //     price: "430 000 so'm",
  //     image: "9.png",
  //   },
  //   {
  //     title: "Camera Rapoo C260",
  //     description: "Rapoo C260 is a compact HD webcam with a built-in microphone, perfect for video calls.",
  //     brand: "Rapoo",
  //     price: "529 000 so'm",
  //     image: "10.png",
  //   },
  //   {
  //     title: "Camera Rapoo C280",
  //     description: "Rapoo C280 is a compact HD webcam with a built-in microphone, perfect for video calls.",
  //     brand: "Rapoo",
  //     price: "590 000 so'm",
  //     image: "11.png",
  //   },
  //   {
  //     title: "Camera HP 320 FHD",
  //     description: "The HP 320 FHD Webcam offers clear 1080p video, built-in mic, and easy USB connectivity.",
  //     brand: "Hp",
  //     price: "430 000 so'm",
  //     image: "14.png",
  //   },
  //   {
  //     title: "Camera Lorgar 701 Blue",
  //     description: "The Lorgar Rapax Webcam provides sharp 1080p video, autofocus, and dual noise-canceling mics.",
  //     brand: "Lorgar",
  //     price: "800 000 so'm",
  //     image: "15.png",
  //   },
  //   {
  //     title: "Camera Lorgar 701 Pale",
  //     description: "The Lorgar Rapax Webcam provides sharp 1080p video, autofocus, and dual noise-canceling mics.",
  //     brand: "Lorgar",
  //     price: "800 000 so'm",
  //     image: "16.png",
  //   },
  //   {
  //     title: "Camera Asus C3",
  //     description: "The Asus C3 Webcam delivers smooth 1080p video, wide 90° view, and excellent low-light performance.",
  //     brand: "Asus",
  //     price: "820 000 so'm",
  //     image: "17.png",
  //   },
  // ];

  console.log(product);

  return (
    <>
      <Header />
      <div className="card">
        <div className="container">
          <div className="card__box">
            {product?.map((item) => (
              <CardBox item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default card;
