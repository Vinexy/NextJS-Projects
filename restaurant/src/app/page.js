import Image from 'next/image'
import styles from './page.module.css'
import img1 from "./img/1.JPG";
import img2 from "./img/2.JPG";
import img3 from "./img/3.JPG";


export default function Home() {
  return (
    <div className='container-fluid text-center flex'>
      <h1 className='s'>RESTORAN İSMİ</h1>
      
      <div name="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel" data-interval="false">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <Image src={img1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <Image src={img2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <Image src={img3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      
    </div>
  )
}
