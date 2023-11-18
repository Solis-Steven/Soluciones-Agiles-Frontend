"use server"

import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { newTicketTemplate } from "./templates/newTicket";

export async function sendMail({to, name, subject, body}) {
    const {SMTP_PASSWORD, SMTP_Email} = process.env;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_Email,
            pass: SMTP_PASSWORD
        }
    });
    try {
        const testResult = await transport.verify();
    } catch (error) {
        console.log("Error test result", error);
        
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_Email, to, subject, html: body
        });
    } catch (error) {
        console.log("Error send result", error);
    }
}

export async function compileNewTicketTemplate(ticketProblem, personName, description, deadline) {
    const template = handlebars.compile(newTicketTemplate);
    const htmlBody = template({
        ticketProblem,
        personName,
        description,
        deadline
    });

    return htmlBody;
}