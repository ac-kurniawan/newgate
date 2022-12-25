export const kongClient = async <T>(
  baseUrl: string,
  path: string,
  data: T,
  keyauth: string
) => {
  const result = await fetch(`${baseUrl}/${path}`, {
    method: 'post',
    headers: {
      'key-auth': keyauth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await result.json();
};

export const kongAdminClient = (baseUrl: string) => ({
  createService: async (body: { name: string; host: string; port: number }) => {
    const result = await fetch(baseUrl + '/services/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await result.json();
  },
  createRoute: async (serviceName: string, body: { paths: string[] }) => {
    const result = await fetch(`${baseUrl}/services/${serviceName}/routes`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await result.json();
  },
  addKeyauthPlugins: async (serviceName: string, body: { name: string }) => {
    const result = await fetch(`${baseUrl}/services/${serviceName}/plugins`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await result.json();
  },
  createConsumer: async (body: { username: string; custom_id: string }) => {
    const result = await fetch(`${baseUrl}/consumers`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await result.json();
  },
  registerPluginToConsumer: async (consumerId: string) => {
    const result = await fetch(`${baseUrl}/consumers/${consumerId}/key-auth`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    });
    return await result.json();
  },
});
