import { URLExt } from '@jupyterlab/coreutils';
import { ServerConnection } from '@jupyterlab/services';

interface GeneralResponse {
  readonly result: any;
}

export async function makeGetRequest(url: string): Promise<GeneralResponse> {
  let serverSettings = ServerConnection.makeSettings();
  const fullURL = URLExt.join(serverSettings.baseUrl, url);
  let response = await ServerConnection.makeRequest(fullURL, { method: 'GET' }, serverSettings)
  if (response.status !== 200) {
    throw new ServerConnection.ResponseError(response);
  }
  return response.json();
}

