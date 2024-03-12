"use client";
import Carousel from 'react-bootstrap/Carousel';

import "./MainSlider.css"
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';

export default function MainSlider() {
  const stateLang:any = useAppSelector((state) => state.LanguageReducer);
  const [lang, setlang] = useState<String>(
    stateLang.language
  );
  useEffect(() => {
    setlang(stateLang.language)
  }, [stateLang.language]);

  return (
    <div className="px-28 pt-5 main-slider">
      <Carousel>
        <Carousel.Item>
          <div className='slider__main-1 w-full h-[500px]'></div>
          <Carousel.Caption>
            <div>
              <p>Social Development</p>
              <h3 className='font-bold'>Fostering Entrepreneurship</h3>
              <p className='text-sm'>Empowering Small Businesses and Farmers through Khorog Centre for Entrepreneurship (KCE).</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className='slider__main-2 w-full h-[500px]'></div>
          <Carousel.Caption>
            <div>
              <p>Social Development</p>
              <h3 className='font-bold'>Empowering Agriculture</h3>
              <p className='text-sm'>Showcasing Success with the Demo-Greenhouse in Derzud, Rushan District</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className='slider__main-3 w-full h-[500px]'></div>
          <Carousel.Caption>
            <div>
              <p>Social Development</p>
              <h3 className='font-bold'>Driving Success</h3>
              <p className='text-sm'>Launching a Cutting-Edge Heavy-Truck Maintenance Workshop at SPCE TVET Centre.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}