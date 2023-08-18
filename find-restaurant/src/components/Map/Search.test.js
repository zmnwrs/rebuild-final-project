import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Search } from './Search'

test('render map success', () => { 
    try{
        const { findAllByRol,getByText  } =render(<Search/>)
    }catch (error){
        // expected to have error for not init google map
        expect(null).toBeInTheDocument();
    }
 })