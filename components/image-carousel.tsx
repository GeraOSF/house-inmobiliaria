import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
};

export default function ImageCarousel({ images }: Props) {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem key={i} className="my-auto">
            <picture>
              <img
                className="mx-auto"
                src={image}
                alt={`${i + 1}. Imagen de la propiedad`}
              />
            </picture>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
