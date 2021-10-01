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
    
    //console.log(fnErr.textContent);
    expect(fnErr).toBeVisible();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const contactForm = render(<ContactForm/>);
    //our inputs: first name, last name, email
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
   const errors =await screen.findAllByText(/err/i)
   expect(errors).toHaveLength(3)
    
})


test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const contactForm = render(<ContactForm/>);
    const fnInput = screen.getByLabelText(/first name/i);
    const lnInput = screen.getByLabelText(/last name/i);
    userEvent.type(fnInput,'fooderick');
    userEvent.type(lnInput,'Baronson');
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    const errors = await screen.findAllByText(/error: /i);
    expect(errors).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  const contactForm = render(<ContactForm/>);
  const emInput = screen.getByLabelText(/email/i);
  userEvent.type(emInput,'notNemailAtGmailDotCom');
  const error = screen.getByText(/err/i);
  expect(error).toHaveTextContent("email must be a valid email address");  
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const contactForm = render(<ContactForm/>);
    const fnInput = screen.getByLabelText(/first name/i);
    userEvent.type(fnInput,'fooderick');
    const lnInput = screen.getByLabelText(/last/i);
    const emInput = screen.getByLabelText(/email/i);
    userEvent.type(emInput,'notNemail@Gmail.Com');
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    const error = screen.getByText(/err/i);
    expect(error).toHaveTextContent("lastName is a required field" );
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const contactForm = render(<ContactForm/>);
    const fnInput = screen.getByLabelText(/first name/i);
    userEvent.type(fnInput,'fooderick');
    const lnInput = screen.getByLabelText(/last/i);
    userEvent.type(lnInput,'Baronson');
    const emInput = screen.getByLabelText(/email/i);
    userEvent.type(emInput,'notNemail@Gmail.Com');
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    const firstnameDisplay=screen.getByTestId(/firstnamedisplay/i);
    const lastnameDisplay=screen.getByTestId(/lastnamedisplay/i);
    const emailDisplay=screen.getByTestId(/emaildisplay/i);
    const messageDisplay=screen.queryByTestId(/messagedisplay/i);
    expect(firstnameDisplay).toHaveTextContent(`First Name: ${(fnInput.value).trim()}`)
    expect(lastnameDisplay).toHaveTextContent(`Last Name: ${(lnInput.value).trim()}`)
    expect(emailDisplay).toHaveTextContent(`Email: ${(emInput.value).trim()}`)
    expect(messageDisplay).not.toBeTruthy()
});

test('renders all fields text when all fields are submitted.', async () => {
    const contactForm = render(<ContactForm/>);
    const fnInput = screen.getByLabelText(/first name/i);
    userEvent.type(fnInput,'fooderick');
    const lnInput = screen.getByLabelText(/last/i);
    userEvent.type(lnInput,'Baronson');
    const emInput = screen.getByLabelText(/email/i);
    userEvent.type(emInput,'notNemail@Gmail.Com');
    const msInput = screen.getByLabelText(/message/i);
    userEvent.type(msInput,'this took way too long');
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    const firstnameDisplay=screen.getByTestId(/firstnamedisplay/i);
    const lastnameDisplay=screen.getByTestId(/lastnamedisplay/i);
    const emailDisplay=screen.getByTestId(/emaildisplay/i);
    const messageDisplay=screen.queryByTestId(/messagedisplay/i);
    expect(firstnameDisplay).toHaveTextContent(`First Name: ${(fnInput.value).trim()}`)
    expect(lastnameDisplay).toHaveTextContent(`Last Name: ${(lnInput.value).trim()}`)
    expect(emailDisplay).toHaveTextContent(`Email: ${(emInput.value).trim()}`)
    expect(messageDisplay).toHaveTextContent(`Message: ${(msInput.value).trim()}`)
});