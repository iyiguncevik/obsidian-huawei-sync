const HUAWEI_TOKEN_URL = "https://oauth-login.cloud.huawei.com/oauth2/v3/token";

/**
 * @param {Record<string, string>} params
 */
async function requestToken(params) {
  const body = new URLSearchParams(params);
  const response = await fetch(HUAWEI_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  /** @type {Record<string, unknown>} */
  let data = {};
  try {
    data = await response.json();
  } catch {
    return {
      ok: false,
      httpStatus: response.status,
      body: null,
      error: "invalid_json",
    };
  }

  const accessToken = data.access_token;
  const hasToken = typeof accessToken === "string" && accessToken.length > 0;

  return {
    ok: response.ok && hasToken,
    httpStatus: response.status,
    body: hasToken ? data : null,
    error: data.error,
    errorDescription: data.error_description,
    subError: data.sub_error,
  };
}

/**
 * @param {{ clientId: string; clientSecret: string; code: string; redirectUri: string }} args
 */
export async function exchangeAuthorizationCode({
  clientId,
  clientSecret,
  code,
  redirectUri,
}) {
  return requestToken({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
  });
}

/**
 * @param {{ clientId: string; clientSecret: string; refreshToken: string }} args
 */
export async function refreshAccessToken({
  clientId,
  clientSecret,
  refreshToken,
}) {
  return requestToken({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });
}
