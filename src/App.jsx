import FlashcardList from './components/FlashcardList';
import AdminDashboard from './components/AdminDashboard';
import {  Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import DashBoard from './components/DashBoard';


function App() {
    return (
        <div className='min-h-screen '>
           <div className='bg-[#031d25] flex justify-between border border-b-black'>
            <Link to="/">
                <h1 className='flex text-white flex-col justify-center items-center md:p-6 p-4 font-bold text-md md:text-3xl'>Flashcard Learning Tool</h1>
            </Link>
            <Link to='/admin' className='hover:underline text-sm md:text-lg hover:text-blue-500 flex items-center mr-5 text-white'>
                Dashboard
            </Link>
           </div>
           <Routes>
                <Route path="/" element={<FlashcardList />} />
            </Routes>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </div>
    );
}

export default App;
