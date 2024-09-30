import figlet from "figlet";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/') {
      const body = figlet.textSync("Bun!");
      return new Response(body);
    }

    if (url.pathname === '/greet') {
      return new Response(Bun.file('./greet.txt'));
    }

    if (url.pathname === '/error') {
      throw new Error('Oops! Something went wrong.');
    }

    return new Response('404!');
  },
  error(error) {
    return new Response(`<pre> ${error} \n ${error.stack}</pre>`, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
