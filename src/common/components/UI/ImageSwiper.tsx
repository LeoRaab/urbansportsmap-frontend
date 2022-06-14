import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import VenueImage from '../../types/VenueImage';
import { useGetImagesByVenueQuery } from '../../../features/image-manager/imagesApi';

type ImageSwiperProps = {
    venueId: string
}

const ImageSwiper = ({ venueId }: ImageSwiperProps) => {

    const { data: images } = useGetImagesByVenueQuery(venueId);

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
        >
            {images && images.map((image, key) =>
                <SwiperSlide key={key}>
                    <img src={image.url} alt={image.altText} />
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default ImageSwiper;
