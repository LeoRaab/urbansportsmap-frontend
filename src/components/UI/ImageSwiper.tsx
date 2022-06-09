import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import VenueImage from '../../types/VenueImage';
import { useGetImagesByVenueQuery } from '../../store/api/imagesApi';

type ImageSwiperProps = {
    venueId: string   
}

const ImageSwiper = ({venueId}: ImageSwiperProps) => {

    const { data: images } = useGetImagesByVenueQuery(venueId);

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            className="h-full w-full"
        >
            {images && images.map((image, key) =>
                <SwiperSlide className="flex justify-center" key={key}>
                    <img src={'http://localhost:5000/uploads/images/venues/' + venueId + '/' +image.filename} alt={image.altText}/>
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default ImageSwiper;
