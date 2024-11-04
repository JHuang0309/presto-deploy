import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

const Header = ({title}) => {
    return (
        <>
            <div className='lg:flex lg:items-center lg:justify-between pb-6 pl-6 pr-6 border-b-2 border-gray-300 shadow-sm p-4'>
                <div className="min-w-0 flex-1">
                    <div className='flex items-end'>
                        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-2">
                            {title}
                        </h2>
                        <button className='ml-2 pb-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <Link to='/dashboard' className="mt-2 flex items-center text-sm text-gray-500 hover:bg-gray-100 hover:bg-gray-100 rounded p-2 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            Return to dashboard
                        </Link>
                        <button className="mt-2 flex items-center text-sm text-gray-500 hover:bg-gray-100 rounded p-2 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            Change thumbnail
                        </button>
                        <button className="mt-2 flex items-center text-sm text-gray-500 hover:bg-gray-100 rounded p-2 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            Edit version history
                        </button>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span>
                        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Delete presentation
                        </button>
                        {/* add further buttons here */}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Header;