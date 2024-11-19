import { useState, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { searchProducts } from '../features/searchSlice';


export function useDebounce(value: string, delay: number = 3000): string {
  const [debounce, setDebounce] = useState(value)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);

    return () => clearTimeout(handler)
  }, [value, delay])



  dispatch(searchProducts(debounce));
  return debounce
}