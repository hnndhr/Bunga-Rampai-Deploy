"use client";
import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { config } from "react-spring";

export default function Carroussel(props: any) {
  const [goToSlide, setGoToSlide] = useState<number>(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const dragging = useRef(false);

  useEffect(() => {
    const table = props.cards.map((element: any, index: number) => ({
      ...element,
      onClick: () => {
        if (!dragging.current) setGoToSlide(index);
      },
    }));
    setCards(table);
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.cards, props.offset, props.showArrows]);

  // Fungsi geser kanan/kiri (loop)
  const nextSlide = () =>
    setGoToSlide((prev) => (prev + 1) % props.cards.length);

  const prevSlide = () =>
    setGoToSlide((prev) =>
      prev === 0 ? props.cards.length - 1 : prev - 1
    );

  // Gesture drag horizontal
  const bind = useDrag(
    ({ active, movement: [mx], direction: [dx], distance }) => {
      dragging.current = active;

      if (!active && Math.abs(mx) > 50) {
        // threshold 50px
        if (dx < 0) nextSlide(); // drag ke kiri → next
        else if (dx > 0) prevSlide(); // drag ke kanan → prev
      }
    },
    { axis: "x", filterTaps: true }
  );

  return (
    <div
      {...bind()} // aktifkan gesture drag
      style={{
        width: props.width,
        height: props.height,
        margin: props.margin,
        touchAction: "pan-y", // biar aman di mobile
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.slow}
      />
    </div>
  );
}
