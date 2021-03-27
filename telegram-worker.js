const upstream_me = 't.me';
const upstream_org = 'telegram.org';

// Custom pathname for the upstream website.
const upstream_path = '/s/rss_secdevops';

// Whether to use HTTPS protocol for upstream address.
const https = true;

// Replace texts.
const replace_dict = {
  $upstream: '$custom_domain'
};

addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request));
});

async function fetchAndApply(request) {
  let response = null;
  let url = new URL(request.url);
  let url_hostname = url.hostname;
  
  // HTTPS protocol judge
  (https == true) ? (url.protocol = 'https:') : (url.protocol = 'http:');

  // Check telegram.org
  var upstream_domain = upstream_me;
  let pathname = url.pathname;
  console.log(pathname);
  if (pathname.startsWith('/static')) {
    upstream_domain = upstream_org;
    url.pathname = pathname.replace('/static', '');
  } else {
    if (pathname == '/') {
      url.pathname = upstream_path;
    } else {
      url.pathname = upstream_path + url.pathname;
    }
  }

  // reuqest t.me website and custom header
  url.host = upstream_domain;
  let method = request.method;
  let request_headers = request.headers;
  let new_request_headers = new Headers(request_headers);
  new_request_headers.set('Host', url.hostname);
  new_request_headers.set('Referer', url.hostname);

  // Reponse t.me
  let original_response = await fetch(url.href, {
    method: method,
    headers: new_request_headers
  });

  let original_response_clone = original_response.clone();
  let response_headers = original_response.headers;
  let new_response_headers = new Headers(response_headers);
  let status = original_response.status;

  response = new Response(original_response_clone.body, {
    status,
    headers: new_response_headers
  });
  let text = await response.text();

  // Modify it.
  let modified = text.replace(/telegram.org/g,'tg.weiyigeek.top/static').replace(/cdn5.telesco.pe/g,'tg.weiyigeek.top/cdn5');

  // Return modified response.
  return new Response(modified, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}