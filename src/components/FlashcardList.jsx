import { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error(err));
    }, []);

    const nextCard = () => {
        setCurrentIndex((currentIndex + 1) % flashcards.length);
        
    };

    const prevCard = () => {
        setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    };

    return (
        <div className='flex justify-center items-center w-full'>
            <div>
            <div className='shadow-md'>
            {flashcards.length > 0 && <Flashcard flashcard={flashcards[currentIndex]} />}
            </div>
            <div className='flex justify-between mt-7'>
                <button className='border flex items-center gap-1 hover:scale-110 transition-all hover:bg-[#38E54D] border-black px-6 bg-[#2192FF] rounded-lg py-2' onClick={prevCard}><FaCaretLeft />Previous</button>
                <button className='border flex items-center gap-1 hover:scale-110 transition-all hover:bg-[#38E54D] border-black px-8 bg-[#2192FF] rounded-lg py-2' onClick={nextCard}>Next<FaCaretRight /></button>
            </div>
            </div>
        </div>
    );
};

export default FlashcardList;
