import BrandHeading from './BrandHeading.jsx'
import Paragraph from './Paragraph.jsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  { t: 'Catalog', d: 'Showcase models with uniform cards and crisp grids.' },
  { t: 'Manage',  d: 'Create, update, and curate your own collection.' },
  { t: 'Purchase', d: 'Track popularity with a single click purchase counter.' },
  { t: 'Secure', d: 'Private routes backed by Firebase auth.' }
]

export default function Slider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      style={{ paddingBottom: 24 }}
    >
      {slides.map(s => (
        <SwiperSlide key={s.t}>
          <div className="card h-full">
            <BrandHeading>{s.t}</BrandHeading>
            <Paragraph>{s.d}</Paragraph>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
