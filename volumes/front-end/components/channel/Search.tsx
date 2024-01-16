'use client'


import Icon from '../icon/Icon'

import { useState } from 'react'


interface SearchProps {
  setQuery: (param: string) => void,
  setNumber: (param: number) => void,
}

export default function Search({ setQuery, setNumber }: SearchProps) {

  const [query, setQueryChange] = useState<string>('');


  const setQueryAndNumber = (e: any) => {
    e.preventDefault();
    setNumber(0);
    setQuery(query);
  }

  return (
    <div className='w-full flex justify-center h-[56px] mb-12 mt-20 text-xl'>
      <form
        className='bg-[#00A3FF] bg-opacity-25 rounded-full w-full sm:w-[567px] flex justify-between relative'
        onSubmit={setQueryAndNumber}
      >
        <input
          placeholder="Search for rooms..."
          className='outline-none text-[#979797] rounded-full w-full sm:w-[78%]
                sm:max-w-[440px] h-full px-12 font-light relative text-sm min-[400px]:text-lg'
          value={query}
          onChange={(e: any) => { setQueryChange(e.target.value) }}
        />
        <button
          className='text-sm min-[400px]:text-lg uppercase font-semibold rounded-full
                  px-[11px] sm:pl-0 sm:pr-6 min-[690px]:pr-8 h-[90%] sm:h-full top-[50%] -translate-y-[50%]
                  sm:translate-y-0 sm:block absolute sm:static right-[3px] bg-[#00A3FF] sm:bg-[#00A3FF]/0
                  text-white sm:text-[#00A3FF]'
          type='submit'
          
        >
          <Icon name='search.svg' className='min-[400px]:hidden' />
          <span className='hidden min-[400px]:block'>Search</span>
        </button>
      </form>
    </div>
  )
}