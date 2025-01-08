import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <Image
          width={500}
          height={300}
          src={
            "https://i.pinimg.com/736x/25/4d/08/254d089685e894197f2878f18eed9002.jpg"
          }
          alt="Profile picture"
        />
        <h1>Day la trang chu</h1>
      </div>
    </>
  );
}
