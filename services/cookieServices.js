export class CookieService {
  static setTokenCookies(res, accessToken, refreshToken) {
    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    };

    // console.log('🍪 Setting cookies with options:', cookieOptions);

    // console.log('🌐 Request origin:', res.req.headers.origin);

    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 300 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 300 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
