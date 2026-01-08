import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: "FluxWear <onboarding@resend.dev>",
            to: "awaismustafa90@gmail.com",
            subject: "New Contact Message",
            html: `
        <h2>New Message from FluxWear Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
};
