export default {
    async fetch(request, env, ctx) {
        try {
            // Check if request is defined
            if (!request) {
                throw new Error('Request object is undefined.');
            }

            // Extract query parameter from request URL
            const url = new URL(request.url);
            const queryParams = url.searchParams;
            const query = queryParams.get('query') || 'What is the Capital Of Ghana';

            // Construct API URL with the query parameter
            const apiUrl = `https://ai-module.afrikroyal.workers.dev/?query=${encodeURIComponent(query)}`;

            // Fetch data from the API endpoint
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data from API. Status: ${response.status}`);
            }

            // Read response body as text
            const responseBody = await response.text();

            // Return response body
            return new Response(responseBody);
        } catch (error) {
            console.error('Error:', error.message);
            // Return error response
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    },
};
