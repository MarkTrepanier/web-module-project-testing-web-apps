import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    const contactForm = render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    const contactForm = render(<ContactForm/>);
    const formHeader = screen.queryByText(/contact form/i);
    expect(formHeader).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const contactForm = render(<ContactForm/>);
    const fnInput = screen.getByLabelText(/first name/i);
    userEvent.type(fnInput,'foo');
    const fnErr = await screen.findByText(/error: /i);
    expect(fnErr).toBeVisible();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const contactForm = render(<ContactForm/>);
    //our inputs: first name, last name, email
    const fnInput = screen.getByLabelText(/first name/i);
    const lnInput = screen.getByLabelText(/last name/i);
    const emInput = screen.getByLabelText(/email/i);
    userEvent.type(fnInput,'foo');
    userEvent.type(fnInput,'');
    userEvent.type(lnInput,'bar');
    userEvent.type(lnInput,'');
    userEvent.type(emInput,'fBar@fbEmail.com');
    userEvent.type(emInput,'');
    const errors = await screen.findAllByText(/error: /i,waitFor);
    expect(errors.length).toBe(3);
    console.log('below');
    console.log(errors);
    //todo
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const contactForm = render(<ContactForm/>);
    const fnInput = screen.getByLabelText(/first name/i);
    const lnInput = screen.getByLabelText(/last name/i);
    const emInput = screen.getByLabelText(/email/i);
    userEvent.type(fnInput,'fooderick');
    userEvent.type(lnInput,'Baronson');
    const errors = await screen.findAllByText(/error: /i);
    expect(errors).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    throw new Error('not yet tested')
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    throw new Error('not yet tested')
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    throw new Error('not yet tested')
});

test('renders all fields text when all fields are submitted.', async () => {
    throw new Error('not yet tested')
});