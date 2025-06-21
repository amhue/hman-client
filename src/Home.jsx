import heroImg1 from "./assets/hero1.jpg";
import heroImg2 from "./assets/hero2.jpg";
import heroImg3 from "./assets/hero3.jpg";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
    return (
        <div className="overflow-hidden">
            <Carousel className="flex auto gap-0" opts={{ loop: true }}>
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <img
                            src={heroImg1}
                            className="h-screen w-full object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <img
                            src={heroImg2}
                            className="h-screen w-full object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <img
                            src={heroImg3}
                            className="h-screen w-full object-cover"
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 bottom-100 !text-white hover:opacity-90 focus:opacity-90 duration-300 ease-out" />
                <CarouselNext className="absolute right-0 bottom-100 !text-white hover:opacity-90 focus:opacity-90 duration-300 ease-out" />
            </Carousel>
            <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center text-white px-4 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg/30">
                    Your Luxury Escape Awaits
                </h2>
                <p className="text-lg md:text-2xl mb-6 max-w-2xl text-shadow-lg/30">
                    Discover elegant stays and unforgettable experiences
                </p>
            </div>
        </div>
    );
}
