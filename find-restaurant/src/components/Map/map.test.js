import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Map } from './map'

test('render map success', () => { 
    const { getByTestId, getByText } =render(<Map/>)
    const element = screen.queryAllByTestId ('flex-container')
    if(element.length === 0){
        const loading = getByText("loading")
        expect(loading).toBeInTheDocument();
    }else{
        expect(element).toBeInTheDocument();
    }
 })