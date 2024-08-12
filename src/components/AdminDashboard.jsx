import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const AdminDashboard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [editingId, setEditingId] = useState(null); // ID of the flashcard being edited
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    const fetchFlashcards = () => {
        axios.get('http://localhost:3000/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const addFlashcard = () => {
        if (!question.trim() || !answer.trim()) {
            alert('Both Question and Answer fields must be filled out.');
            return;
        }
        axios.post('http://localhost:3000/flashcards', { question, answer })
            .then(() => {
                setQuestion('');
                setAnswer('');
                fetchFlashcards();
        })
        .catch(err => console.error(err));
        
    };

    const deleteFlashcard = (id) => {
        axios.delete(`http://localhost:3000/flashcards/${id}`)
            .then(() => fetchFlashcards());
    };

    const startEditing = (flashcard) => {
        setEditingId(flashcard.id);
        setEditQuestion(flashcard.question);
        setEditAnswer(flashcard.answer);
    };

    const updateFlashcard = () => {
        axios.put(`http://localhost:3000/flashcards/${editingId}`, { question: editQuestion, answer: editAnswer })
            .then(() => {
                setEditingId(null);
                setEditQuestion('');
                setEditAnswer('');
                fetchFlashcards();
            });
    };
    return (  
        <div className=''>
            <h2 className='flex justify-center font-semibold p-4 mb-4 border border-b-black'>Admin Dashboard</h2>
            <div className='flex-col flex items-center gap-4'>
            <input
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='p-2 w-30 md:w-96 border border-black rounded-lg'
            />
            <input
                type="text"
                placeholder="Answer"
                className='p-2 w-30 md:w-96 border border-black rounded-lg'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={addFlashcard} className='px-4 hover:scale-110 bg-[#031d25] text-white border border-black rounded-lg'>Add Flashcard</button>
            </div>

            <div>
                <h3 className='text-2xl mt-2 mb-4 ml-4'>Existing Flashcards</h3>
                {flashcards.map((flashcard, i) => (
                    <div key={flashcard.id} className='md:flex justify-between mt-3'>
                        <div>
                            <div className='ml-2 md:ml-4'>
                            <p>Q {i+1}. {flashcard.question}</p>
                            <p>Answer: {flashcard.answer}</p>
                        </div>
                        <div className='ml-2 flex'>
                        
                            <button className='mr-2 flex items-center gap-1 md:gap-2 md:mr-10 border hover:bg-green-500 hover:text-white border-black p-1  text-sm md:p-2 rounded-lg ' onClick={() => startEditing(flashcard)}>Edit<MdModeEditOutline /></button>
                            
                            <button className='mr-2  flex items-center gap-1  md:gap-2 md:mr-5 border hover:bg-red-500 hover:text-white border-black p-1  text-sm md:p-2 rounded-lg ' onClick={() => deleteFlashcard(flashcard.id)}>Delete<MdDelete /></button>
                        </div>
                        </div>
                        {editingId === flashcard.id && (
                        <div className='mt-4 md:mr-10'>
                            <h3 className='text-lg mb-2 ml-2'>Edit Flashcard :</h3>
                            <div className='flex-col ml-2 md:flex gap-1'>
                            <input
                                type="text"
                                placeholder="Edit Question"
                                value={editQuestion}
                                onChange={(e) => setEditQuestion(e.target.value)}
                                className='px-2 border border-black rounded-lg mb-2'
                            />
                            <input
                                type="text"
                                placeholder="Edit Answer"
                                value={editAnswer}
                                onChange={(e) => setEditAnswer(e.target.value)}
                                className='px-2 border border-black rounded-lg mb-2'
                            />
                            </div>
                            <button onClick={updateFlashcard} className='px-4 bg-[#031d25] text-white border border-black rounded-lg'>Update Flashcard</button>
                            <button onClick={() => setEditingId(null)} className='ml-2 px-4 bg-red-500 text-white border border-black rounded-lg'>Cancel</button>
                        </div>
                        )}
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default AdminDashboard;
