import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {VenueImage} from '../../types/Images';

type ImageSwiperProps = {
    images: VenueImage[]
}

const ImageSwiper = ({images}: ImageSwiperProps) => {

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            className="h-full w-full"
        >
            {images.map((image, key) =>
                <SwiperSlide className="flex justify-center" key={key}>
                    <img src={image.path} alt={image.path}/>
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default ImageSwiper;
