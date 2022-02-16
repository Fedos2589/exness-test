import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './autocomplete.css';
import { getParts } from '../helpers/getParts';
import { processData } from '../helpers/processData';

const apiUrl = 'https://restcountries.com/v3.1/all';

export const Autocomplete = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>();
  const [searchString, setSearchString] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => setSearchString(event.currentTarget.value),
    [],
  )

  const getOptions = async () => {
    try {
      const responce = await axios.get(apiUrl);
      const countriesNames = processData(responce.data);
      setOptions(countriesNames);
      setError(null);
    } catch(error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error("🤷‍♂️"); // Who knows?
      }
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  useEffect(() => {
    setFilteredOptions(options.filter(option => option.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1))
  }, [searchString, options])

  const optionsList = useMemo(() => 
    searchString.length > 0
      ? filteredOptions?.map(option => 
        <div key={option}>
          {getParts(option, searchString).map((part, index) =>
            <span className={index === 1 ? 'highlight' : ''}>{part}</span>
          )}
        </div>
      )
    : options.map(option => <div key={option}>{option}</div>)
  , [filteredOptions, options, searchString])

  return (
    <div className="autocomplete">
      <input onChange={handleChange} />
      {error
        ? <div className='error'>{error}</div>
        : optionsList
      }
    </div>
  );
}
