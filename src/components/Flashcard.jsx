import { useEffect, useState, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const Flashcard = ({ flashcard }) => {
    const [flipped, setFlipped] = useState(false);
    const tiltRef = useRef(null);

    useEffect(() => {
        setFlipped(false);
    }, [flashcard]);

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 3,
                speed: 10,
                glare: true,
                'max-glare': 0.3,
            });
        }
    }, []);

    return (
        <div ref={tiltRef} className="tilt-container ">
            <div
                className={`flashcard ${flipped ? 'flipped bg-[#38E54D]  text-black' : ''} bg-[#2192FF] mt-6 md:min-w-[40rem] md:min-h-[25rem] min-h-[22rem] min-w-[16rem]`}
                onClick={() => setFlipped(!flipped)}
            >
                {flipped ? (
                    <div className="mirrored-text text-3xl flex justify-center items-center px-8">
                        {flashcard.answer}
                    </div>
                ) : (
                    <div className="text-3xl p-8">Question: {flashcard.question}</div>
                )}
            </div>
        </div>
    );
};

export default Flashcard;
