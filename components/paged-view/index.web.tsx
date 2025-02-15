import React, { useCallback, useRef, useEffect } from 'react';
import { View } from 'react-native';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { PagedViewProps } from '.';
import { FrameContent } from '../frame-content';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function PagedView({ frames, frame, onFrameChange }: PagedViewProps) {
  const carouselRef = useRef<Carousel>(null);
  const currentIndex = frames.indexOf(frame);

  const handleChange = useCallback((index: number) => {
    console.log({currentIndex, index, frame, frames});
    const newFrame = frames[index];
    if (newFrame) {
      onFrameChange(newFrame);
    }
  }, [frames, onFrameChange]);

  // Effect to update carousel position when frame changes externally
  useEffect(() => {
    if (carouselRef.current && currentIndex >= 0) {
      carouselRef.current.goToSlide(currentIndex);
    }
  }, [currentIndex]);

  return (
    <View className="flex-1">
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={false}
        sliderClass="carousel-slider"
        itemClass="carousel-item"
        afterChange={(_, { currentSlide }) => handleChange(currentSlide)}
        arrows
        swipeable
        draggable={false}>
        {frames.map((frame, index) => (
          <View key={index} className="flex-1 px-4">
            <FrameContent frame={frame} />
          </View>
        ))}
      </Carousel>
    </View>
  );
}