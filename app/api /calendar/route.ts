// app/api/calendar/route.ts

export async function GET() {
    return new Response("AULSSP Calendar Feed kommt bald.", {
        status: 200,
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}