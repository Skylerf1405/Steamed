export async function GET(request) {
    try {
      const res = await fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=10");
  
      if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch deals" }), {
          status: res.status,
        });
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
      });
    }
  }
  