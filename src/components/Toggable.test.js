import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Toggable from './Togglable'

describe('<Toggale />', () => {
    let component;
    beforeEach(() => {
        component = render(
            <Toggable buttonLabel="show..."><div className="testDiv" /></Toggable>
        )
    })

    // console.log(prettyDOM(component))
    test('renders its children ', () => {
        expect(component.container.querySelector('.testDiv')).toBeDefined()
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('[data-test="toggableContent"]')
        expect(div).toHaveStyle("display:none")
    })


    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.testDiv')
        expect(div).not.toHaveStyle('display:none')
    })

    test('toggle content can be closed', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const closeButton = component.getByText('Cancel')

        fireEvent.click(closeButton)

        const div = component.container.querySelector('[data-test="toggableContent"]')
        expect(div).toHaveStyle('display:none')
    })
});
