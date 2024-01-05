import Ably from "ably/promises";

export async function GET() {
    const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
    console.log('tokenRequestData=', tokenRequestData)
    return Response.json(tokenRequestData)
    // response.json(tokenRequestData);
}