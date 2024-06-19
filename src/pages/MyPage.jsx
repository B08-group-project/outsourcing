import React from 'react';
import { useQuery } from '@tanstack/react-query';
import supabase from '../supabase/supabase';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
    const navigate = useNavigate();

    const { data: coursePlaces, isLoading, isError } = useQuery({
        queryKey: ['coursePlaces'],
        queryFn: async () => {
            const { data, error } = await supabase.from('course_places').select('*');
            if (error) {
                console.log(error);
            }
            return data.map(place => ({
                ...place,
                created_at: new Date(place.created_at).toLocaleDateString('ko-KR'),
            }));
        },
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {/* 왼쪽 */}
            <div className='flex w-full h-screen'>
                <button className='absolute top-[50px] left-[10px] bg-white rounded-2xl bg-sky-100 p-2' onClick={() => navigate(-1)}>뒤로 가기</button>
                <div className='flex-[3] flex justify-center items-center  '>

                    <div className='flex flex-col w-80 justify-center absolute top-[200px] border-double shadow-xl rounded-2xl border-sky-500 p-8'>
                        <header className='flex items-start mb-6 text-4xl font-black justify-left'>My Page</header>
                        <label htmlFor='' className='mb-1'>이메일</label>
                        <input type='email' className='w-full h-8 px-2 py-2 mb-5 text-xs border-2 rounded-md' />

                        <label htmlFor='' className='mb-1'>비밀번호</label>
                        <input type='password' className='w-full h-8 px-2 py-2 mb-5 text-xs border-2 rounded-md' />

                        <label htmlFor='' className='mb-1'>비밀번호 확인</label>
                        <input type='password' className='w-full h-8 px-2 py-2 mb-5 text-xs border-2 rounded-md' />

                        <label htmlFor='' className='mb-1'>닉네임</label>
                        <input type='text' className='w-full h-8 px-2 py-2 mb-5 text-xs border-2 rounded-md' />

                        <button className='h-8 p-2 mt-2 text-white rounded text-x7 bg-sky-300'>수정 하기</button>
                    </div>
                </div>

                {/* 오른쪽 */}
                <div className='flex-[7] flex-row  '>
                    <h1 className='mx-10 mt-12 mb-4 text-2xl font-bold'>저장된 코스</h1>
                    <div className='flex flex-wrap mx-6'>
                        {coursePlaces?.map((place) => (
                            <div key={place.id} className='relative w-1/5 p-4 mx-4 mb-4 border-2 border-solid border-black-600'>
                                <h3>날짜: {place.created_at}</h3>
                                <h3>가게이름: {place.place_name}</h3>
                                <p>주소: {place.address_name}</p>
                                <p>전화번호: {place.phone}</p>
                                <MdNavigateNext className='absolute bottom-0 h-[6rem] right-[-25px] w-100' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mypage;
