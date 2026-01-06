import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";  

const IMAGE_URLS = [
    "images/nayeon.jpg",
    "images/jeongyeon.jpg",
    "images/jihyo.jpg",
    "images/mina.jpg",
    "images/sana.jpg",
    "images/momo.jpg",
    "images/dahyun.jpg",
    "images/chaeyoung.jpg",
    "images/tzuyu.jpg"
]

// Add the clone of the first image to the end and last to the beginning
const Slides = [IMAGE_URLS[IMAGE_URLS.length - 1], ...IMAGE_URLS, IMAGE_URLS[0]];

function SlideImageCarousel()
{
    const [ imageIndex, setImageIndex ] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isMoving, setIsMoving] = useState(false);
    const timeoutRef = useRef(null);

    function imageName(index)
    {   
        const actualIndex = (index - 1 + IMAGE_URLS.length) % IMAGE_URLS.length;
        const path = IMAGE_URLS[actualIndex];

        if(!path) return "";

        const nameOfImage = path.split("/").pop().split(".")[0];
        return nameOfImage.charAt(0).toUpperCase() + nameOfImage.slice(1);
    }

    function handlePrev()
    {
        if(isMoving) return;
        setIsMoving(true);
        setIsTransitioning(true);
        setImageIndex((prev) => prev - 1);
    }

    function handleNext()
    {
        if (isMoving) return; 
        setIsMoving(true);
        setIsTransitioning(true);
        setImageIndex((prev) => prev + 1);
    }

    useEffect(() => {
        const moveTimeout = setTimeout(() => setIsMoving(false), 500);

        if(imageIndex === Slides.length - 1)
        {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setImageIndex(1);
            }, 500);
        }
        else if(imageIndex === 0)
        {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setImageIndex(Slides.length - 2)
            }, 500);
        }

        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(moveTimeout);
        };

    }, [imageIndex])

    return(
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div
                className="text-4xl font-bold text-cyan-400 mb-6"
            >
                {imageName(imageIndex)}
            </div>
            <div className="flex justify-center items-center">

                <button
                        disabled={isMoving}
                        onClick={handlePrev}
                        className="bg-sky-300 w-10 h-10 rounded-full text-2xl text-sky-100 cursor-pointer
                                   hover:bg-sky-400 hover:text-white
                                   active:bg-sky-300    
                                   "
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <div className="w-[300px] h-[400px] mx-8 rounded-2xl overflow-hidden shadow-2xl">
                    <div
                        className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                        style={{ transform: `translateX(-${imageIndex * 100}%)` }}
                    >
                        {Slides.map((url, i) => (
                            
                            <img 
                                key={i} src={`${import.meta.env.BASE_URL}${url}`} alt = "member"
                                className="w-[300px] h-[400px] object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>

                <button
                        disabled={isMoving}
                        onClick={handleNext}
                        className="bg-sky-300 w-10 h-10 rounded-full text-2xl text-sky-100 cursor-pointer
                                   hover:bg-sky-400 hover:text-white
                                   active:bg-sky-300    
                                   "
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>

            </div>
        </div>
    )
}

export default SlideImageCarousel;